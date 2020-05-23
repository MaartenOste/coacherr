import { default as React, Fragment, useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import * as Routes from '../../routes';
import { BackButton, Footer, InputField, Header, Navbar, PreferredFoot, PreferredPosition} from '../../components';
import { useApi, useAuth } from '../../services';
import '../components/editmember/editmember.scss';

const ClubSettingsPage = ({children}) => {
  const history = useHistory();
  const { id } = useParams();
  const { logout } = useAuth();
  const [club, setClub] = useState();
  const { findClub, updateClub } = useApi();

  const initFetch = useCallback(
	() => {
	  const fetchdata = async () => {
		const temp = await findClub(JSON.parse(localStorage.getItem('mern:authUser')).id);
		setClub(temp);
	  }
	  fetchdata();
	},
	[findClub],
)

useEffect(() => {
	initFetch();
}, [initFetch]);

	const saveSettings = async () => {
		const clubUpdate = club;
		clubUpdate.name = document.getElementById('Name').value;
		clubUpdate.phoneNumber = document.getElementById('Phone number').value;
		clubUpdate.clubNumber = document.getElementById('ClubNumber').value;

		await updateClub(clubUpdate);
		history.push(Routes.BACKOFFICE_DASHBOARD);
	}

	  
	const handleLogout = async () => {
		logout();
		history.push(Routes.LANDING);
	}


  return (
    <Fragment>
		<div className='editmemberpage'>
		<Header clubHeader={true}/>
      	<main>
		  <div className="navigation">
        <div className="leftcomponent">
		<BackButton />
        </div>
        <div className="rightcomponent">
          <div className="logoutbutton" onClick={ev => handleLogout()}>log out</div>
        </div>
        </div>
		<div className="formationdetailtitle">
			<div className="pagetitle">{club? club.name: ''}</div>
		</div>
		<InputField key="Name" label="Name" value={club?club.name:''}/>
		<InputField key="Phone number" label="Phone number" value={club?club.phoneNumber:''}/>
		<InputField key="ClubNumber" label="ClubNumber" value={club?club.clubNumber:''}/>
		<div className="basicbutton" onClick={ev => saveSettings()}>save settings</div>
      </main>
      <Footer clubFooter={true}/>
	  </div>
    </Fragment>
  );
};

export default ClubSettingsPage;