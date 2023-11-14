/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_KEY, token_user } from '../constant/key';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const UserContext = createContext({
  handleLogin: async () => {},
  userData: undefined,
  id: undefined,
  setUserData: () => {},
  handleLogout: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined);
  const [id, setId] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const loginToken = localStorage.getItem(token_user);
    const id = JSON.parse(localStorage.getItem(ACCOUNT_KEY));
    if (loginToken) {
      setId(id.id);
      setUserData(loginToken);
    } else {
      setId(undefined);
      setUserData(null);
    }
  }, []);

  const handleLogin = async (email, password) => {
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post('https://express-todo-api-eta.vercel.app/users/auth', user);
      if (response.status == 200) {
        localStorage.setItem(token_user, response.data.token);
        const decoded = jwtDecode(localStorage.getItem(token_user));
        localStorage.setItem(ACCOUNT_KEY, JSON.stringify(decoded));
        const id = decoded.id;
        setId(id);
        setUserData(localStorage.getItem(token_user));
        navigate('/');
      } else if (response.status == 404) {
        console.error('Email or Password is Wrong');
        navigate('/login');
      } else {
        console.error('Internal server error');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(token_user);
    localStorage.removeItem(ACCOUNT_KEY);
    setUserData(null);
    setId(undefined);
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

  return <UserContext.Provider value={{ id, handleLogin, handleLogout, userData, setUserData }}>{children}</UserContext.Provider>;
};
