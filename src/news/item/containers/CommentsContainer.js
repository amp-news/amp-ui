import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  Typography,
  Button,
  CardActions,
  Grid,
  TextField,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import NewsPropTypes from '../../common/NewsPropTypes';
import CommentComponent from '../components/CommentComponent';
import {
  fetchComments,
  createCommentAction,
  deleteCommentAction,
  updateCommentAction
} from '../articleActions';
import { DEFAULT_LIST_SIZE } from '../../common/NewsApiService';

const styles = theme => ({
  createComment: {
    textAlign: 'center',
    paddingLeft: 20 * theme.spacing.unit,
    paddingBottom: 2 * theme.spacing.unit,

    paddingTop: 2 * theme.spacing.unit,
    paddingRight: 20 * theme.spacing.unit
  },
  comments: {
    paddingTop: theme.spacing.unit,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center'
  },
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%'
  },
  editDialog: {
    minWidth: '200px'
  }
});

class CommentsContainer extends Component {
  state = {
    newCommentText: null,
    editCommentText: null,
    openDeleteDialog: false,
    openEditDialog: false,
    deleteCommentId: null,
    editCommentId: null
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value.replace(/\r?\n|\r/g, '').substring(0, 1000)
    });
  };

  handleCreateComment = (articleId, size) => {
    const { dispatch } = this.props;
    const { newCommentText } = this.state;
    this.newCommentTextField.value = null;
    this.setState({ newCommentText: null }, () =>
      dispatch(createCommentAction(articleId, newCommentText, size > 10 ? size : 10))
    );
  };

  handleOpenDeleteDialog = deleteCommentId => {
    this.setState({ openDeleteDialog: true, deleteCommentId });
  };

  handleCloseDeleteDialog = () => {
    this.setState({ openDeleteDialog: false, deleteCommentId: null });
  };

  handleDeleteOkDialog = size => {
    const { deleteCommentId } = this.state;
    const { dispatch, articleId } = this.props;
    if (deleteCommentId) {
      dispatch(deleteCommentAction(articleId, deleteCommentId, size > 10 ? size : 10));
    }
    this.setState({ openDeleteDialog: false, deleteCommentId: null });
  };

  handleOpenEditDialog = (editCommentId, editCommentText) => {
    this.setState({ openEditDialog: true, editCommentId, editCommentText });
  };

  handleCloseEditDialog = () => {
    this.setState({ openEditDialog: false, editCommentId: null, editCommentText: null });
  };

  handleEditOkDialog = () => {
    const { editCommentId, editCommentText } = this.state;
    const { dispatch } = this.props;
    if (editCommentId && editCommentText) {
      dispatch(updateCommentAction(editCommentId, editCommentText));
    }
    this.editCommentTextField.value = null;
    this.setState({ openEditDialog: false, editCommentId: null });
  };

  render() {
    const {
      comments,
      commentsCount,
      articleId,
      dispatch,
      classes,
      isCommentFetching,
      security
    } = this.props;
    const { newCommentText, openDeleteDialog, openEditDialog, editCommentText } = this.state;
    return (
      <div>
        <div className={classes.progressBar}>{isCommentFetching && <LinearProgress />}</div>
        {security &&
          security.authenticated &&
          security.user.id && (
            <Card className={classes.createComment}>
              <TextField
                id="newCommentTextField"
                label="Your opinion"
                multiline
                fullWidth
                value={newCommentText || ''}
                onChange={this.handleChange('newCommentText')}
                className={classes.textField}
                inputRef={el => {
                  this.newCommentTextField = el;
                }}
                margin="normal"
              />
              {newCommentText && (
                <Button onClick={() => this.handleCreateComment(articleId, comments.length)}>
                  Post Comment
                </Button>
              )}
            </Card>
          )}
        <Card className={classes.comments}>
          <Typography variant="body2">
            {commentsCount > 0 ? `Total ${commentsCount} comments` : `No comments`}
          </Typography>
          <Grid container spacing={24} justify="center">
            {comments.map(c => (
              <Grid item xs={10} key={c.id}>
                <CommentComponent
                  comment={c}
                  security={security}
                  onDeleteComment={id => {
                    this.handleOpenDeleteDialog(id);
                  }}
                  onEditComment={(id, text) => {
                    this.handleOpenEditDialog(id, text);
                  }}
                />
              </Grid>
            ))}
          </Grid>
          {comments.length < commentsCount && (
            <CardActions>
              <Button
                onClick={() =>
                  dispatch(fetchComments(articleId, comments.length / DEFAULT_LIST_SIZE))
                }
              >
                Load more comments
              </Button>
            </CardActions>
          )}
        </Card>
        <Dialog
          open={openDeleteDialog}
          onClose={this.handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure to Delete?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleCloseDeleteDialog} color="primary" autoFocus>
              No
            </Button>
            <Button onClick={() => this.handleDeleteOkDialog(comments.length)} color="secondary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEditDialog}
          onClose={this.handleCloseEditDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.editDialog}
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">Edit Comment</DialogTitle>
          <DialogContent>
            <TextField
              id="editCommentTextField"
              label="Your opinion"
              multiline
              fullWidth
              value={editCommentText || ''}
              onChange={this.handleChange('editCommentText')}
              inputRef={el => {
                this.editCommentTextField = el;
              }}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseEditDialog} color="secondary" autoFocus>
              Cancel
            </Button>
            <Button onClick={() => this.handleEditOkDialog()} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CommentsContainer.propTypes = {
  articleId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(NewsPropTypes.comment),
  commentsCount: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  isCommentFetching: PropTypes.bool,
  security: PropTypes.shape({})
};

CommentsContainer.defaultProps = {
  comments: null,
  isCommentFetching: false,
  security: null
};

const mapStateToProps = state => ({
  articleId: state.news.article.id,
  comments: state.news.article.comments,
  commentsCount: state.news.article.commentsCount,
  isCommentFetching: state.news.isCommentFetching,
  security: state.auth.security
});

export default connect(mapStateToProps)(withStyles(styles)(CommentsContainer));
