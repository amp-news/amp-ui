import * as listAction from './articleListActions';

export default (
  state = {
    isFetching: false,
    articleList: [],
    totalPages: null,
    article: null
  },
  action
) => {
  switch (action.type) {
    case listAction.REQUEST_ARTICLE:
    case listAction.REQUEST_DELETE_ARTICLE:
    case listAction.REQUEST_ARTICLE_LIST:
      return {
        ...state,
        isFetching: true
      };
    case listAction.RECEIVE_ARTICLE_LIST:
      return {
        ...state,
        isFetching: false,
        articleList: action.articleList,
        totalPages: action.total
      };
    case listAction.RECEIVE_ARTICLE:
      return {
        ...state,
        isFetching: false,
        article: action.article
      };
    case listAction.RECEIVE_DELETE_ARTICLE:
      return {
        ...state,
        isFetching: false,
        article: null,
        articleList: state.articleList.filter(a => a.id !== action.id)
      };
    default:
      return state;
  }
};
