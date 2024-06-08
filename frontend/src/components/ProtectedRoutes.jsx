import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = import.meta.env.VITE_API_KEY;
  const API = apiKey + "/verify";

  const verifyToken = async () => {
    const token = sessionStorage.getItem('accessToken');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};