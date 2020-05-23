import { default as React, Fragment } from 'react';
import { useHistory } from 'react-router';
import { SignUpInputFieldListMember, BackButton } from '../components';
import {Footer } from '../components';
import { useAuth, useApi } from '../services';
import * as Routes from '../routes';

import '../components/universalComponents/universal.scss';

const SignUpMemberPage = ({children}) => {
  const history = useHistory();
	const { signupMember } = useAuth();
	const { getMemberTypeIdByName } = useApi();

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  const initSignUpMember = async () => {
		const memberTypeId = await getMemberTypeIdByName(localStorage.getItem('userType'));
		const data = {
		  email: document.getElementById('E-mail').value,
		  firstname: document.getElementById('First Name').value,
		  lastname: document.getElementById('Last Name').value,
		  phoneNumber: document.getElementById('Phone number').value,
		  password: document.getElementById('Password').value,
		  memberType : memberTypeId._id
		};
    if (validateEmail(document.getElementById('E-mail').value)) {
      if (document.getElementById('Password').value === document.getElementById('Repeat password').value) {
        try {
          await signupMember(data.email, data.firstname, data.lastname, data.phoneNumber, data.password, data.memberType);
          history.push(Routes.PLAYER_INFO);
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
        <SignUpInputFieldListMember />
        <div className="basicbutton" onClick={ev => initSignUpMember()}>sign up</div>
      </main>
      <Footer/>
    </Fragment>
  );
};

export default SignUpMemberPage;