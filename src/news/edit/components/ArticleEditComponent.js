import React, { Component } from 'react';
import { Card, CardContent, CardMedia, Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import 'react-select/dist/react-select.css';

import SaveIcon from '@material-ui/icons/Save';
import NewsPropTypes from '../../common/NewsPropTypes';

const ITEM_HEIGHT = 48;
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
  mediaSectionTitle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    bottom: theme.spacing.unit,
    width: '95%'
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
  },
  iconSmall: {
    fontSize: 20
  },
  textField: {
    width: '80%'
  },
  root: {
    width: '80%'
  },
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none'
      }
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap'
    },
    '.Select--multi .Select-input': {
      margin: 0
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto'
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none'
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto'
    },
    '.Select-menu div': {
      boxSizing: 'content-box'
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1
    }
  }
});

class ArticleEditComponent extends Component {
  state = {
    titleValue: null,
    textValue: null,
    briefValue: null,
    tagsValue: null
  };

  componentDidMount() {
    const { article, articleId } = this.props;
    if (article && articleId) {
      this.setState({
        titleValue: article.title,
        textValue: article.text,
        briefValue: article.brief,
        tagsValue: article.tags ? article.tags.map(t => t.name) : null
      });
    }
    console.log(`article = ${article}`);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value.replace(/\r?\n|\r/g, '')
    });
  };

  handleChangeTags = event => {
    this.setState({
      tagsValue: event.target.value ? event.target.value.split(',').map(t => t.trim()) : null
    });
  };

  render() {
    const { onSave, classes, articleId } = this.props;
    const { titleValue, textValue, briefValue, tagsValue } = this.state;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.mediaSection}>
            <CardMedia
              className={classes.cover}
              image="http://www.europeanea.org/wp-content/uploads/2016/03/news.jpg"
            />
          </div>
          <div className={classes.mediaSectionTitle}>
            <TextField
              id="titleTextField"
              label="Title"
              multiline
              rowsMax="2"
              fullWidth
              value={titleValue || ''}
              onChange={this.handleChange('titleValue')}
              className={classes.textField}
              inputRef={el => {
                this.titleValueTextField = el;
              }}
              margin="normal"
            />
            <TextField
              id="tagsTextField"
              label="Tags"
              fullWidth
              value={tagsValue ? tagsValue.join(', ') : ''}
              onChange={ev => this.handleChangeTags(ev)}
              className={classes.textField}
              inputRef={el => {
                this.tagsValueTextField = el;
              }}
              margin="normal"
            />
            <div className={classes.controls}>
              <div className={classes.articleActions}>
                {onSave && (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => onSave(articleId, titleValue, briefValue, textValue, tagsValue)}
                  >
                    <SaveIcon className={classes.iconSmall} />
                    Save
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <CardContent>
            <TextField
              id="BriefTextField"
              label="Brief"
              multiline
              rowsMax="2"
              fullWidth
              value={briefValue || ''}
              onChange={this.handleChange('briefValue')}
              className={classes.textField}
              inputRef={el => {
                this.briefValueTextField = el;
              }}
              margin="normal"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <TextField
              id="TextTextField"
              label="Text"
              multiline
              rowsMax="2"
              fullWidth
              value={textValue || ''}
              onChange={this.handleChange('textValue')}
              className={classes.textField}
              inputRef={el => {
                this.textValueTextField = el;
              }}
              margin="normal"
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

ArticleEditComponent.propTypes = {
  article: NewsPropTypes.article,
  articleId: NewsPropTypes.string,
  classes: PropTypes.shape({}).isRequired,
  onSave: PropTypes.func
};

ArticleEditComponent.defaultProps = {
  article: null,
  articleId: null,
  onSave: null
};

export default withStyles(styles)(ArticleEditComponent);
