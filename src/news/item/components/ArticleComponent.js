import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardMedia,
  IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

import EditIcon from '@material-ui/icons/Edit';
import NewsPropTypes from '../../common/NewsPropTypes';
import CommentsContainer from '../containers/CommentsContainer';
import formatDate from '../../../common/formating';

const styles = theme => ({
  card: {
    display: 'flex'
  },
  mediaSection: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    bottom: theme.spacing.unit
  },
  details: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    bottom: 0
  },
  content: {
    flex: '1 0 auto',
    textAlign: 'left'
  },
  cover: {
    width: 320,
    height: 240
  },
  controls: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    width: '95%',
    bottom: 0
  },
  articleActions: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  mediaInfo: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  tags: {
    float: 'right',
    textAlign: 'right',
    width: '100%'
  },
  dateCreated: {
    paddingRight: theme.spacing.unit * 3
  },
  author: {
    paddingRight: theme.spacing.unit * 3
  }
});

const ArticleComponent = ({ article, classes, onEdit, onDelete }) => (
  <div>
    <Card className={classes.card} id={article.id}>
      <div className={classes.mediaSection}>
        <CardMedia
          className={classes.cover}
          image={
            article.imageUrl || 'http://www.europeanea.org/wp-content/uploads/2016/03/news.jpg'
          }
          title={article.title}
        />
      </div>
      <div className={classes.mediaSection}>
        <CardHeader
          title={article.title}
          subheader={
            <div className={classes.mediaInfo}>
              <Typography className={classes.dateCreated}>{formatDate(article.created)}</Typography>
              <Typography className={classes.author}>
                {article.author.firstName} {article.author.lastName}
              </Typography>
            </div>
          }
        />
        <div className={classes.controls}>
          <div className={classes.articleActions}>
            {onEdit && (
              <IconButton onClick={() => onEdit(article.id)}>
                <EditIcon />
              </IconButton>
            )}
            {onDelete && (
              <IconButton onClick={() => onDelete(article.id)}>
                <DeleteIcon />
              </IconButton>
            )}
          </div>
          <div className={classes.tags}>
            <Typography variant="caption"># {article.tags.map(t => t.name).join(', ')}</Typography>
          </div>
        </div>
      </div>
    </Card>
    <Card>
      <CardContent>
        <Typography>{article.text}</Typography>
      </CardContent>
    </Card>
    <CommentsContainer />
  </div>
);

ArticleComponent.propTypes = {
  article: NewsPropTypes.article.isRequired,
  classes: PropTypes.shape({}).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

ArticleComponent.defaultProps = {
  onEdit: null,
  onDelete: null
};

export default withStyles(styles)(ArticleComponent);
