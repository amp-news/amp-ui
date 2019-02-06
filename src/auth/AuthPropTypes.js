import PropTypes from 'prop-types';

const basics = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    nickname: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    status: PropTypes.string
  })
};

export default {
  security: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    user: basics.user
  })
};
