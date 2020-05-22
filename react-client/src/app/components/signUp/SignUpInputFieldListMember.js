import { default as React } from 'react';
import { useHistory } from 'react-router';
import { InputField } from '../universalComponents';
import './login.scss';
import { useAuth, useApi } from '../../services';
import * as Routes from '../../routes';


const SignUpInputFieldListMember = ({children}) => {
	const history = useHistory();
	const { signupMember } = useAuth();
	const { getMemberTypeIdByName } = useApi();

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

		try {
		  await signupMember(data.email, data.firstname, data.lastname, data.phoneNumber, data.password, data.memberType);
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
			<div className="basicbutton" onClick={ev => initSignUpMember()}>sign up</div>
		</form>
  );
};

export default SignUpInputFieldListMember;