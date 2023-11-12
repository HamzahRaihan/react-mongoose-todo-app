/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { login } from '../constant/api';
import { useNavigate } from 'react-router-dom';
import { token_user } from '../constant/key';

export const UserContext = createContext({
  handleLogin: () => {},
  userData: undefined,
  setUserData: () => {},
});

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    if (userData == undefined && userData == null) {
      navigate('/login');
    }
    if (userData !== undefined && userData !== null) {
      navigate('/');
    }
  }, [navigate, userData]);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = (email, password) => {
    const user = {
      email,
      password,
    };
    login(user);
    setUserData(localStorage.getItem(token_user));
    navigate('/');
  };
  console.log('🚀 ~ file: userContext.jsx:15 ~ UserContextProvider ~ userData:', userData);

  return <UserContext.Provider value={{ handleLogin: handleLogin, userData: userData, setUserData: setUserData }}>{children}</UserContext.Provider>;
};
