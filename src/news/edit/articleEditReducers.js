import * as actions from './articleEditActions';

export default (
  state = { isFetching: false, articleList: [], totalPages: null, article: null },
  action
) => {
  switch (action.type) {
    case actions.REQUEST_CREATE_ARTICLE:
    case actions.REQUEST_UPDATE_ARTICLE:
      return {
        ...state,
        isLoading: true
      };
    case actions.REQUEST_TAGS:
      return {
        ...state,
        isTagsLoading: true
      };
    case actions.RECIEVE_CREATE_ARTICLE:
    case actions.RECIEVE_UPDATE_ARTICLE:
      return {
        ...state,
        article: action.article
      };
    case action.RECIEVE_TAGS:
      return {
        ...state,
        tags: action.tags
      };
    default:
      return state;
  }
};
