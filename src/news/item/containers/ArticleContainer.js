import React, { Component } from 'react';
import {
  LinearProgress,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import NewsPropTypes from '../../common/NewsPropTypes';
import ArticleComponent from '../components/ArticleComponent';
import { isRoleOrAdmin } from '../../../common/service/Authorization';
import { fetchArticle, deleteArticleAndGoToPage } from '../../list/articleListActions';

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

class ArticleContainer extends Component {
  state = {
    openDialog: false
  };

  componentDidMount() {
    const { article, match, dispatch, isFetching } = this.props;
    const { articleId } = match.params;
    if (!article && !isFetching) {
      dispatch(fetchArticle(articleId));
    }
  }

  handleOpenDialog = deleteArticleId => {
    this.setState({ openDialog: true, deleteArticleId });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false, deleteArticleId: null });
  };

  handleDeleteOkDialog = () => {
    const { deleteArticleId } = this.state;
    const { dispatch } = this.props;
    if (deleteArticleId) {
      dispatch(deleteArticleAndGoToPage(deleteArticleId, 1));
    }
    this.setState({ openDialog: false, deleteArticleId: null });
  };

  render() {
    const { openDialog } = this.state;
    const { article, classes, isFetching, security, dispatch } = this.props;
    return (
      <div>
        <div className={classes.progressBar}>{isFetching && <LinearProgress />}</div>
        <Paper className={classes.paper}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <Grid container spacing={16} alignItems="flex-start" justify="center">
                {article &&
                  !isFetching && (
                    <ArticleComponent
                      article={article}
                      onDelete={
                        isRoleOrAdmin(security, 'ROLE_JMP_USER', article.author.id)
                          ? id => this.handleOpenDialog(id)
                          : null
                      }
                      onEdit={
                        isRoleOrAdmin(security, 'ROLE_JMP_USER', article.author.id)
                          ? id => dispatch(push(`/news/edit/${id}`))
                          : null
                      }
                    />
                  )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Dialog
          open={openDialog}
          onClose={this.handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure to Delete?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary" autoFocus>
              No
            </Button>
            <Button onClick={this.handleDeleteOkDialog} color="secondary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ArticleContainer.propTypes = {
  article: NewsPropTypes.article,
  classes: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  security: PropTypes.shape({}).isRequired
};

ArticleContainer.defaultProps = {
  article: null
};

const mapStateToProps = state => ({
  article: state.news.article,
  isFetching: state.news.isFetching || false,
  security: state.auth.security
});

export default connect(mapStateToProps)(withStyles(styles)(ArticleContainer));
