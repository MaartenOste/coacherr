import { default as React, Fragment} from 'react';
import { useHistory } from 'react-router';
import * as Routes from '../routes';
import { ChooseClub, ChooseAge} from '../components';
import {Footer } from '../components';
import { useApi, useAuth } from '../services';
import '../components/joinclub/joinclub.scss';


const JoinClubPage = ({children}) => {
  const history = useHistory();
  const { findMember, getJoinRequests, updateMember, makeJoinRequest } = useApi();
  const { logout } = useAuth();

  const checkClub = async () => {
    const member = await findMember(JSON.parse(localStorage.getItem('mern:authUser')).id);
    const joinRequests = await getJoinRequests();
	  if (member._clubId) {
		  history.push(Routes.FORMATIONS);
	  }else if (joinRequests) {
      joinRequests.forEach(joinRequest => {
        if(joinRequest._memberId === JSON.parse(localStorage.getItem('mern:authUser')).id ){
          history.push(Routes.AWAITING_REQUEST);
        }
      });
    }
  }

  const sendRequest = async () => {
    await makeJoinRequest(JSON.parse(localStorage.getItem('mern:authUser')).id, document.getElementById('chooseClub').value);
    const member = await findMember(JSON.parse(localStorage.getItem('mern:authUser')).id);
    member.ageCategory = document.getElementById('age').value;
    await updateMember(member);
    history.push(Routes.AWAITING_REQUEST);
  }

  const handleLogout = async () => {
    logout();
    history.push(Routes.LANDING);
  }

  checkClub();

  return (
    <Fragment>
      <main>
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