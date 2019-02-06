import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import NewsPropTypes from '../../common/NewsPropTypes';
import ArticleLiteComponent from './ArticleLiteComponent';
import { isRoleOrAdmin } from '../../../common/service/Authorization';

const ArticleListComponent = ({ articleList, onOpenArticle, onDeleteArticle, security }) => (
  <Grid container justify="center">
    <Grid item xs={10}>
      <Grid container spacing={16} alignItems="center" justify="center">
        {articleList.map(article => (
          <Grid key={article.id} item xs={9}>
            <ArticleLiteComponent
              articleLite={article}
              onOpenArticle={onOpenArticle}
              onDeleteArticle={
                isRoleOrAdmin(security, 'ROLE_JMP_USER', article.author.id) ? onDeleteArticle : null
              }
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);

ArticleListComponent.propTypes = {
  articleList: PropTypes.arrayOf(NewsPropTypes.articleLite).isRequired,
  onOpenArticle: PropTypes.func.isRequired,
  onDeleteArticle: PropTypes.func.isRequired,
  security: PropTypes.shape({})
};

ArticleListComponent.defaultProps = {
  security: null
};

export default ArticleListComponent;
