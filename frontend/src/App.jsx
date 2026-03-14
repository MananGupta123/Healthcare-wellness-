import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PublicHealth } from './pages/PublicHealth';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Goals } from './pages/Goals';
import { Messages } from './pages/Messages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/public" element={<PublicHealth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Sidebar routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
