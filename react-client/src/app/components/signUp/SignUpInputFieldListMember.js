import { default as React, useState, useEffect } from 'react';
import { useHistory, Route } from 'react-router';
import { InputField } from '../universalComponents';
import './login.scss';
import { useAuth } from '../../services';
import * as Routes from '../../routes';
import { Button, BackButton } from '../../components';


const SignUpInputFieldListMember = ({children}) => {
	const history = useHistory();
	const { signupMember } = useAuth();

	const initSignUpMember = async (ev) => {
		ev.preventDefault();
		const data = {
		  email: document.getElementById('E-mail').value,
		  firstname: document.getElementById('First Name').value,
		  lastname: document.getElementById('Last Name').value,
		  phoneNumber: document.getElementById('Phone number').value,
		  password: document.getElementById('Password').value,
		};

		try {
		  await signupMember(data.email, data.firstname, data.lastname, data.phoneNumber, data.password);
		  history.push(Routes.PLAYER_INFO);
		} catch (error) {
		  console.log(error);
		}
	  };

	return (
		<form className='InputFieldList'>
			<InputField key="E-mail" label="E-mail"/>
			<InputField key="First Name" label="First Name"/>
			<InputField key="Last Name" label="Last Name"/>
			<InputField key="Phone number" label="Phone number"/>
			<InputField key="Password" label="Password"/>
			<InputField key="Repeat password" label="Repeat password"/>
			<div className="basicbutton" onClick={ev => initSignUpMember(ev)}>sign up</div>
		</form>
  );
};

export default SignUpInputFieldListMember;