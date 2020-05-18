import React from 'react';
import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';

import { HomePage, NotFoundPage,PayerInfoPage, SignInClubPage, SignInMemberPage, SignUpMemberPage} from './pages';
import { AdminPage } from './admin/pages';
import { BackofficeLayout, PageLayout, ErrorLayout, AuthLayout } from './layouts';
import { AuthRouteWithLayout, RouteWithLayout } from './utilities';
import * as Routes from './routes';
import { ApiProvider, AuthProvider } from './services';

import './app.scss';
import JoinClubPage from './pages/JoinClubPage';

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <ApiProvider>
          <Router basename='/'>
            <Switch>
              <RouteWithLayout exact path={Routes.LANDING} component={HomePage}/>
              <Redirect from={Routes.HOME} to={Routes.LANDING} />
              <RouteWithLayout exact path={Routes.AUTH_SIGN_IN_MEMBER} component={SignInMemberPage}/>
              <RouteWithLayout exact path={Routes.AUTH_SIGN_IN_CLUB} component={SignInClubPage}/>
              <RouteWithLayout exact path={Routes.AUTH_SIGNUP_MEMBER} component={SignUpMemberPage}/>
              <AuthRouteWithLayout exact path={Routes.PLAYER_INFO} component={PayerInfoPage}/>
              <AuthRouteWithLayout exact path={Routes.JOIN_CLUB} component={JoinClubPage}/>

              <RouteWithLayout component={NotFoundPage} layout={ErrorLayout} />
            </Switch>
          </Router>
        </ApiProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
