import { default as React, Fragment } from 'react';
import { useHistory } from 'react-router';
import { SignUpInputFieldListClub, BackButton } from '../components';
import {Footer } from '../components';
import { useAuth, useApi } from '../services';
import * as Routes from '../routes';

import '../components/universalComponents/universal.scss';

const SignUpClubPage = ({children}) => {
  const history = useHistory();
	const { signupClub } = useAuth();

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const initSignUpClub = async () => {
		const data = {
		  email: document.getElementById('E-mail').value,
		  name: document.getElementById('Club name').value,
		  phoneNumber: document.getElementById('Phone number').value,
		  password: document.getElementById('Password').value,
		};
		console.log(data);
		
    if (validateEmail(document.getElementById('E-mail').value)) {
      if (document.getElementById('Password').value === document.getElementById('Repeat password').value) {
        try {
          await signupClub(data.email, data.password, data.name, data.clubNumber, data.phoneNumber);
          history.push(Routes.BACKOFFICE_LANDING);
        } catch (error) {
          console.log(error);
        }
      }
      else {
        document.getElementById('Repeat password').style.borderColor = 'red';
        document.getElementById('Password').style.borderColor = 'red';
      }
    } else {
		  document.getElementById('E-mail').style.borderColor = 'red';
    }
	  };

  return (
    <Fragment>
      <main>
        <BackButton />
        <SignUpInputFieldListClub />
        <div className="basicbutton" onClick={ev => initSignUpClub()}>sign up</div>
      </main>
      <Footer/>
    </Fragment>
  );
};

export default SignUpClubPage;