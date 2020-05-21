import { default as React, Fragment, useCallback, useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import * as Routes from '../routes';
import { Card,Header, Navbar } from '../components';
import {Footer } from '../components';
import { useApi } from '../services';


const AwaitingRequestPage = ({children}) => {
  const history = useHistory();
  const [formations, setFormations] = useState();
  const { findMember, getFormationsFromClubAndAge } = useApi();

	const initFetch = useCallback(
		() => {
		  const fetchdata = async () => {
			const member = await findMember(JSON.parse(localStorage.getItem('mern:authUser')).id);
			const data = await getFormationsFromClubAndAge(member._clubId, member.ageCategory);
			setFormations(data);
		  }
		  fetchdata();
		},
		[getFormationsFromClubAndAge],
	)

	useEffect(() => {
		initFetch();
		return () => {
			// no cleanup
		}
	}, [initFetch]);

	const handleFormationDetail = (id) => {
		history.push(`${Routes.FORMATIONS_DETAIL.replace(':id', id)}`);
	}

  return (
    <Fragment>
		<Header />
      <main>
		<Navbar backbutton={false}/>
		<div className="formationdetailtitle">
			<div className="pagetitle">Formations {formations?(formations[0].ageCategory):''}</div>
		</div>		
		{formations && formations.map(formation => {
			return <Card member={true} edit={false} data={formation} key={formation._id} onClick={ev => handleFormationDetail(formation._id)}/>
		})}
        <div className="allformations" >These are all formations for your team.</div>
      </main>
      <Footer/>
    </Fragment>
  );
};

export default AwaitingRequestPage;