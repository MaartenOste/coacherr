import { default as React, Fragment, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as Routes from '../routes';
import { InputField, Header, Navbar, PreferredPosition} from '../components';
import {Footer } from '../components';
import { useApi } from '../services';


const MemberSettingsPage = ({children}) => {
  const history = useHistory();
  const [member, setMember] = useState();
  const { findMember, updateMember } = useApi();

  const initFetch = useCallback(
	() => {
	  const fetchdata = async () => {
		const temp = await findMember(JSON.parse(localStorage.getItem('mern:authUser')).id);
		setMember(temp);
	  }
	  fetchdata();
	},
	[findMember],
)

useEffect(() => {
	initFetch();

}, [initFetch]);

	const saveSettings = async () => {
		const tempMember = member;
		tempMember.firstname = document.getElementById('First Name').value;
		tempMember.lastname = document.getElementById('Last Name').value;
		tempMember.phoneNumber = document.getElementById('Phone number').value;
		if (member && member.membertype[0].name === "Player") {
			tempMember.extraInfo = {
				"position": document.getElementById('prefpos').value,
				"foot": member.extraInfo.foot
			  }
		}
		await updateMember(tempMember);
		history.push(Routes.FORMATIONS);
	}

	const handleLeaveClub = async () => {
		const tempMember = member;
		tempMember._clubId = null;
		await updateMember(tempMember);
		history.push(Routes.JOIN_CLUB);
	}

  return (
    <Fragment>
		<Header />
      <main>
		<Navbar backbutton={true}/>
		<div className="formationdetailtitle">
			<div className="pagetitle">Settings </div>
		</div>
		<InputField key="First Name" label="First Name" value={member?member.firstname:''}/>
		<InputField key="Last Name" label="Last Name" value={member?member.lastname:''}/>
		<InputField key="Phone number" label="Phone number" value={member?member.phoneNumber:''}/>
		{member && member.membertype[0].name === "Player"?<PreferredPosition value={member?member.extraInfo.position:''}/>:''}
		<div className="basicbutton" onClick={ev => saveSettings()}>save settings</div>
		<div className="basicbutton leaveclub" onClick={ev => handleLeaveClub()}>leave club</div>
      </main>
      <Footer/>
    </Fragment>
  );
};

export default MemberSettingsPage;