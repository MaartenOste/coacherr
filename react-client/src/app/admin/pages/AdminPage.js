import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as Routes from '../../routes';
import DashboardPage from './DashboardPage';
import PostCreatePage from './PostCreatePage';
import PostEditPage from './PostEditPage';
import PostsPage from './PostsPage';

const AdminPage = ({children}) => {

  return (
    <Fragment>
      <Route exact path={Routes.BACKOFFICE_LANDING}>
        <Redirect to={Routes.BACKOFFICE_DASHBOARD} />
      </Route>
      <Route exact path={Routes.BACKOFFICE_DASHBOARD} component={DashboardPage} />
      <Route exact path={Routes.BACKOFFICE_POSTS} component={PostsPage} />
      <Route exact path={Routes.BACKOFFICE_POSTS_CREATE} component={PostCreatePage} />
      <Route exact path={Routes.BACKOFFICE_POSTS_EDIT} component={PostEditPage} />     
    </Fragment>
  );
};

AdminPage.prototypes = {
  children: PropTypes.any
};

export default AdminPage;