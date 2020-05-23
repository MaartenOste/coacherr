import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Routes from '../../routes';
import DashboardPage from './DashboardPage';
import EditMemberPage from './EditMemberPage';
import ClubSettingsPage from './ClubSettingsPage';

const AdminPage = ({children}) => {

  return (
    <Fragment>
      <Route exact path={Routes.BACKOFFICE_LANDING}>
        <Redirect to={Routes.BACKOFFICE_DASHBOARD} component={DashboardPage}/>
      </Route>
      <Route exact path={Routes.BACKOFFICE_DASHBOARD} component={DashboardPage}/>
      <Route exact path={Routes.EDIT_MEMBER} component={EditMemberPage}/>
      <Route exact path={Routes.CLUB_SETTINGS} component={ClubSettingsPage}/>
    </Fragment>
  );
};

AdminPage.prototypes = {
  children: PropTypes.any
};

export default AdminPage;