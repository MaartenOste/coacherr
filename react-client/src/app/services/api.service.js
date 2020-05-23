import { default as React, useContext, createContext } from 'react';
import { apiConfig } from '../config';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  const BASE_URL = `${apiConfig.baseURL}`;

  const findMember = async (id) => {
    let url = `${BASE_URL}/members/${id}`;
    const response = await fetch(url);
    return response.json();
  }

  const updateMember = async (data) =>{
    let url = `${BASE_URL}/members/${data._id}`;
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const options = {
      method: 'put',
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    const response = await fetch(`${url}`, options);
    return response.json();
  }

  const findClubs = async (query = null) => {
    let url = `${BASE_URL}/clubs`;
    const response = await fetch(url);
    return response.json();
  }

  const findClub = async (id) => {
    let url = `${BASE_URL}/clubs/${id}`;
    const response = await fetch(url);
    return response.json();
  }

  const updateClub = async (data) =>{
    let url = `${BASE_URL}/clubs/${data._id}`;
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const options = {
      method: 'put',
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    const response = await fetch(`${url}`, options);
    return response.json();
  }

  const makeJoinRequest = async (memberId, clubId) => {
    let url = `${BASE_URL}/joinRequests/create`;
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const data = {
      memberId,
      clubId
    }
    const options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };
    const response = await fetch(`${url}`, options);
    const joinRequests = await response.json();
    return joinRequests;
  }

  const destroyJoinRequestOfMember = async (memberId) => {
    const url = `${BASE_URL}/destroyJoinRequestsOfMember/${memberId}`;
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const options = {
      method: 'delete',
      headers: myHeaders,
    };
    const response = await fetch(`${url}`, options);
    return await response.json();
  }

  const destroyJoinRequestById = async (id) => {
    const url = `${BASE_URL}/joinRequests/${id}`;
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const options = {
      method: 'delete',
      headers: myHeaders,
    };
    const response = await fetch(`${url}`, options);
    return await response.json();
  }

  const getJoinRequestsById = async (id) => {
    let url = `${BASE_URL}/joinRequests/${id}`;
    const joinRequests = await fetch(url);

    return joinRequests.json();
  }

  const getJoinRequests= async () => {
    let url = `${BASE_URL}/joinRequests`;
    const joinRequests = await fetch(url);

    return joinRequests.json();
  }

  const getJoinRequestsForClub = async (id) => {
    let url = `${BASE_URL}/joinRequestsForClub/${id}`;
    const joinRequests = await fetch(url);
    return joinRequests.json();
  }

  const getFormationsFromClubAndAge = async (clubId, age) => {
    let url = `${BASE_URL}/formations/${clubId}&${age}`;
    const formations = await fetch(url);

    return formations.json();
  }

  const getFormationById = async (id) => {
    let url = `${BASE_URL}/formations/${id}`;
    const formation = await fetch(url);
    return formation.json();
  }
  const createFormation = async (data) => {
    let url = `${BASE_URL}/formations/create`;
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };
    const response = await fetch(`${url}`, options);
    return await response.json();
  }

  const destroyFormation = async (formationId) => {
    let url = `${BASE_URL}/formations/delete`;
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    const data = {
      formationId,
    }

    const options = {
      method: 'delete',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };
    const response = await fetch(`${url}`, options);
    const resp = await response.json();
    return resp;
  }

  const updateFormation = async (data) => {
    let url = `${BASE_URL}/formations/${data._id}`;
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const options = {
      method: 'put',
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    const response = await fetch(`${url}`, options);
    return response.json();
  }

  const createStatistic = async (data) => {
    let url = `${BASE_URL}/statistics/create`;
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };
    const response = await fetch(`${url}`, options);
    return await response.json();
  }

  const updateStatistic = async (data) => {
    let url = `${BASE_URL}/statistics/${data._id}`;
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const options = {
      method: 'put',
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    const response = await fetch(`${url}`, options);
    return response.json();
  }

  const getStatisticsFromFormation = async (id) => {
    let url = `${BASE_URL}/statisticsfromformation/${id}`;
    const stats = await fetch(url);
    return stats.json();
  }

  const getMemberTypeIdByName = async (name) => {
    let url = `${BASE_URL}/memberTypesByName/${name}`;
    const stats = await fetch(url);
    return stats.json();

  }
  const getEmptyMember = async () => {
    let url = `${BASE_URL}/emptymember`;
    const member = await fetch(url);
    return member.json();
  }

  const getMembersFromClub = async (clubId, age) => {
    let url = `${BASE_URL}/membersfromclub/${clubId}&${age}`;
    const stats = await fetch(url);
    return stats.json();
  }

  const getAllMembersFromClub = async (clubId, age = 'no', type ='no') => {
    let url;
    if (age !== 'no' && type !== 'no') {
      url = `${BASE_URL}/allmembersfromclub/${clubId}?age=${age}&type=${type}`;
    } else if (age !== 'no'){
      url = `${BASE_URL}/allmembersfromclub/${clubId}?age=${age}`;
    }else if (type !== 'no') {
      url = `${BASE_URL}/allmembersfromclub/${clubId}?type=${type}`;
    }else {
      url = `${BASE_URL}/allmembersfromclub/${clubId}`;
    }

    const stats = await fetch(url);
    return stats.json();
  }

  return (
    <ApiContext.Provider value={{ createFormation, createStatistic, destroyFormation, destroyJoinRequestById, destroyJoinRequestOfMember, findClub, findClubs, getEmptyMember, getFormationById, getFormationsFromClubAndAge, getJoinRequests, getJoinRequestsById, getJoinRequestsForClub, getMembersFromClub, getMemberTypeIdByName, getAllMembersFromClub, getStatisticsFromFormation, findMember,makeJoinRequest, updateClub, updateFormation, updateMember, updateStatistic}}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
}