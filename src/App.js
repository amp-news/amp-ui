import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Main from './main';
import Header from './header/header';
import Notification from './notification/Notification';

// need to add footer and grid with breadcrumbs and actions
const App = () => (
  <Grid container alignItems="stretch" direction="column" justify="space-between">
    <Notification />
    <Grid item>
      <Header />
    </Grid>
    <Grid item>
      <Main />
    </Grid>
  </Grid>
);

export default App;
