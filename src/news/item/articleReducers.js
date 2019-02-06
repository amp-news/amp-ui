import * as actions from './articleActions';

export default (
  state = { isFetching: false, articleList: [], totalPages: null, article: null },
  action
) => {
  switch (action.type) {
    case actions.REQUEST_COMMENTS:
    case actions.REQUEST_CREATE_COMMENT:
    case actions.REQUEST_UPDATE_COMMENT:
    case actions.REQUEST_DELETE_COMMENT:
      return {
        ...state,
        isCommentFetching: true
      };
    case actions.RECEIVE_COMMENTS:
      return {
        ...state,
        isCommentFetching: false,
        article: {
          ...state.article,
          comments: state.article.comments ? state.article.comments.concat(action.comments) : null
        },
        totalPages: action.total
      };
    case actions.RECEIVE_CREATE_COMMENT:
      return {
        ...state,
        isCommentFetching: false,
        article: {
          ...state.article,
          comments: action.comments,
          commentsCount: action.totalCount
        },
        totalPages: action.total
      };
    case actions.RECEIVE_UPDATE_COMMENT:
      return {
        ...state,
        isCommentFetching: false,
        article: {
          ...state.article,
          comments: state.article.comments
            ? state.article.comments.map(c => (c.id === action.comment.id ? action.comment : c))
            : null
        },
        totalPages: action.total
      };
    case actions.RECEIVE_DELETE_COMMENT:
      return {
        ...state,
        isCommentFetching: false,
        article: {
          ...state.article,
          comments: action.comments,
          commentsCount: action.totalCount
        },
        totalPages: action.total
      };
    default:
      return state;
  }
};
