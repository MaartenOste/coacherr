import { default as React, Fragment, useCallback, useEffect,useState} from 'react';
import {  useParams } from 'react-router';
import { Bench, Footer, FormationInfo, FormationStructure, Header, Navbar } from '../components';
import { useApi } from '../services';

const FormationDetailPage = ({children}) => {
	const { id } = useParams();
	const { getFormationById, getStatisticsFromFormation } = useApi();
	const [ formation, setFormation] = useState();
	const [ statistics, setStatistics] = useState();

	const initFetch = useCallback(
	  () => {
		const fetchFormation = async () => {
		  const data = await getFormationById(id);
		  const stats = await getStatisticsFromFormation(id);
		  setFormation(data);
		  setStatistics(stats)
		}
  
		fetchFormation();
	  },
	  [getFormationById, getStatisticsFromFormation, id],
	)
  
	useEffect(() => {
	  initFetch();
  
	  return () => {
		// no cleanup
	  }
	}, [initFetch, id]);

	const timestampToDate = (date) => {
		const temp = new Date(date*1000);
		return `${temp.getDate()}/${temp.getMonth()+1}/${temp.getFullYear()}`;
	}

  return (
    <Fragment>
		<Header />
      <main>
		<Navbar backbutton={true}/>
		<div className="formationdetailtitle">
			<div className="pagetitle">Formation </div><div className="formationdate">{formation?timestampToDate(formation.date):''}</div>
		</div>
  		<FormationStructure players={formation?formation.players:[]} strucure={formation?formation.structure:'4-3-3'}/>
		<Bench players={formation?formation.players:[]}/>
		<FormationInfo club={formation?formation.club:''} structure={formation?formation.structure:''} score={statistics?statistics.score:''}/>
      </main>
      <Footer/>
    </Fragment>
  );
};

export default FormationDetailPage;