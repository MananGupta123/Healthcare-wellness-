import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute — guards pages behind authentication + optional role check.
 *
 * Usage:
 *   <Route path="/dashboard" element={<ProtectedRoute role="patient"><Dashboard /></ProtectedRoute>} />
 *   <Route path="/provider"  element={<ProtectedRoute role="provider"><ProviderDashboard /></ProtectedRoute>} />
 */
export const ProtectedRoute = ({ children, role }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-app)',
        color: 'var(--text-secondary)',
        fontSize: '16px',
      }}>
        Loading...
      </div>
    );
  }

  // Not logged in → send to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role → redirect to their correct dashboard
  if (role && currentUser.role !== role) {
    const dest = currentUser.role === 'provider' ? '/provider' : '/dashboard';
    return <Navigate to={dest} replace />;
  }

  return children;
};
