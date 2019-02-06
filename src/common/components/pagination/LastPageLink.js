import { IconButton } from '@material-ui/core';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import React from 'react';

const LastPageLink = ({ onChange, lastPage }) => (
  <IconButton onClick={() => onChange(lastPage)}>
    <LastPageIcon />
  </IconButton>
);

LastPageLink.propTypes = {
  onChange: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired
};

export default LastPageLink;
