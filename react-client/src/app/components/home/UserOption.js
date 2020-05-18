import { default as React } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import * as Routes from '../../routes';

const UserOption = ({title, imgsrc, typeName}) => {
	const img = {
		backgroundImage: `url(${imgsrc})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat'
	}
	const setType = (ev) => {
		localStorage.setItem('userType', `${typeName}`);
	}

	return (
		typeName == 'Club'? 
			<Link className="nav-link useroption"  to={Routes.AUTH_SIGN_IN_CLUB} style={img} onClick={ev => setType(ev)}>
				<div className="optiontitle">{title}</div>
			</Link>
		:
			<Link className="nav-link useroption"  to={Routes.AUTH_SIGN_IN_MEMBER} style={img} onClick={ev => setType(ev)}>
				<div className="optiontitle">{title}</div>
			</Link>
  );
};

export default UserOption;