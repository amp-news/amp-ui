import { IconButton } from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import PropTypes from 'prop-types';
import React from 'react';

const FirstPageLink = ({ onChange }) => (
  <IconButton onClick={() => onChange(1)}>
    <FirstPageIcon />
  </IconButton>
);

FirstPageLink.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default FirstPageLink;
