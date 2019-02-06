import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const flatButtonStyle = {
  minWidth: 16
};

const Page = ({ value, isActive, onChange }) => (
  <Button
    style={flatButtonStyle}
    color={isActive ? 'primary' : undefined}
    onClick={() => onChange(value)}
  >
    {value}
  </Button>
);

Page.propTypes = {
  value: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Page;
