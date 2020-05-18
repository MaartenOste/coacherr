import { default as React, Fragment, useState} from 'react';
import { useHistory, Route } from 'react-router';
import * as Routes from '../routes';
import { Link } from 'react-router-dom';
import { Button, BackButton, ChooseClub, ChooseAge, InputField} from '../components';
import {Footer } from '../components';
import { useApi, useAuth } from '../services';
import '../components/joinclub/joinclub.scss';


const JoinClubPage = ({children}) => {
  const history = useHistory();
  const { findMember, makeJoinRequest } = useApi();
  const { logout } = useAuth();

  const checkClub = async () => {
    if (localStorage.getItem('mern:authUser') == null){
      history.push(Routes.LANDING);
    }
    const member = await findMember(JSON.parse(localStorage.getItem('mern:authUser')).id);
	  if (member._clubId) {
		  history.push(Routes.FORMATIONS);
	  }
  }

  const sendRequest = async () => {
    await makeJoinRequest(JSON.parse(localStorage.getItem('mern:authUser')).id, document.getElementById('chooseClub').value);
    //history.push(Routes.FORMATIONS);
  }

  const handleLogout = async () => {
    logout();
    history.push(Routes.LANDING);
  }

  checkClub();

  return (
    <Fragment>
      <main>
        <BackButton />
        <h2>
          Now that you are 
          signed up, it's time
          to join your club!
        </h2>
        <ChooseClub />
        <ChooseAge />
        <div className="basicbutton" onClick={ev => sendRequest()}>send request</div>
        <div className="basicbutton" onClick={ev => handleLogout()}>logout</div>
      </main>
      <Footer/>
    </Fragment>
  );
};

export default JoinClubPage;