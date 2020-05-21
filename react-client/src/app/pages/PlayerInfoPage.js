import { default as React, Fragment} from 'react';
import { useHistory } from 'react-router';
import * as Routes from '../routes';
import { Link } from 'react-router-dom';
import { Button, BackButton, InputField} from '../components';
import {Footer } from '../components';
import { useApi, useAuth } from '../services';
import {PreferredFoot, PreferredPosition} from '../components/playerinfo';
import '../components/playerinfo/playerinfo.scss';


const PayerInfoPage = ({children}) => {
  const history = useHistory();
  const { findMember, updateMember } = useApi()
  const { logout } = useAuth();
  ;

  const setInfo = async () => {
    const member = await findMember(JSON.parse(localStorage.getItem('mern:authUser')).id);

    member.extraInfo = {
      "position": document.getElementById('prefpos').value,
      "foot": document.querySelector('input[name="preffoot"]:checked').value
    }
    const ret = await updateMember(member);
	  history.push(Routes.JOIN_CLUB);
  }

  const handleLogout = async () => {
    logout();
    history.push(Routes.LANDING);
  }
  
  return (
    <Fragment>
      <main>
        <h2>Just a some more
          personal info and 
          you are done!
        </h2>
        <PreferredPosition/>
        <PreferredFoot/>
		    <div className="basicbutton" onClick={ev => setInfo()}>save info</div>
        <div className="basicbutton" onClick={ev => handleLogout()}>logout</div>
      </main>
      <Footer/>
    </Fragment>
  );
};

export default PayerInfoPage;