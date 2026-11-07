import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_BASE = import.meta.env.VITE_API_URL || 'https://am-engineering-server.onrender.com';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // App load pe token check

  // App start pe localStorage se token check karke auto-login
  useEffect(() => {
    const token = localStorage.getItem('am_token');
    if (token) {
      axios.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          setUser({ ...res.data.user, token });
        })
        .catch(() => {
          // Token invalid ya expire — clear karo
          localStorage.removeItem('am_token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login: token save + user set
  const login = useCallback((token, userData) => {
    localStorage.setItem('am_token', token);
    setUser({ ...userData, token });
  }, []);

  // Logout: sab clear
  const logout = useCallback(() => {
    localStorage.removeItem('am_token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
