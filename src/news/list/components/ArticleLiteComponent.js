import React from 'react';
import { Typography, Card, CardMedia, Button, IconButton, ButtonBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import NewsPropTypes from '../../common/NewsPropTypes';
import formatDate from '../../../common/formating';

const styles = theme => ({
  card: {
    display: 'flex'
  },
  mediaSection: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  details: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
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
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  mediaInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(73, 73, 73, .4)',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  tags: {
    float: 'right',
    textAlign: 'right',
    width: '100%'
  },
  dateCreated: {
    paddingRight: theme.spacing.unit * 3,
    color: 'white'
  },
  author: {
    paddingRight: theme.spacing.unit * 3,
    color: 'white'
  }
});

const ArticleLiteComponent = ({ articleLite, classes, onOpenArticle, onDeleteArticle }) => (
  <div>
    <Card className={classes.card} id={articleLite.id}>
      <ButtonBase onClick={() => onOpenArticle(articleLite.id)}>
        <div className={classes.mediaSection}>
          <CardMedia
            className={classes.cover}
            image={
              articleLite.imageUrl ||
              'http://www.europeanea.org/wp-content/uploads/2016/03/news.jpg'
            }
            title={articleLite.title}
          />
          <div className={classes.mediaInfo}>
            <Typography className={classes.dateCreated}>
              {formatDate(articleLite.created)}
            </Typography>
            <Typography className={classes.author}>
              {articleLite.author.firstName} {articleLite.author.lastName}
            </Typography>
          </div>
        </div>
      </ButtonBase>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <ButtonBase className={classes.content} onClick={() => onOpenArticle(articleLite.id)}>
            <Typography variant="headline">{articleLite.title}</Typography>
          </ButtonBase>
          <Typography>{articleLite.brief}</Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button variant="outlined" onClick={() => onOpenArticle(articleLite.id)}>
            OPEN
          </Button>
          {onDeleteArticle && (
            <IconButton onClick={() => onDeleteArticle(articleLite.id)}>
              <DeleteIcon />
            </IconButton>
          )}
          <div className={classes.tags}>
            <Typography variant="caption">
              # {articleLite.tags.map(t => t.name).join(', ')}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

ArticleLiteComponent.propTypes = {
  articleLite: NewsPropTypes.articleLite.isRequired,
  classes: PropTypes.shape({}).isRequired,
  onOpenArticle: PropTypes.func.isRequired,
  onDeleteArticle: PropTypes.func
};

ArticleLiteComponent.defaultProps = {
  onDeleteArticle: null
};

export default withStyles(styles)(ArticleLiteComponent);
