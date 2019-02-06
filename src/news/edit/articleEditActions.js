import { push } from 'connected-react-router';
import { loadTags, createArticle, updateArticle } from '../common/NewsApiService';

export const REQUEST_CREATE_ARTICLE = 'REQUEST_CREATE_ARTICLE';
export const RECIEVE_CREATE_ARTICLE = 'RECIEVE_CREATE_ARTICLE';

export const REQUEST_UPDATE_ARTICLE = 'REQUEST_UPDATE_ARTICLE';
export const RECIEVE_UPDATE_ARTICLE = 'RECIEVE_UPDATE_ARTICLE';

export const REQUEST_TAGS = 'REQUEST_TAGS';
export const RECIEVE_TAGS = 'RECIEVE_TAGS';

const requestUpdateArticle = () => ({
  type: REQUEST_UPDATE_ARTICLE
});

const recieveUpdateArticle = article => ({
  type: RECIEVE_UPDATE_ARTICLE,
  article
});

const requestCreateArticle = () => ({
  type: REQUEST_CREATE_ARTICLE
});

const recieveCreateArticle = article => ({
  type: RECIEVE_CREATE_ARTICLE,
  article
});

const requestTags = () => ({
  type: REQUEST_TAGS
});

const recieveTags = tags => ({
  type: RECIEVE_TAGS,
  tags
});

export const createArticleActionAndOpen = (title, brief, text, tags) => async dispatch => {
  dispatch(requestCreateArticle());
  try {
    const json = await createArticle(title, text, brief, tags);
    await dispatch(recieveCreateArticle(json.createArticle));
    dispatch(push(`/news/${json.createArticle.id}`));
  } catch (err) {
    console.log(err);
  }
};

export const updateArticleActionAndOpen = (
  articleId,
  title,
  brief,
  text,
  tags
) => async dispatch => {
  dispatch(requestUpdateArticle());
  try {
    const json = await updateArticle(articleId, title, text, brief, tags);
    await dispatch(recieveUpdateArticle(json.updateArticle));
    dispatch(push(`/news/${json.updateArticle.id}`));
  } catch (err) {
    console.log(err);
  }
};

export const fetchTags = (q, excludeTags) => async dispatch => {
  dispatch(requestTags());
  try {
    const json = await loadTags(q, excludeTags);
    dispatch(recieveTags(json.tags));
  } catch (err) {
    console.log(err);
  }
};
