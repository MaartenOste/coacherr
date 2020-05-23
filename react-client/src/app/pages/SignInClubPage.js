import { default as React, Fragment } from 'react';
import { useHistory } from 'react-router';
import * as Routes from '../routes';
import { Link } from 'react-router-dom';
import { useApi, useAuth } from '../services';
import { BackButton, Footer, InputField } from '../components';
import '../components/singinClub/signInClub.scss'

const SignInClubPage = ({children}) => {
  const history = useHistory();
  const { signInLocal } = useAuth();
  const { findClub } = useApi();


	const initSignInMember = async (ev) => {
		ev.preventDefault();
		const data = {
		  email: document.getElementById('email').value,
		  password: document.getElementById('password').value,
    };
    try {
      const user = await signInLocal(data.email, data.password, 'club');
      const club = await findClub(user.id);

      if(club){
        history.push(Routes.BACKOFFICE_LANDING);
      }
    } catch (error) {
      document.getElementById('wrongCredentials').style.display = 'block';
    }
  };

  return (
    <Fragment>
      <div className="singInClubPage">
        <div className="contentconainer">
        <BackButton />
        <div className='title'>
          <div className="welcome">Login As Club</div> 
        </div>
        <InputField label="email"/>
        <InputField type="password" label="password"/>
        <div id="wrongCredentials" style={{display: 'none', color: 'red', fontSize: '1rem'}}>Username or password incorrect.</div>
        <div className="register">
          <div>Don't have an account </div>
          <Link className="registerlink" to={Routes.AUTH_SIGNUP_CLUB}> 
            <div> register here </div>
          </Link >
        </div>
        <div className="basicbutton" onClick={ev => initSignInMember(ev) }>sign in</div>
        </div>
        <Footer/>
      </div>
    </Fragment>
  );
};

export default SignInClubPage;