import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import RouterPropTypes from 'react-router-prop-types';
import ArticleListContainer from './list/containers/ArticleListContainer';
import ArticleContainer from './item/containers/ArticleContainer';
import ArticleEditContainer from './edit/containers/ArticleEditContainer';

const NewsRoot = ({ match }) => (
  <div>
    <Paper>
      <Switch>
        <Route exact path={`${match.url}/page/:pageNum`} component={ArticleListContainer} />
        <Route exact path={`${match.url}/create/`} component={ArticleEditContainer} />
        <Route exact path={`${match.url}/:articleId/`} component={ArticleContainer} />
        <Route exact path={`${match.url}/edit/:articleId`} component={ArticleEditContainer} />
        <Redirect
          exact
          from={`${match.url}`}
          to={`${match.url + (match.url.endsWith('/') ? '' : '/')}page/1`}
        />
      </Switch>
    </Paper>
  </div>
);

NewsRoot.propTypes = {
  match: RouterPropTypes.match.isRequired
};

export default NewsRoot;
