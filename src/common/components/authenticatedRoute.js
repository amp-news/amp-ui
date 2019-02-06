import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const AuthenticatedRoute = ({
  security: { authenticated, user },
  hasRole: role,
  redirectTo,
  ...props
}) =>
  authenticated && role && user.role === role ? <Route {...props} /> : <Redirect to={redirectTo} />;

AuthenticatedRoute.propTypes = {
  hasRole: PropTypes.string,
  redirectTo: PropTypes.string,
  security: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      nickname: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
      status: PropTypes.string
    })
  }).isRequired
};

AuthenticatedRoute.defaultProps = {
  hasRole: null,
  redirectTo: '/'
};

const mapStateToProps = state => ({
  security: state.auth.security
});

export default connect(mapStateToProps)(AuthenticatedRoute);
