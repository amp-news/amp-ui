const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};

const formatDate = date => new Date(date).toLocaleDateString('en-US', dateOptions);

export default formatDate;
