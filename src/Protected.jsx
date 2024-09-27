/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {jwtDecode} from 'jwt-decode'; // jwtDecode should not be destructured
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutSlice } from './redux/features/authSlice';

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(true); // Loading state to wait for token check
  const [diffSeconds, setDiffSeconds] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')) || false;

    if (!token) {
      navigate('/Login');
      return;
    }

    const decodedToken = jwtDecode(token);
    
    const checkTokenExpiration = () => {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const diffInSeconds = decodedToken.exp - currentTimeInSeconds;
      setDiffSeconds(diffInSeconds);

      if (diffInSeconds <= 0) {
        dispatch(logoutSlice());
        navigate('/Login');
      } else {
        setIsLoading(false); // Stop loading once token is verified
      }
    };

    // Check token immediately
    checkTokenExpiration();

    // Set an interval to check token expiration every second
    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigate, dispatch]);

  // Render a loading indicator until the token check is complete
  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner/loading indicator
  }

  // If loading is complete, render the children
  return <>{children}</>;
};

export default Protected;
