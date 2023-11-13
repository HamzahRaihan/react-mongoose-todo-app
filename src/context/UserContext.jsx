/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_KEY, token_user } from '../constant/key';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const UserContext = createContext({
  handleLogin: async () => {},
  userData: undefined,
  setUserData: () => {},
  handleLogout: () => {},
});

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    const loginToken = localStorage.getItem(token_user);
    if (loginToken) {
      setUserData(loginToken);
    } else {
      setUserData(null);
    }
  }, []);

  const handleLogin = async (email, password) => {
    const user = {
      email: email,
      password: password,
    };
    const response = await axios.post('https://express-todo-api-eta.vercel.app/users/auth', user);
    if (response.status == 200) {
      localStorage.setItem(token_user, response.data.token);
      const decoded = jwtDecode(localStorage.getItem(token_user));
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(decoded));
      setUserData(localStorage.getItem(token_user));
      navigate('/');
    } else if (response.status == 404) {
      console.error('Email or Password is Wrong');
      navigate('/login');
    } else {
      console.error('Internal server error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(token_user);
    localStorage.removeItem(ACCOUNT_KEY);
    setUserData(null);
    navigate('/login');
  };

  useEffect(() => {
    if (userData !== undefined && userData === null) {
      navigate('/login');
    }
    if (userData !== undefined && userData !== null && window.location.href.includes('/login')) {
      navigate('/');
    }
  }, [navigate, userData]);

  return <UserContext.Provider value={{ handleLogin: handleLogin, handleLogout: handleLogout, userData: userData, setUserData: setUserData }}>{children}</UserContext.Provider>;
};
