/* eslint-disable react/prop-types */
import React, { useState, useContext, createContext, useEffect } from 'react';
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';
import { callSignIn, callCheckAuth } from './api/api';

const authContext = createContext();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext);

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true)
  const [jwt, setJWT] = useState('');

  useEffect(() => {
    checkAuth()
}, [])

  const signin = async (access_token) => {
    callSignIn(access_token).then(res => {
      localStorage.setItem('jwt-fe', res.data.token);
      setJWT(res.data.token);
      setUser(true);
    }).catch(errors => {
      console.log(errors)
    })
  };

  const signout = () => {
    FacebookLoginClient.logout(() => {
      localStorage.removeItem('jwt-fe');
      setUser(false);
      setJWT('');
    });
  };

  const checkAuth = async () => {
    callCheckAuth().then(res => {
      setUser(true);
      setLoading(false);
    }).catch(errors => {
      setUser(false);
      setLoading(false);
    })
  };

  // Return the user object and auth methods
  return {
    user,
    loading,
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