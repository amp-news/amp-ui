import React from 'react';
import { AppBar } from '@material-ui/core';
import HeaderToolbar from './toolbar/headerToolbar';
import NavigationTabs from './navigation/tabs';

const Header = () => (
  <AppBar position="static">
    <HeaderToolbar />
    <NavigationTabs />
  </AppBar>
);

export default Header;
