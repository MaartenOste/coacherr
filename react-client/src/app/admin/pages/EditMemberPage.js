import { default as React, Fragment, useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import * as Routes from '../../routes';
import { ChooseAge, Footer, InputField, Header, PreferredPosition, BackButton} from '../../components';
import { useApi, useAuth } from '../../services';
import '../components/editmember/editmember.scss';

const EditMemberPage = ({children}) => {
  const history = useHistory();
  const { id } = useParams();
  const { logout } = useAuth();
  const [member, setMember] = useState();
  const { findMember, updateMember } = useApi();

  const initFetch = useCallback(
	() => {
	  const fetchdata = async () => {
		const temp = await findMember(id);
		setMember(temp);
	  }
	  fetchdata();
	},
	[findMember, id],
)

useEffect(() => {
	initFetch();
}, [initFetch]);

	const saveSettings = async () => {
		const memberUpdate = member;
		memberUpdate.firstname = document.getElementById('First Name').value;
		memberUpdate.lastname = document.getElementById('Last Name').value;
		memberUpdate.phoneNumber = document.getElementById('Phone number').value;
		memberUpdate.ageCategory = document.getElementById('age').value;
		if (member && member.membertype[0].name === "Player") {
			memberUpdate.extraInfo = {
				"position": document.getElementById('prefpos').value,
				"foot": member.extraInfo.foot
			  }
		}
		await updateMember(memberUpdate);
		history.push(Routes.BACKOFFICE_DASHBOARD);
	}

	  
	const handleLogout = async () => {
		logout();
		history.push(Routes.LANDING);
	}
	const handleSettings = () => {
		history.push(Routes.CLUB_SETTINGS);
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
          <i className="fas fa-user-cog" onClick={ev => handleSettings()}></i>
          <div className="logoutbutton" onClick={ev => handleLogout()}>log out</div>
        </div>
        </div>
		<div className="formationdetailtitle">
			<div className="pagetitle">{member? member.firstname: ''} {member?member.lastname:''} </div>
		</div>
		<InputField key="First Name" label="First Name" value={member?member.firstname:''}/>
		<InputField key="Last Name" label="Last Name" value={member?member.lastname:''}/>
		<InputField key="Phone number" label="Phone number" value={member?member.phoneNumber:''}/>
		<ChooseAge />
		{member && member.membertype[0].name === "Player"?<PreferredPosition value={member?member.extraInfo.position:''}/>:''}
		<div className="basicbutton" onClick={ev => saveSettings()}>save settings</div>
      </main>
      <Footer clubFooter={true}/>
	  </div>
    </Fragment>
  );
};

export default EditMemberPage;