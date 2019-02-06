import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { push } from 'connected-react-router';
import { Paper, LinearProgress, Grid } from '@material-ui/core';
import NewsPropTypes from '../../common/NewsPropTypes';
import { fetchArticle } from '../../list/articleListActions';
import { loadTags } from '../../common/NewsApiService';
import { updateArticleActionAndOpen, createArticleActionAndOpen } from '../articleEditActions';
import ArticleEditComponent from '../components/ArticleEditComponent';
import { isRoleOrAdmin } from '../../../common/service/Authorization';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%'
  }
});

class ArticleEditContainer extends Component {
  componentDidMount() {
    const { article, match, dispatch, isFetching } = this.props;
    const { articleId } = match.params;
    if (articleId && !article && !isFetching) {
      dispatch(fetchArticle(articleId));
    }
  }

  render() {
    const { article, classes, isFetching, security, dispatch, tags, match } = this.props;
    const { articleId } = match.params;
    if (!isRoleOrAdmin(security, 'ROLE_MENTOR', article ? article.author.id : null)) {
      dispatch(push('/news/page/1'));
    }
    return (
      <div>
        <div className={classes.progressBar}>{isFetching && <LinearProgress />}</div>
        <Paper className={classes.paper}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <Grid container spacing={16} alignItems="flex-start" justify="center">
                {!isFetching && (
                  <ArticleEditComponent
                    article={article}
                    articleId={articleId}
                    tags={tags}
                    onSave={(id, title, brief, text, tgs) => {
                      if (id) {
                        dispatch(updateArticleActionAndOpen(id, title, brief, text, tgs));
                      } else {
                        dispatch(createArticleActionAndOpen(title, brief, text, tgs));
                      }
                    }}
                    onSearchTags={(q, excludeTags) => {
                      dispatch(loadTags(q, excludeTags));
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

ArticleEditContainer.propTypes = {
  article: NewsPropTypes.article,
  isFetching: PropTypes.bool.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  classes: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  security: PropTypes.shape({}),
  tags: PropTypes.arrayOf(NewsPropTypes.tag)
};

ArticleEditContainer.defaultProps = {
  article: null,
  security: null,
  tags: null
};

const mapStateToProps = state => ({
  article: state.news.article,
  tags: state.news.tags,
  isFetching: state.news.isFetching,
  totalPages: state.news.totalPages,
  security: state.auth.security
});

export default connect(mapStateToProps)(withStyles(styles)(ArticleEditContainer));
