import { default as React } from 'react';
import { InputField } from '../universalComponents';
import './login.scss';

const SignUpInputFieldListMember = ({children}) => {

	return (
		<form className='InputFieldList'>
			<InputField key="E-mail" label="E-mail"/>
			<InputField key="First Name" label="First Name"/>
			<InputField key="Last Name" label="Last Name"/>
			<InputField key="Phone number" label="Phone number"/>
			<InputField key="Password" label="Password" type="password"/>
			<InputField key="Repeat password" label="Repeat password" type="password"/>
		</form>
  );
};

export default SignUpInputFieldListMember;