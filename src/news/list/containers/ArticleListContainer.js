import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Paper, Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { push } from 'connected-react-router';
import { isAdminOrMentor } from '../../../common/service/Authorization';
import PaginationComponent from '../../../common/components/pagination/PaginationComponent';
import ArticleListComponent from '../components/ArticleListComponent';
import {
  fetchArticleList,
  openArticleListPage,
  openArticlePage,
  deleteArticleAndReload
} from '../articleListActions';
import NewsPropTypes from '../../common/NewsPropTypes';
import AuthPropTypes from '../../../auth/AuthPropTypes';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%'
  },
  addArticle: {
    position: 'fixed',
    bottom: theme.spacing.unit * 5,
    right: theme.spacing.unit * 5
  }
});

const getPageNumFromMatch = (match, totalPages) => {
  const { pageNum } = match.params;
  let result = parseInt(pageNum, 10) || null;
  if (result && totalPages && result > totalPages) {
    result = null;
  }
  return result;
};

class ArticleListContainer extends Component {
  state = {
    openDialog: false
  };

  componentDidMount() {
    const { articleList, match, dispatch } = this.props;
    const { pageNum } = match.params;
    if (!articleList || articleList.length === 0) {
      dispatch(fetchArticleList(parseInt(pageNum, 10) - 1));
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  handleOpenDialog = deleteArticleId => {
    this.setState({ openDialog: true, deleteArticleId });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false, deleteArticleId: null });
  };

  handleDeleteOkDialog = pageNum => {
    const { deleteArticleId } = this.state;
    const { dispatch } = this.props;
    if (deleteArticleId) {
      dispatch(deleteArticleAndReload(deleteArticleId, pageNum));
    }
    this.setState({ openDialog: false, deleteArticleId: null });
  };

  render() {
    const { articleList, totalPages, isFetching, classes, match, dispatch, security } = this.props;
    const { openDialog } = this.state;
    const pageNum = getPageNumFromMatch(match, totalPages);
    if (!pageNum) {
      dispatch(openArticleListPage(1, match.path));
    }
    return (
      <div>
        <div className={classes.progressBar}>{isFetching && <LinearProgress />}</div>
        <Paper className={classes.paper}>
          <h3>List of Articles</h3>
          {!isFetching &&
            (!articleList || articleList.length === 0) && <h2>No data to display. </h2>}
          {articleList &&
            articleList.length > 0 && (
              <div
                style={{
                  opacity: isFetching ? 0.5 : 1
                }}
              >
                <ArticleListComponent
                  articleList={articleList}
                  onOpenArticle={id => {
                    dispatch(openArticlePage(id));
                  }}
                  security={security}
                  onDeleteArticle={id => {
                    this.handleOpenDialog(id);
                  }}
                />
                <PaginationComponent
                  display={5}
                  total={totalPages}
                  current={pageNum}
                  match={match}
                  onChange={num => {
                    if (num !== pageNum) {
                      dispatch(openArticleListPage(num, match.path));
                    }
                  }}
                />
              </div>
            )}
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
            <Button onClick={() => this.handleDeleteOkDialog(pageNum)} color="secondary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        {isAdminOrMentor(security) && (
          <Button
            onClick={() => {
              dispatch(push('/news/create'));
            }}
            variant="fab"
            className={classes.addArticle}
            color="primary"
          >
            <AddIcon />
          </Button>
        )}
      </div>
    );
  }
}

ArticleListContainer.propTypes = {
  articleList: PropTypes.arrayOf(NewsPropTypes.articleLite),
  isFetching: PropTypes.bool.isRequired,
  totalPages: PropTypes.number,
  match: ReactRouterPropTypes.match.isRequired,
  classes: PropTypes.shape({}).isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  dispatch: PropTypes.func.isRequired,
  security: AuthPropTypes.security.isRequired
};

ArticleListContainer.defaultProps = {
  articleList: [],
  totalPages: null
};

const mapStateToProps = state => ({
  articleList: state.news.articleList,
  isFetching: state.news.isFetching,
  totalPages: state.news.totalPages,
  security: state.auth.security
});

export default connect(mapStateToProps)(withStyles(styles)(ArticleListContainer));
