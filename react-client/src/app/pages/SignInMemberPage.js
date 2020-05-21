import { default as React, Fragment, useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import * as Routes from '../routes';
import { Link } from 'react-router-dom';
import { useApi } from '../services';
import { BackButton, InputField} from '../components';
import {Footer } from '../components';
import { useAuth } from '../services';

const SignInMemberPage = ({children}) => {
  const history = useHistory();
  const { signInMemberLocal } = useAuth();
  const [currentUser, setCurrentUser] = useState();
  const { findMember } = useApi();

	const initSignInMember = async (ev) => {
		ev.preventDefault();
		const data = {
		  email: document.getElementById('email').value,
		  password: document.getElementById('password').value,
    };
    const user = await signInMemberLocal(data.email, data.password);
    setCurrentUser(user);    
    if (user.ok !== false) {
      const member = await findMember(JSON.parse(localStorage.getItem('mern:authUser')).id);
      console.log(member.extraInfo);
      
      if (!member.extraInfo && localStorage.getItem('userType') == "Player") {
        history.push(Routes.PLAYER_INFO);
      } else if (!member._clubId){
        history.push(Routes.JOIN_CLUB);
      } else {
        history.push(Routes.FORMATIONS);
      }
    }
    };

  return (
    <Fragment>
      <main>
        <BackButton />
        <InputField label="email"/>
        <InputField type="password" label="password"/>
        <div className="register">
          <div>Don't have an account </div>
          <Link className="registerlink" to={Routes.AUTH_SIGNUP_MEMBER}> 
            <div> register here </div>
          </Link >
        </div>
        <div className="basicbutton" onClick={ev => initSignInMember(ev) }>sign in</div>
      </main>
      <Footer/>
    </Fragment>
  );
};

export default SignInMemberPage;