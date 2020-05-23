import React, { createContext, useContext, useState } from 'react';
import * as jwt from 'jsonwebtoken';
import { apiConfig } from '../config';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {

  const verifyUserFromLocalStorage = () => {
    if (JSON.parse(localStorage.getItem('mern:authUser'))) {
      try {
        const token = JSON.parse(localStorage.getItem('mern:authUser')).token;
        if (!token) {
          throw new Error('Token is not present on localstorage!');
        }
        const decoded = jwt.verify(token, 'gdm_nmd_mobdev2');
        if (!decoded) {
          throw new Error('Couldn\'t decode the token!');
        }

        if (decoded.exp > Date.now()) {
          throw new Error('Token is expired!')
        }
        return JSON.parse(localStorage.getItem('mern:authUser'));
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  const [currentUser, setCurrentUser] = useState(verifyUserFromLocalStorage);

  const signInLocal = async (email, password, type) => {
    const url = `${apiConfig.baseURL}/auth/signin/${type}`;

    const body = {
      email,
      password
    };
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: 'follow'
    };

    const response = await fetch(`${url}`, options);
    if (response.ok) {
      const user = await response.json();
      localStorage.setItem('mern:authUser', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    }
    else {
      return response;
    }
  }

  const signupMember = async (email,firstname,lastname,phoneNumber,password,type) => {
    let url = `${apiConfig.baseURL}/auth/signup/member`;

    const body = {
      "firstname": firstname,
      "lastname": lastname,
      "email": email,
      "phoneNumber": phoneNumber,
      "password":password,
      "_memberTypeId": type,
    };

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    const options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: 'follow'
    };

    const response = await fetch(`${url}`, options);
    const member = await response.json();

    localStorage.setItem('mern:authUser', JSON.stringify(member));
    setCurrentUser(member);

    return member;
  }

  const logout = async () => {
    localStorage.setItem('mern:authUser', null);
    return true;
  }

  return (
    <AuthContext.Provider value={{ currentUser, signInLocal, signupMember, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

export {
  AuthContext,
  AuthProvider,
  useAuth,
}