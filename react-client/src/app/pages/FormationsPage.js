import { default as React, Fragment, useCallback, useEffect, useState} from 'react';
import { Card,Header, Navbar } from '../components';
import {Footer } from '../components';
import { useApi } from '../services';
import * as Routes from '../routes';
import { useHistory } from 'react-router';

const AwaitingRequestPage = ({children}) => {
  const history = useHistory();
  const [member, setMember] = useState();
  const [formations, setFormations] = useState();
  const { findMember, getFormationsFromClubAndAge } = useApi();

	const initFetch = useCallback(
		() => {
		  const fetchdata = async () => {
			const tempmember = await findMember(JSON.parse(localStorage.getItem('mern:authUser')).id);
			setMember(tempmember);
			const data = await getFormationsFromClubAndAge(tempmember._clubId, tempmember.ageCategory);
			setFormations(data);
		  }
		  fetchdata();
		},
		[getFormationsFromClubAndAge],
	)

	useEffect(() => {
		initFetch();
	}, [initFetch]);

	const handleNewFormation = () => {
		let arr = []
		for (let i = 0; i < 16; i++) {
			arr.push(null);
		}
		sessionStorage.setItem('players', JSON.stringify(arr));
		history.push(Routes.NEW_FORMATION);
	}

  return (
    <Fragment>
		<Header />
      <main>
		<Navbar backbutton={false}/>
		<div className="formationdetailtitle">
		<div className="pagetitle"><div>Formations {formations?(formations[0].ageCategory):''}</div> {member && member.membertype[0].name==='Coach'?<div onClick={ev => handleNewFormation()}><i className="fas fa-plus-circle" ></i></div>:''}</div>
		</div>		
		{formations && formations.map(formation => {
			return <Card member={true} edit={member?member.membertype[0].name==='Coach': false} data={formation} key={formation._id} id={formation._id}/>
		})}
        <div className="allformations">These are all formations for your team.</div>
      </main>
      <Footer/>
    </Fragment>
  );
};

export default AwaitingRequestPage;