import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/axiosClient';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if we have a stored token and validate it
  useEffect(() => {
    const token = localStorage.getItem('token');
    const stored = localStorage.getItem('user');

    if (token && stored) {
      try {
        setCurrentUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('user');
      }
      // Optionally verify token is still valid
      client
        .get('/auth/me')
        .then((res) => {
          const user = res.data.user;
          setCurrentUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
        .catch(() => {
          // Token invalid / expired
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setCurrentUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await client.post('/auth/login', { email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  const register = async ({ name, email, password, role }) => {
    const res = await client.post('/auth/register', {
      name,
      email,
      password,
      role,
      consentGiven: 'true',
    });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
