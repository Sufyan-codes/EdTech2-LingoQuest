// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { loginApi, signupApi } from "../services/authService";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user + token on refresh
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      if (token && savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Error restoring user:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));

    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    setUser(data);

    return data;
  };

  const signup = async (userData) => {
    const data = await signupApi(userData);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));

    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    setUser(data);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
