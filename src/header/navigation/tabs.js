import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs/Tabs';
import React from 'react';
import Tab from '@material-ui/core/Tab/Tab';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { toTab } from './actions';

const NavigationTabs = ({ openedTab, onChange, security }) => (
  <Tabs value={openedTab} onChange={(event, value) => onChange(value)}>
    <Tab component={Link} to="/news" label="News" />

    {security.authenticated &&
      security.user.role === 'ROLE_ADMIN' && <Tab component={Link} to="/users" label="Users" />}

    {security.authenticated &&
      security.user.role !== 'ROLE_JMP_USER' && (
        <Tab component={Link} to="/jmp" label="JMP Programs" />
      )}

    {security.authenticated && <Tab component={Link} to="/subscriptions" label="Subscriptions" />}
  </Tabs>
);

NavigationTabs.propTypes = {
  openedTab: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
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

const mapStateToProps = state => ({
  openedTab: state.header.navigation.openedTab,
  security: state.auth.security
});

const mapDispatchToProps = dispatch => ({
  onChange: bindActionCreators(toTab, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationTabs);
