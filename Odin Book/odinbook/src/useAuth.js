/* eslint-disable react/prop-types */
import React, { useState, useContext, createContext } from 'react';
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';

const axios = require('axios').default;

const authContext = createContext();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext);

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(false);
  const [jwt, setJWT] = useState('');

  const signin = async (access_token) => {
    try {
      const responseData = await axios.post(`http://localhost:5000/auth/facebook?access_token=${access_token}`);
      localStorage.setItem('jwt-fe', responseData.data.token);
      setJWT(responseData.data.token);
      setUser(true);
      return true
    } catch (error) {
      return error;
    }
  };

  const signout = () => {
    FacebookLoginClient.logout(() => {
      setUser(false);
      setJWT('');
      localStorage.removeItem('jwt-fe');
    });
  };

  const checkAuth = async () => {
    try {
      await axios.get('http://localhost:5000/user/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt-fe')}`,
        },
      });

      setUser(true);
    } catch (error) {
      setUser(false);
    }
  };

  // Return the user object and auth methods
  return {
    user,
    jwt,
    signin,
    signout,
    checkAuth,
  };
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}