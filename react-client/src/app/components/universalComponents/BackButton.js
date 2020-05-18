import { default as React } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import './universal.scss';

const BackButton = ({children}) => {

	const goBack = (ev) =>{
		ev.preventDefault();
		window.history.back();
	}

	return (
		<i onClick= { ev => goBack(ev)} className="fas fa-arrow-circle-left backbutton"></i>
  );
};

export default BackButton;