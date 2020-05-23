import { default as React, Fragment, useCallback, useEffect,useState} from 'react';
import { useHistory, useParams } from 'react-router';
import { Bench, Footer, FormationInfo, FormationStructure, Header, Navbar } from '../components';
import { useApi } from '../services';
import * as Routes from '../routes';

const FormationDetailPage = ({children}) => {
	const { id } = useParams();
	const history = useHistory();
	const { findMember, getFormationById, getMembersFromClub, getStatisticsFromFormation, updateFormation, updateStatistic } = useApi();
	const [member, setMember] = useState();
	const [ formation, setFormation] = useState();
	const [ statistics, setStatistics] = useState();
	const [ allMembersFromClub, setAllMembersFromClub] = useState();
	const [updatePlayers, setUpdatePlayers] = useState(true);

	const initFetch = useCallback(
	  () => {
		const fetchFormation = async () => {
		  const tempmember = await findMember(JSON.parse(localStorage.getItem('mern:authUser')).id);
		  setMember(tempmember);
		  const data = await getFormationById(id);
		  sessionStorage.setItem('players', JSON.stringify(data.players));
		  sessionStorage.setItem('struct', data.structure);
		  const stats = await getStatisticsFromFormation(id);
		  const allMembers = await getMembersFromClub(tempmember._clubId, tempmember.ageCategory);
		  setFormation(data);
		  setStatistics(stats);
		  setAllMembersFromClub(allMembers);
		}
		fetchFormation();
	  },
	  [findMember, getFormationById, getStatisticsFromFormation, getMembersFromClub, id],
	)
  

	useEffect(() => {
	  initFetch();
	}, [initFetch, id]);

	const timestampToDate = (date) => {
		const temp = new Date(date*1000);
		return `${temp.getFullYear()}-${('0'+ (temp.getMonth()+1).toString()).slice(-2)}-${('0'+ (temp.getDate()).toString()).slice(-2)}`;
	}

	const changeStruct = (value) => {
		if (formation) {
			formation.structure = value;
			sessionStorage.setItem('struct', value);
		}
		setUpdatePlayers(!updatePlayers);
	}

	const saveChanges = async () =>{
		let ids= [];
		JSON.parse(sessionStorage.getItem('players')).forEach(player => {
			ids.push(player._id);
		});
		const formationUpdate = {
			_id: formation._id,
			structure: document.getElementById('chooseStructure').value,
			ageCategory: formation.ageCategory,
			_coachId: formation._coachId,
			_playersIds: ids,
			_clubId: formation._clubId,
			date: new Date(document.getElementById('formationdate').value).getTime()/1000,
		}
		await updateFormation(formationUpdate);
		const statisticUpdate = {
			_id: statistics._id,
			score: `${document.getElementById('scorehome').value}-${document.getElementById('scoreaway').value}`,
			_formationId: formation._id
		}
		await updateStatistic(statisticUpdate)
		history.push(Routes.FORMATIONS);
	}

	const handleClose = () => {
		document.getElementById('selectPlayer').style.display = 'none';
		document.getElementById('detailPage').style.display = 'block';
	}

	const addPlayerToFormation = async (id) => {
		const PlayerToSwap = sessionStorage.getItem('PlayerToSwap');
		let pl = JSON.parse(sessionStorage.getItem('players'));
		pl[PlayerToSwap] = await findMember(id);
		sessionStorage.setItem('players', JSON.stringify(pl));
		setUpdatePlayers(!updatePlayers);
		handleClose();
	}

  return (
    <Fragment>
		<Header />
      <main>
		<Navbar backbutton={true}/>
		<div className="selectPlayer" id="selectPlayer">
            <span className="close" id="close" onClick={ev=> handleClose()}>&times;</span>
            <p className="pagetitle">Select a player</p>
            <div className="row">
				<div className="col col-2 offset-1 playerType">
                	Goalkeepers
				</div>
            </div>
            <div className="playerContainer" id="Goalkeepers">
			{allMembersFromClub && allMembersFromClub.filter(member => member.extraInfo && member.extraInfo.position ==='goalkeeper').map(member => {
				return <div className="row memberrow" id={member._id} key={member._id}>
                <div className="col col-6 offset-1">
                    {member.firstname.substr(0,1)}. {member.lastname.length>10?member.lastname.substr(0,9) + "...":member.lastname}
                </div>
                <div className="col col-3">
                    {member.extraInfo.foot}
                </div>
                <div className="col col-1 add" onClick={ev => addPlayerToFormation(member._id)}>
					<i className="fas fa-plus-circle"></i>
                </div>
            </div>
			})}
            </div>
            <div className="row">
				<div className="col col-2 offset-1 playerType">
                	Defenders
				</div>
            </div>
            <div className="playerContainer" id="Defenders">
			{allMembersFromClub && allMembersFromClub.filter(member => member.extraInfo && member.extraInfo.position ==='defender').map(member => {
					return             <div className="row" id={member._id} key={member._id}>
					<div className="col col-6 offset-1">
						{member.firstname.substr(0,1)}. {member.lastname.length>10?member.lastname.substr(0,9) + "...":member.lastname}
					</div>
					<div className="col col-3">
						{member.extraInfo.foot}
					</div>
					<div className="col col-1 add">
						<i className="fas fa-plus-circle" onClick={ev => addPlayerToFormation(member._id)}></i>
					</div>
				</div>
			})}
            </div>
            <div className="row">
				<div className="col col-2 offset-1 playerType">
                	Midfielders
				</div>
            </div>
            <div className="playerContainer" id="Midfielders">
			{allMembersFromClub && allMembersFromClub.filter(member => member.extraInfo && member.extraInfo.position ==='midfielder').map(member => {
					return             <div className="row" id={member._id} key={member._id}>
					<div className="col col-6 offset-1">
						{member.firstname.substr(0,1)}. {member.lastname.length>10?member.lastname.substr(0,9) + "...":member.lastname}
					</div>
					<div className="col col-3">
						{member.extraInfo.foot}
					</div>
					<div className="col col-1 add">
						<i className="fas fa-plus-circle" onClick={ev => addPlayerToFormation(member._id)}></i>
					</div>
				</div>
			})}
            </div>
            <div className="row">
				<div className="col col-2 offset-1 playerType">
                	Attackers
				</div>
            </div>
            <div className="playerContainer" id="Attackers">
			{allMembersFromClub && allMembersFromClub.filter(member => member.extraInfo && member.extraInfo.position ==='attacker').map(member => {
					return (<div className="row" id={member._id} key={member._id}>
					<div className="col col-6 offset-1">
						{member.firstname.substr(0,1)}. {member.lastname.length>10?member.lastname.substr(0,9) + "...":member.lastname}
					</div>
					<div className="col col-3">
						{member.extraInfo.foot}
					</div>
					<div className="col col-1 add">
						<i className="fas fa-plus-circle" onClick={ev => addPlayerToFormation(member._id)}></i>
					</div>
				</div>)
			})}
            </div>
		</div>
		<div className="detailPage" id="detailPage">
		<div className="formationdetailtitle">
			<div className="pagetitle">Formation </div>
			<div className="formationdate">
				{formation
					?member.membertype[0].name==='Player'
						?<div className="formationdate">{timestampToDate(formation.date).slice(-2)}/{timestampToDate(formation.date).substr(5,2)}/{timestampToDate(formation.date).substr(0,4)}</div>
						:<div className="formationdate"><input type="date" id="formationdate" name="formationdate" defaultValue={timestampToDate(formation.date)}/></div>
						:<div className="formationdate"><input type="date" id="formationdate" name="formationdate" /></div>
					}
			</div>
		</div>
		{formation? <div><FormationStructure allMembers={allMembersFromClub?allMembersFromClub:''} edit={member?member.membertype[0].name==='Coach': false} strucure={formation?formation.structure:'4-3-3'} update={updatePlayers}/>
		<Bench edit={member?member.membertype[0].name==='Coach': false} update={updatePlayers}/></div>:null}
		<FormationInfo club={formation?formation.club:''} edit={member?member.membertype[0].name==='Coach': false} score={statistics?statistics.score:''} structure={formation?formation.structure:''} change={changeStruct}/>
		{member && member.membertype[0].name==='Coach'?<div className="basicbutton" onClick={ev => saveChanges()}>save</div>:''}
		</div>
	  </main>
      <Footer/>
    </Fragment>
  );
};

export default FormationDetailPage;