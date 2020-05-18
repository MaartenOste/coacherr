import { default as React } from 'react';
import './universal.scss';

const InputField = ({label, type}) => {
	return (
		<div className="InputField">
			<label htmlFor={label}>{label}:</label>
  			<input type={type? type: "text"} id={label} name={label} placeholder={label}/>
		</div>
  );
};

export default InputField;