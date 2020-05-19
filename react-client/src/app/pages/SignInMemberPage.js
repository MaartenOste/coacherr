import { default as React, Fragment, useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import * as Routes from '../routes';
import { Link } from 'react-router-dom';
import { BackButton, InputField} from '../components';
import {Footer } from '../components';
import { useAuth } from '../services';

const SignInMemberPage = ({children}) => {
  const history = useHistory();
  const { signInMemberLocal } = useAuth();
  const [currentUser, setCurrentUser] = useState();

	const initSignInMember = async (ev) => {
		ev.preventDefault();
		const data = {
		  email: document.getElementById('email').value,
		  password: document.getElementById('password').value,
    };
    const user = await signInMemberLocal(data.email, data.password);
    setCurrentUser(user);    
    if (user.ok !== false) {
      setCurrentUser(user);
      history.push(Routes.PLAYER_INFO);
    }
    };

    useEffect(() => {

    }, [currentUser]);

  return (
    <Fragment>
      <main>
        <BackButton />
        <InputField label="email"/>
        <InputField type="password" label="password"/>
        <div>Don't have an account</div>
        <Link className="nav-link"  to={Routes.AUTH_SIGNUP_MEMBER}> 
          <div>register here </div>
        </Link >
        <div className="basicbutton" onClick={ev => initSignInMember(ev) }>sign in</div>
      </main>
      <Footer/>
    </Fragment>
  );
};

export default SignInMemberPage;