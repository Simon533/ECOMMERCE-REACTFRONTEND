import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Helper function to check if the JWT token is expired
const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    // Decode JWT payload (middle segment)
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return false;
    
    const decodedPayload = JSON.parse(atob(payloadBase64));
    
    // Check 'exp' (expiration time in seconds)
    if (decodedPayload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedPayload.exp > currentTime;
    }
    
    return true; // Fallback if no exp claim is present
  } catch (error) {
    console.error('Invalid token format:', error);
    return false;
  }
};

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');

  if (!isTokenValid(token)) {
    // Clear invalid/expired token
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}