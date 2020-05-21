import { default as React, Fragment, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as Routes from '../routes';
import { InputField, Header, Navbar, PreferredFoot, PreferredPosition} from '../components';
import {Footer } from '../components';
import { useApi } from '../services';


const MemberSettingsPage = ({children}) => {
  const history = useHistory();
  const [member, setMember] = useState();
  const { findMember, updateMember } = useApi();

  const initFetch = useCallback(
	() => {
	  const fetchdata = async () => {
		const member = await findMember(JSON.parse(localStorage.getItem('mern:authUser')).id);
		setMember(member);
	  }
	  fetchdata();
	},
	[findMember],
)

useEffect(() => {
	initFetch();

}, [initFetch]);

	const saveSettings = async () => {
		const member = await findMember(JSON.parse(localStorage.getItem('mern:authUser')).id);
		member.firstname = document.getElementById('First Name').value;
		member.lastname = document.getElementById('Last Name').value;
		member.phoneNumber = document.getElementById('Phone number').value;
		member.extraInfo = {
		  "position": document.getElementById('prefpos').value,
		  "foot": document.querySelector('input[name="preffoot"]:checked').value
		}
		await updateMember(member);
		history.push(Routes.FORMATIONS);
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
		<PreferredPosition value={member?member.extraInfo.position:''}/>
		<div className="basicbutton" onClick={ev => saveSettings()}>save settings</div>
      </main>
      <Footer/>
    </Fragment>
  );
};

export default MemberSettingsPage;