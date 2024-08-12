import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    username: null,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");
    if (token && username) {
      setAuth({
        isAuthenticated: true,
        username,
        token,
      });
    }
  }, []);

  const login = (username, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);
    setAuth({
      isAuthenticated: true,
      username,
      token,
    });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setAuth({
      isAuthenticated: false,
      username: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};