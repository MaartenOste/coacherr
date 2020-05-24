import { default as React } from 'react';
import './universal.scss';

const InputField = ({label, type, value}) => {
	const selectAll = () =>{
		const input = document.getElementById(label);
  		input.focus();
  		input.select();
	}

	return (
		<div className="InputField">
			<label htmlFor={label}>{label}:</label>
			  <input type={type? type: "text"} onClick={ev => selectAll()} id={label} 
			  name={label} placeholder={label} defaultValue={value?value:''}/>
		</div>
  );
};

export default InputField;