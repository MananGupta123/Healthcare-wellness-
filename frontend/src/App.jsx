import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PublicHealth } from './pages/PublicHealth';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Goals } from './pages/Goals';
import { Messages } from './pages/Messages';
import { ProviderDashboard } from './pages/ProviderDashboard';
import { PatientDetail } from './pages/PatientDetail';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/public" element={<PublicHealth />} />

          {/* Patient-only routes */}
          <Route path="/dashboard" element={<ProtectedRoute role="patient"><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute role="patient"><Profile /></ProtectedRoute>} />
          <Route path="/goals" element={<ProtectedRoute role="patient"><Goals /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute role="patient"><Messages /></ProtectedRoute>} />

          {/* Provider-only routes */}
          <Route path="/provider" element={<ProtectedRoute role="provider"><ProviderDashboard /></ProtectedRoute>} />
          <Route path="/provider/patient/:id" element={<ProtectedRoute role="provider"><PatientDetail /></ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
