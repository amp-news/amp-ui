import api from '../../common/service/api';

export const DEFAULT_LIST_SIZE = 10;

const articleListQuery = `
  query ArticleList($size:Int, $offset: Int) {
    articles(size: $size, offset: $offset) {
      content {
        id,
        title,
        brief,
        author {
          id,
          firstName,
          lastName
        },
        tags {
          id,
          name
        },
        created,
        updated
      },
      pageInfo {
        totalPages
      }
    }
  }
`;

const articleQuery = `
  query Article($id: ID!) {
    article(id: $id) {
      id,
      brief,
      title,
      text,
      tags {
        name
      },
      author {
        id,
        firstName,
        lastName
      },
      comments(size: 10, offset: 0) {
        id,
        text,
        author {
          id,
          firstName,
          lastName
        },
        created,
        updated
      },
      commentsCount,
      updated,
      created,
    }
  }
`;

const articleCommentsQuery = `
  query Article($articleId: ID!, $size: Int, $offset: Int) {
    article(id: $articleId) {
      comments(size: $size, offset: $offset) {
        id,
        text,
        author {
          id,
          firstName,
          lastName
        },
        created,
        updated
      },
      commentsCount
    }
  }
`;

const createArticleMutation = `
  mutation createArticle($title: String!, $text: String, $brief: String, $tags: [String!]) {
    createArticle(input: {
      title: $title,
      text: $text
      brief: $brief
      tags: $tags
    }) {
      id,
      brief,
      title,
      text,
      tags {
        name
      },
      author {
        id,
        firstName,
        lastName
      },
      comments(size: 10, offset: 0) {
        id,
        text,
        author {
          id,
          firstName,
          lastName
        },
        created,
        updated
      },
      commentsCount,
      updated,
      created
    }
  }
`;

const updateArticleMutation = `
  mutation updateArticle($articleId: ID!, $title: String!, $text: String, $brief: String, $tags: [String!]) {
    updateArticle(id: $articleId, input: {
      title: $title,
      text: $text
      brief: $brief
      tags: $tags
    }) {
      id,
      brief,
      title,
      text,
      tags {
        name
      },
      author {
        id,
        firstName,
        lastName
      },
      comments(size: 10, offset: 0) {
        id,
        text,
        author {
          id,
          firstName,
          lastName
        },
        created,
        updated
      },
      commentsCount,
      updated,
      created
    }
  }
`;

const commentsQuery = `
  query comments($size: Int, $offset: Int, $articleId: ID!) {
    comments(size: $size, offset: $offset, articleId: $articleId) {
      id,
      author {
        id,
        firstName,
        lastName
      },
      text,
      created,
      updated
    }
  }
`;

const deleteCommentMutation = `
  mutation deleteComment($id: ID!) {
    deleteComment(id:$id)
  }
`;

const updateCommentMutation = `
  mutation updateComment($id: ID!, $text: String) {
    updateComment(id: $id, text: $text) {
      id,
      author {
        id,
        firstName,
        lastName
      },
      text,
      created,
      updated
    }
  }
`;

const createCommentMutation = `
  mutation createComment($text: String, $articleId: ID!){
    createComment(text: $text, articleId: $articleId) {
      id,
      author {
        id,
        firstName,
        lastName
      },
      text,
      created,
      updated
    }
  }
`;

const deleteArticleMutation = `
  mutation deleteArticle($id: ID!) {
    deleteArticle(id:$id)
  }
`;

const tagsQuery = `
  query loadTags($q: String, $excludeTags: [String!]) {
    tags(search: $q, excludeTags: $excludeTags) {
      id, name
    }
  }
`;

const queryServer = (query, params) =>
  api
    .post(
      '/news/graphql',
      JSON.stringify({
        query,
        variables: params
      })
    )
    .then(res => res.data.data);

export const loadArticleList = (offset = 0, size = DEFAULT_LIST_SIZE) =>
  queryServer(articleListQuery, { size, offset });

export const loadArticle = id => queryServer(articleQuery, { id });

export const loadComments = (articleId, offset = 0, size = DEFAULT_LIST_SIZE) =>
  queryServer(commentsQuery, { articleId, size, offset });

export const loadCommentsWithTotal = (articleId, offset = 0, size = DEFAULT_LIST_SIZE) =>
  queryServer(articleCommentsQuery, { articleId, size, offset });

export const deleteComment = id => queryServer(deleteCommentMutation, { id });

export const deleteArticle = id => queryServer(deleteArticleMutation, { id });

export const updateComment = (id, text) => queryServer(updateCommentMutation, { id, text });

export const createComment = (articleId, text) =>
  queryServer(createCommentMutation, { articleId, text });

export const createArticle = (title, text, brief, tags) =>
  queryServer(createArticleMutation, { title, text, brief, tags });

export const updateArticle = (articleId, title, text, brief, tags) =>
  queryServer(updateArticleMutation, { articleId, title, text, brief, tags });

export const loadTags = (q, excludeTags) => queryServer(tagsQuery, { q, excludeTags });
