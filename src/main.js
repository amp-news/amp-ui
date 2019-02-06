import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import News from './news/NewsRoot';
import Jmp from './jmp/containers/JMPRoot';
import AccountPage from './accounts/pages/profile/page';
import SignUpPage from './auth/signup/page';
import Accounts from './accounts/account';
import AuthenticatedRoute from './common/components/authenticatedRoute';
import SubscriptionsRoot from './subscription/SubscriptionsRoot';

const Main = () => (
  <main>
    <Switch>
      <AuthenticatedRoute path="/users" component={Accounts} hasRole="ROLE_ADMIN" />
      <Route path="/profile" component={AccountPage} />
      <Route path="/signUp" component={SignUpPage} />
      <Route path="/news" component={News} />
      <Route path="/jmp" component={Jmp} />
      <Route path="/subscriptions" component={SubscriptionsRoot} />
      <Redirect exact from="/" to="/news/page/1" />
    </Switch>
  </main>
);

export default Main;
