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
    let url = `${BASE_URL}/members/update`;
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
    const member = await response.json();
    return member;
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

  const destroyJoinRequest = async (memberId) => {
    let url = `${BASE_URL}/joinRequests/delete`;
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const data = {
      memberId,
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

  const getJoinRequests= async () => {
    let url = `${BASE_URL}/joinRequests`;
    const joinRequests = await fetch(url);

    return joinRequests.json();
  }

  const getFormationsFromClubAndAge = async (clubId, age) => {
    let url = `${BASE_URL}/formations/${clubId}&${age}`;
    const joinRequests = await fetch(url);

    return joinRequests.json();
  }

  const getFormationById = async (id) => {
    let url = `${BASE_URL}/formations/${id}`;
    const joinRequests = await fetch(url);
    return joinRequests.json();
  }

  const getStatisticsFromFormation = async (id) => {
    let url = `${BASE_URL}/statisticsfromformation/${id}`;
    const stats = await fetch(url);
    return stats.json();
  }

  return (
    <ApiContext.Provider value={{ destroyJoinRequest, findClub, findClubs, getFormationById, getFormationsFromClubAndAge, getJoinRequests, getStatisticsFromFormation, findMember,makeJoinRequest, updateMember }}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
}