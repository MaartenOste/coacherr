import { default as React } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import './universal.scss';

const Button = ({route, title}) => {

	return (
		<Link className="nav-link basicbutton"  to={route} >
			<div className="buttontitle">{title}</div>
		</Link>
  );
};

export default Button;