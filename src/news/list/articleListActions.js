import pathToRegexp from 'path-to-regexp';
import { push, replace } from 'connected-react-router';
import { loadArticleList, loadArticle, deleteArticle } from '../common/NewsApiService';

export const REQUEST_ARTICLE_LIST = 'REQUEST_ARTICLE_LIST';
export const RECEIVE_ARTICLE_LIST = 'RECEIVE_ARTICLE_LIST';
export const REQUEST_ARTICLE = 'REQUEST_ARTICLE';
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';
export const REQUEST_DELETE_ARTICLE = 'REQUEST_DELETE_ARTICLE';
export const RECEIVE_DELETE_ARTICLE = 'RECEIVE_DELETE_ARTICLE';

const requestArticleList = () => ({
  type: REQUEST_ARTICLE_LIST
});

const recieveArticleList = (articleList, total = 1) => ({
  type: RECEIVE_ARTICLE_LIST,
  articleList,
  total
});

const requestArticle = () => ({
  type: REQUEST_ARTICLE
});

const recieveArticle = article => ({
  type: RECEIVE_ARTICLE,
  article
});

const requestDeleteArticle = () => ({
  type: REQUEST_DELETE_ARTICLE
});

const recieveDeleteArticle = id => ({
  type: RECEIVE_DELETE_ARTICLE,
  id
});

export const fetchArticleList = (offset = 0) => async dispatch => {
  dispatch(requestArticleList());
  try {
    const json = await loadArticleList(offset);
    dispatch(recieveArticleList(json.articles.content, json.articles.pageInfo.totalPages));
  } catch (err) {
    console.log(err);
  }
};

export const openArticleListPage = (page = 1, path) => async dispatch => {
  await dispatch(fetchArticleList(page - 1));
  await dispatch(push(pathToRegexp.compile(path)({ pageNum: page })));
};

export const fetchArticle = id => async dispatch => {
  dispatch(requestArticle());
  try {
    const json = await loadArticle(id);
    dispatch(recieveArticle(json.article));
  } catch (err) {
    console.log(err);
  }
};

export const openArticlePage = id => async dispatch => {
  await dispatch(fetchArticle(id));
  await dispatch(push(`/news/${id}`));
};

export const deleteArticleAndGoToPage = (
  id,
  page = 1,
  path = '/news/page/:pageNum'
) => async dispatch => {
  dispatch(requestDeleteArticle());
  try {
    await deleteArticle(id);
    dispatch(recieveDeleteArticle(id));
    await dispatch(fetchArticleList(page - 1));
    await dispatch(replace(pathToRegexp.compile(path)({ pageNum: page })));
  } catch (err) {
    console.log(err);
  }
};

export const deleteArticleAndReload = (id, page = 1) => async dispatch => {
  dispatch(requestDeleteArticle());
  try {
    await deleteArticle(id);
    dispatch(recieveDeleteArticle(id));
    await dispatch(fetchArticleList(page - 1));
  } catch (err) {
    console.log(err);
  }
};
