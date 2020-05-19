import { default as React, Fragment } from 'react';
import { useHistory } from 'react-router';
import * as Routes from '../routes';
import {Footer } from '../components';
import { useApi, useAuth } from '../services';
import '../components/joinclub/joinclub.scss';


const AwaitingRequestPage = ({children}) => {
  const history = useHistory();
  const { logout } = useAuth();
  const { destroyJoinRequest } = useApi();

	const handleCancelRequest = async () => {
		await destroyJoinRequest(JSON.parse(localStorage.getItem('mern:authUser')).id)
		history.push(Routes.JOIN_CLUB);
	}

  const handleLogout = async () => {
    logout();
    history.push(Routes.LANDING);
  }

  return (
    <Fragment>
      <main>
        <h2>
			The club you tried
			to join has not
			handled your 
			application yet.
        </h2>
        <div className="basicbutton"  onClick={ev => handleCancelRequest()}>cancel application</div>
        <div className="basicbutton" onClick={ev => handleLogout()}>logout</div>
      </main>
      <Footer/>
    </Fragment>
  );
};

export default AwaitingRequestPage;