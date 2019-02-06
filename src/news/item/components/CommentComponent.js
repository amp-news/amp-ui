import React from 'react';
import { Typography, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NewsPropTypes from '../../common/NewsPropTypes';
import formatDate from '../../../common/formating';
import { isRoleOrAdmin } from '../../../common/service/Authorization';

const styles = theme => ({
  comment: {
    textAlign: 'left',
    alignItems: 'left'
  },
  header: {
    display: 'flex',
    width: '95%'
  },
  info: {
    display: 'flex',
    width: '95%'
  },
  date: {
    paddingLeft: theme.spacing.unit * 2
  },
  actions: {
    display: 'flex',
    float: 'right',
    textAlign: 'right',
    height: '18px',
    width: '18px'
  },
  actionButton: {
    paddingBottom: theme.spacing.unit
  }
});

const CommentComponent = ({ comment, classes, onDeleteComment, onEditComment, security }) => (
  <div className={classes.comment}>
    <div className={classes.header}>
      <div className={classes.info}>
        <Typography variant="body2">
          {comment.author.firstName} {comment.author.lastName}
        </Typography>
        <Typography variant="body1" className={classes.date}>
          {formatDate(comment.created)}
        </Typography>
      </div>
      <div className={classes.actions}>
        {onEditComment &&
          isRoleOrAdmin(security, 'ROLE_JMP_USER', comment.author.id) && (
            <IconButton
              className={classes.actionButton}
              onClick={() => onEditComment(comment.id, comment.text)}
              style={{ fontSize: 16 }}
            >
              <EditIcon style={{ fontSize: 18 }} />
            </IconButton>
          )}
        {onDeleteComment &&
          isRoleOrAdmin(security, 'ROLE_JMP_USER', comment.author.id) && (
            <IconButton
              className={classes.actionButton}
              onClick={() => onDeleteComment(comment.id)}
              style={{ fontSize: 16 }}
            >
              <DeleteIcon style={{ fontSize: 18 }} />
            </IconButton>
          )}
      </div>
    </div>
    <hr />
    {comment.text ? (
      comment.text
    ) : (
      <Typography variant="caption" color="secondary">
        UFO stole this comment
      </Typography>
    )}
  </div>
);

CommentComponent.propTypes = {
  comment: NewsPropTypes.comment.isRequired,
  classes: PropTypes.shape({}).isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
  security: PropTypes.shape({})
};

CommentComponent.defaultProps = {
  security: null
};

export default withStyles(styles)(CommentComponent);
