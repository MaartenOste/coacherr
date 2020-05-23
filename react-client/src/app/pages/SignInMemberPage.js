import { default as React, Fragment } from 'react';
import { useHistory } from 'react-router';
import * as Routes from '../routes';
import { Link } from 'react-router-dom';
import { useApi } from '../services';
import { BackButton, InputField} from '../components';
import {Footer } from '../components';
import { useAuth } from '../services';

const SignInMemberPage = ({children}) => {
  const history = useHistory();
  const { signInLocal } = useAuth();
  const { findMember } = useApi();

	const initSignInMember = async (ev) => {
		ev.preventDefault();
		const data = {
		  email: document.getElementById('email').value,
		  password: document.getElementById('password').value,
    };
    try {
      const user = await signInLocal(data.email, data.password, 'member');
      const member = await findMember(user.id);
      if (!member.extraInfo && member.membertype[0].name === 'Player') {
        history.push(Routes.PLAYER_INFO);
      } else if (!member._clubId){
        history.push(Routes.JOIN_CLUB);
      } else {
        history.push(Routes.FORMATIONS);
      }
    } catch (error) {
      document.getElementById('wrongCredentials').style.display = 'block';
    }
    };

  return (
    <Fragment>
      <main>
        <BackButton />
        <div className='title'>
          <div className="welcome">Login As Member</div> 
        </div>
        <InputField label="email"/>
        <InputField type="password" label="password"/>
        <div id="wrongCredentials" style={{display: 'none', color: 'red', fontSize: '1rem'}}>Username or password incorrect.</div>
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