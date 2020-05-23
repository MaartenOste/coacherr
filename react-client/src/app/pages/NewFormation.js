import { default as React, Fragment, useCallback, useEffect,useState} from 'react';
import { useHistory, useParams } from 'react-router';
import { Bench, Footer, FormationInfo, FormationStructure, Header, Navbar } from '../components';
import { useApi } from '../services';
import * as Routes from '../routes';

const NewFormation = ({children}) => {
	const { id } = useParams();
	const history = useHistory();
	const { findMember, getFormationById, getMembersFromClub, getStatisticsFromFormation, getEmptyMember, createFormation, createStatistic } = useApi();
	const [member, setMember] = useState();
	const [ formation, setFormation] = useState([]);
	const [ strucure, setStructure] = useState();
	const [ statistics, setStatistics] = useState();
	const [ allMembersFromClub, setAllMembersFromClub] = useState();
	const [updatePlayers, setUpdatePlayers] = useState(true);

	const initFetch = useCallback(
	  () => {
		const fetchFormation = async () => {
		  const tempmember = await findMember(JSON.parse(localStorage.getItem('mern:authUser')).id);
		  setMember(tempmember);
		  sessionStorage.setItem('struct', '4-3-3');
		  const allMembers = await getMembersFromClub(tempmember._clubId, tempmember.ageCategory);
		  setStructure('4-3-3');
		  setAllMembersFromClub(allMembers);
		}
		fetchFormation();
		setUpdatePlayers(!updatePlayers);
	  },
	  [getFormationById, getStatisticsFromFormation, id],
	)
  

	useEffect(() => {
	  initFetch();
	}, [initFetch, id]);

	const timestampToDate = (date) => {
		const temp = new Date(date*1000);
		return `${temp.getDate()}/${temp.getMonth()+1}/${temp.getFullYear()}`;
	}

	
	const changeStruct = (value) => {
		if (formation) {
			formation.structure = value;
			sessionStorage.setItem('struct', value);
		}
		setUpdatePlayers(!updatePlayers);
	}

	const saveFormation = async () =>{
		let ids= [];
		const emptyMember = await getEmptyMember();
		for (let i = 0; i < 16; i++) {
			if (JSON.parse(sessionStorage.getItem('players'))[i] !== null) {
				ids[i] = JSON.parse(sessionStorage.getItem('players'))[i];
			} else {
				ids.push(emptyMember);
			}
		}

		let date = new Date(document.getElementById('formationdate').value).getTime()/1000;
		if (isNaN(date)) {
			date = new Date().getTime()/1000;
		}

		const formationCreate = {
			structure: document.getElementById('chooseStructure').value,
			ageCategory: member.ageCategory,
			_coachId: member._id,
			_playersIds: ids,
			_clubId: member._clubId,
			date: date
		}
		const formation = await createFormation(formationCreate);
		const statisticCreate = {
			score: `${document.getElementById('scorehome').value}-${document.getElementById('scoreaway').value}`,
			_formationId: formation._id
		}
		await createStatistic(statisticCreate)
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
			{allMembersFromClub && allMembersFromClub.map(member => {
				if (member.extraInfo && member.extraInfo.position ==='goalkeeper') {
				return             <div className="row memberrow" id={member._id} key={member._id}>
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
				}
			})}
            </div>
            <div className="row">
				<div className="col col-2 offset-1 playerType">
                	Defenders
				</div>
            </div>
            <div className="playerContainer" id="Defenders">
			{allMembersFromClub && allMembersFromClub.map(member => {
				if (member.extraInfo && member.extraInfo.position ==='defender') {
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
				}
			})}
            </div>
            <div className="row">
				<div className="col col-2 offset-1 playerType">
                	Midfielders
				</div>
            </div>
            <div className="playerContainer" id="Midfielders">
			{allMembersFromClub && allMembersFromClub.map(member => {
				if (member.extraInfo && member.extraInfo.position ==='midfielder') {
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
				}
			})}
            </div>
            <div className="row">
				<div className="col col-2 offset-1 playerType">
                	Attackers
				</div>
            </div>
            <div className="playerContainer" id="Attackers">
			{allMembersFromClub && allMembersFromClub.map(member => {
				if (member.extraInfo && member.extraInfo.position ==='attacker') {
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
				}
			})}
            </div>
		</div>
		<div className="detailPage" id="detailPage">
		<div className="formationdetailtitle">
			<div className="pagetitle">Formation </div>
			<div className="formationdate">
				{member
					?member.membertype[0].name==='Player'
						?<div className="formationdate">//</div>
						:<div className="formationdate"><input type="date" id="formationdate" name="formationdate" defaultValue={timestampToDate(new Date())}/></div>
						:<div className="formationdate"><input type="date" id="formationdate" name="formationdate" /></div>
					}
			</div>
		</div>
		{formation? <div><FormationStructure allMembers={allMembersFromClub?allMembersFromClub:''} edit={member?member.membertype[0].name==='Coach': false} strucure={'4-3-3'} update={updatePlayers}/>
		<Bench edit={member?member.membertype[0].name==='Coach': false} update={updatePlayers}/></div>:null}
		<FormationInfo club={member?member.club:''} edit={member?member.membertype[0].name==='Coach': false} score={'0-0'} structure={'4-3-3'} change={changeStruct}/>
		{member?member.membertype[0].name==='Coach'?<div className="basicbutton" onClick={ev => saveFormation()}>save</div>:'': ''}
		</div>
	  </main>
      <Footer/>
    </Fragment>

  );
};


export default NewFormation;