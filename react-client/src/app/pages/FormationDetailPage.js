import { default as React, Fragment, useCallback, useEffect,useState} from 'react';
import {  useParams } from 'react-router';
import { Header, Navbar } from '../components';
import {Footer } from '../components';
import { useApi } from '../services';


const FormationDetailPage = ({children}) => {
	const { id } = useParams();
	const { getFormationsById } = useApi();
	const [ formation, setFormation] = useState(null);
  
	const initFetch = useCallback(
	  () => {
		const fetchFormation = async () => {
		  const data = await getFormationsById(id);
		  
		  setFormation(data);
		}
  
		fetchFormation();
	  },
	  [getFormationsById, id],
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
  		
		{formation?formation.structure: ''}
      </main>
      <Footer/>
    </Fragment>
  );
};

export default FormationDetailPage;