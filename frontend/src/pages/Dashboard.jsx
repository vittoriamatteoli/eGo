import { Sidebar } from "../components/Sidebar"
import { PointsCard } from "../components/PointsCard"
import { ActivityGraph } from "../components/ActivityGraph"
import { DistanceCard } from "../components/DistanceCard"
import { EnergyCard } from "../components/EnergyCard"
import { useParams } from "react-router-dom"
import { TravelForm } from "../components/TravelForm"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { AdminButton } from "../reusables/AdminButton"
import styled from "styled-components"

import jwtDecode from 'jwt-decode';

export const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    console.log('Stored token:', token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken);
        console.log('Role:', decodedToken.role);
        setIsAdmin(decodedToken.role === 'admin');
      } catch (e) {
        console.error('Invalid token', e);
      }
    }
  }, []);

  const { id } = useParams();
  return (
    <>
      <Sidebar id={id} />
      <PointsCard id={id} />
      <ActivityGraph id={id} />
      <DistanceCard id={id} />
      <EnergyCard id={id} />
      <TravelForm id={id} />
      <AdminButton isAdmin={isAdmin} />
    </>
  )
}