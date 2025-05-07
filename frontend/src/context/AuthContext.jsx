// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from "../api/axiosInstance"; // make sure axiosInstance includes token in headers
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    await fetchCurrentUser(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const fetchCurrentUser = useCallback(async (jwt = token) => {
    if (!jwt) return;
    try {
      const res = await axios.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user", err);
      logout();
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchCurrentUser(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token, fetchCurrentUser]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
