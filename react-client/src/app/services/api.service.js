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

/*
  const findAllPosts = async (query = null) => {
    let url = `${BASE_URL}/posts`;
    if (query !== null) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
    }
    const response = await fetch(url);
    return response.json();
  }

  const findPost = async (id) => {
    let url = `${BASE_URL}/posts/${id}`;
    const response = await fetch(url);
    return response.json();
  }

  const createPostViewModel = async (post) => {
    let url = `${BASE_URL}/posts/create`;
    const response = await fetch(url);
    return response.json();
  }

  const storePost = async (post) => {
    const options = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    };

    let url = `${BASE_URL}/posts`;
    const response = await fetch(url, options);
    return response.json();
  }

  const editPostViewModel = async (postId) => {
    const options = {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };

    let url = `${BASE_URL}/posts/${postId}/edit`;
    const response = await fetch(url, options);
    return response.json();
  }

  const updatePost = async (post) => {
    const options = {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    };

    let url = `${BASE_URL}/posts/${post._id}`;
    const response = await fetch(url, options);
    return response.json();
  }

  const deletePost = async (id, mode = 0) => {
    const options = {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(`${BASE_URL}/posts/${id}?mode=${mode}`, options);
    return await response.json();
  }
*/
  const queryParams = (options) => {
    return Object.keys(options)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(options[key])).join('&');
  }

  return (
    <ApiContext.Provider value={{ findClubs, findMember,makeJoinRequest, updateMember }}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
}