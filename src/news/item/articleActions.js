import {
  loadComments,
  deleteComment,
  updateComment,
  createComment,
  loadCommentsWithTotal
} from '../common/NewsApiService';

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export const REQUEST_DELETE_COMMENT = 'REQUEST_DELETE_COMMENT';
export const RECEIVE_DELETE_COMMENT = 'RECEIVE_DELETE_COMMENT';

export const REQUEST_UPDATE_COMMENT = 'REQUEST_UPDATE_COMMENT';
export const RECEIVE_UPDATE_COMMENT = 'RECEIVE_UPDATE_COMMENT';

export const REQUEST_CREATE_COMMENT = 'REQUEST_CREATE_COMMENT';
export const RECEIVE_CREATE_COMMENT = 'RECEIVE_CREATE_COMMENT';

const requestComments = () => ({
  type: REQUEST_COMMENTS
});

const recieveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

const requestDeleteComment = () => ({
  type: REQUEST_DELETE_COMMENT
});

const recieveDeleteComment = (comments, totalCount) => ({
  type: RECEIVE_DELETE_COMMENT,
  comments,
  totalCount
});

const requestUpdateComment = () => ({
  type: REQUEST_UPDATE_COMMENT
});

const recieveUpdateComment = comment => ({
  type: RECEIVE_UPDATE_COMMENT,
  comment
});

const requestCreateComment = () => ({
  type: REQUEST_CREATE_COMMENT
});

const recieveCreateComment = (comments, totalCount) => ({
  type: RECEIVE_CREATE_COMMENT,
  comments,
  totalCount
});

export const fetchComments = (articleId, offset = 0) => async dispatch => {
  dispatch(requestComments());
  try {
    const json = await loadComments(articleId, offset);
    dispatch(recieveComments(json.comments));
  } catch (err) {
    console.log(err);
  }
};

export const deleteCommentAction = (articleId, id, size) => async dispatch => {
  dispatch(requestDeleteComment());
  try {
    await deleteComment(id);
    const json = await loadCommentsWithTotal(articleId, 0, size);
    dispatch(recieveDeleteComment(json.article.comments, json.article.commentsCount));
  } catch (err) {
    console.log(err);
  }
};

export const updateCommentAction = (id, text) => async dispatch => {
  dispatch(requestUpdateComment());
  try {
    const json = await updateComment(id, text);
    dispatch(recieveUpdateComment(json.updateComment));
  } catch (err) {
    console.log(err);
  }
};

export const createCommentAction = (articleId, text, size) => async dispatch => {
  dispatch(requestCreateComment());
  try {
    await createComment(articleId, text);
    const json = await loadCommentsWithTotal(articleId, 0, size);
    dispatch(recieveCreateComment(json.article.comments, json.article.commentsCount));
  } catch (err) {
    console.log(err);
  }
};
