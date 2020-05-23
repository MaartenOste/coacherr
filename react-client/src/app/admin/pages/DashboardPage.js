import { default as React, Fragment, useCallback, useEffect, useState} from 'react';
import { Card,Footer, Header, Navbar } from '../../components';
import { useHistory } from 'react-router';
import * as Routes from '../../routes';
import { useApi, useAuth } from '../../services';
import '../components/dashboard/dashboard.scss';

const DashBoardPage = ({ children }) => {
  const history = useHistory();
  const { destroyJoinRequestById, findMember, getAllMembersFromClub, getMemberTypeIdByName, getJoinRequestsById, getJoinRequestsForClub, updateMember} = useApi();
  const [members, setMembers] = useState();
  const { logout } = useAuth();

  const [joinRequests, setJoinRequests] = useState();
  const [ageCategories, setAgeCategories] = useState(['U7','U9','U11','U13','U15','U17','U19','U21','Second-Team','First-Team']);

  const initFetch = useCallback(
		() => {
		  const fetchdata = async () => {
			const allMembers = await getAllMembersFromClub(JSON.parse(localStorage.getItem('mern:authUser')).id);
      setMembers(allMembers);
      const allRequests = await getJoinRequestsForClub(JSON.parse(localStorage.getItem('mern:authUser')).id);
      setJoinRequests(allRequests);
		  }
		  fetchdata();
		},
		[getAllMembersFromClub],
	)

	useEffect(() => {
		initFetch();
  }, [initFetch]);
  
  const handleConfirmMember = (id) => {
		document.getElementById(`confirm${id}`).style.display= 'block';
		document.getElementById(id).style.display= 'none';
  }
  
  const handleConfirmRequest = (id) => {
		document.getElementById(`confirm${id}`).style.display= 'block';
		document.getElementById(id).style.display= 'none';
	}

	const undoConfirm = (id) => {
		document.getElementById(`confirm${id}`).style.display= 'none';
		document.getElementById(id).style.display= 'flex';
	}

  const showFilters =() =>{
    document.getElementById('filtercontainer').style.display = 'block';
    document.getElementById('showfilters').style.display = 'none';
  }

  const hideFilters =() =>{
    document.getElementById('filtercontainer').style.display = 'none';
    document.getElementById('showfilters').style.display = 'block';
  }

  const editMember = async (id) => {
		history.push(`${Routes.EDIT_MEMBER.replace(':id', id)}`);
  }

	const handleDeleteMember = async (id) => {
    const member  = await findMember(id);
    const data = {
      _id: id,
      firstname: member.firstname,
      lastname: member.lastname,
      email: member.email,
      ageCategory: member.ageCategory,
      phoneNumber: member.phoneNumber,
      extraInfo: member.extraInfo,
      localProvider: member.localProvider,
      facebookProvider: member.facebookProvider,
      _clubId: null,
      _memberTypeId: member._memberTypeId,
    }
		await updateMember(data);
		window.location.reload();
  }

	const handleDeleteRequest = async (id) => {
		await destroyJoinRequestById(id);
		window.location.reload();
  }

  const applyFilters = async () => {
    const age = document.getElementById('chooseAge').value;
    const type = await getMemberTypeIdByName(document.getElementById('chooseType').value);
    let tempmembers; 
    if (type[0]) {
      tempmembers = await getAllMembersFromClub(JSON.parse(localStorage.getItem('mern:authUser')).id, age, type[0]._id);
    } else {
      tempmembers = await getAllMembersFromClub(JSON.parse(localStorage.getItem('mern:authUser')).id, age);
    }
    setMembers(tempmembers);
  }

  const handleAcceptRequest = async (id) => {
    const joinRequest  = await getJoinRequestsById(id);
    const member  = await findMember(joinRequest._memberId);
    const data = {
      _id: member._id,
      firstname: member.firstname,
      lastname: member.lastname,
      email: member.email,
      ageCategory: member.ageCategory,
      phoneNumber: member.phoneNumber,
      extraInfo: member.extraInfo,
      localProvider: member.localProvider,
      facebookProvider: member.facebookProvider,
      _clubId: JSON.parse(localStorage.getItem('mern:authUser')).id,
      _memberTypeId: member._memberTypeId,
    }
    await updateMember(data);
    await handleDeleteRequest(id);
  }

  const handleShowMember = () => {
    document.getElementById('memberchoise').className = "dashboardoption selectedoption";
    document.getElementById('requestchoise').className = "dashboardoption";
    document.getElementById('membercards').style.display = "block";
    document.getElementById('requestcards').style.display = "none";
    document.getElementById('showfilters').style.display = "block";

  }
  const handleShowRequest = () => {
    document.getElementById('requestchoise').className = "dashboardoption selectedoption";
    document.getElementById('memberchoise').className = "dashboardoption";
    document.getElementById('requestcards').style.display = "block";
    document.getElementById('membercards').style.display = "none";
    document.getElementById('showfilters').style.display = "none";
    document.getElementById('filtercontainer').style.display = "none";
  }

  
	const handleLogout = async () => {
		logout();
		history.push(Routes.LANDING);
	}
	const handleSettings = () => {
		history.push(Routes.CLUB_SETTINGS);
	}

  return (
    <Fragment >
      <div className="page">
      <Header clubHeader={true}/>
        <div className="navigation">
        <div className="leftcomponent">
        </div>
        <div className="rightcomponent">
          <i className="fas fa-user-cog" onClick={ev => handleSettings()}></i>
          <div className="logoutbutton" onClick={ev => handleLogout()}>log out</div>
        </div>
        </div>
        <div className="formationdetailtitle">
          <div className="pagetitle">Dashboard</div>
        </div>
        <div className="dashboardoptionlist">
          <div className="dashboardoption selectedoption" id="memberchoise" onClick={ev => handleShowMember()}>Members </div>
          <div className="dashboardoption" id="requestchoise" onClick={ev => handleShowRequest()}>Requests</div>
        </div>
        <div className="showfilters" id="showfilters" onClick={ev => showFilters()}>
          show filters
        </div>
        <div className="filtercontainer" id="filtercontainer" style={{display:'none'}}>
          <div className="selectors" >
            <div className="filter">
              <div>Type</div>
                <select className="dropdownlist" id="chooseType" defaultValue={'no'}>
                  <option value={'no'} >no filter</option>
                  <option value={'Player'} key={'Player'}>Player</option>
                  <option value={'Coach'} key={'Coach'}>Coach</option>
              </select>
            </div>
            <div className="filter">
              <div>Age category</div>
                <select className="dropdownlist" id="chooseAge" defaultValue={'no'}>
                <option value={'no'} >no filter</option>
                  {ageCategories && ageCategories.map(age => {
                    return <option value={age} key={age}>{age}</option>
                  })}
              </select>
            </div>
            <i className="fas fa-times" onClick={ev => hideFilters()}></i>
          </div>
          <div className="basicbutton" onClick={ev=> applyFilters()}>apply filters</div>
        </div>
        <div className="dashboardcontentcontainer">
          <div className="membercards" id="membercards">
            {members && members.map(member => {
              return <div className="cardcontainer" key={member._id} >
                <div className="confirm" id={`confirm${member._id}`} style={{display: 'none'}}>Are you sure you want to remove this member from your club?<div className="choise"><div className="yes" onClick={ev => handleDeleteMember(member._id)}>YES</div><div className="no" onClick={ev => undoConfirm(member._id)}>NO</div></div></div>
                <div className="cardtext" id={member._id}><div className='leftcomponent' ><div>{member.firstname} {member.lastname}</div><div>{member.membertype[0]?member.membertype[0].name:''}</div><div>{member.ageCategory}</div></div><div className='rightcomponent'><div className="fas fa-pencil-alt" onClick={ev => editMember(member._id)}></div><div className="fas fa-trash" onClick={ev => handleConfirmMember(member._id)}></div></div></div>
              </div>
            })}
          </div>
          <div className="requestcards" id="requestcards" style={{display: 'none'}}>
            {joinRequests && joinRequests.map(joinRequest => {
              if (joinRequest.member.firstname !== 'a') {
                return <div className="cardcontainer" key={joinRequest._id} >
                <div className="confirm" id={`confirm${joinRequest._id}`} style={{display: 'none'}}>Are you sure you want to remove this request?<div className="choise"><div className="yes" onClick={ev => handleDeleteRequest(joinRequest._id)}>YES</div><div className="no" onClick={ev => undoConfirm(joinRequest._id)}>NO</div></div></div>
                <div className="cardtext" id={joinRequest._id}><div className='leftcomponent' ><div>{joinRequest.member.firstname} {joinRequest.member.lastname}</div><div>{joinRequest._memberId._memberTypeId?joinRequest._memberId._memberTypeId.name:''}</div><div>{joinRequest.member.ageCategory}</div></div><div className='rightcomponent'><div className="fas fa-check" onClick={ev => handleAcceptRequest(joinRequest._id)}></div><div className="fas fa-times" onClick={ev => handleConfirmRequest(joinRequest._id)}></div></div></div>
              </div>
              }
            })}
          </div>
          <div className="joinrequestcards"></div>
        </div>
      <Footer clubFooter={true}/>
      </div>
    </Fragment>
  )
};
export default DashBoardPage;