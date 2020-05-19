import { default as React } from 'react';
import { useHistory } from 'react-router';
import { BackButton } from './index';
import * as Routes from '../../routes';
import {  useAuth } from '../../services';
import './universal.scss';

const Navbar = ({backbutton}) => {
	const { logout } = useAuth();
	const history = useHistory();

	const handleLogout = async () => {
		logout();
		history.push(Routes.LANDING);
	}

	return (
		<div className="navigation">
			<div className="leftcomponent">
				{backbutton?<BackButton />:''}
			</div>
			<div className="rightcomponent">
				<i className="fas fa-user-cog"></i>
				<div className="logoutbutton" onClick={ev => handleLogout()}>log out</div>
			</div>
		</div>
  );
};

export default Navbar;