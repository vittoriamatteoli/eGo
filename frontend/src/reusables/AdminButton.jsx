// AdminButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EgoButton } from './Button';
import styled from 'styled-components';

export const AdminButton = ({ isAdmin }) => {
  const navigate = useNavigate();

  return (
    isAdmin ? (
      <EgoButton onClick={() => navigate('/admin')}>Log in to admin</EgoButton>
    ) : null
  );
};

