import PropTypes from 'prop-types';

const basics = {
  author: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }),
  tag: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired
  }),
  pageInfo: PropTypes.shape({
    carrent: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  })
};

const basics2 = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author: basics.author,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired
  })
};

export default {
  ...basics,
  ...basics2,
  articleLite: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    brief: PropTypes.string,
    author: basics.author,
    tags: PropTypes.arrayOf(basics.tag),
    commentsCount: PropTypes.number
  }),
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author: basics.author,
    tags: PropTypes.arrayOf(basics.tag),
    comments: PropTypes.arrayOf(basics2.comment),
    commentsCount: PropTypes.number
  })
};
