import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    username: null,
    token: null,
    userId: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    if (token && username && userId) {
      setAuth({
        isAuthenticated: true,
        username,
        token,
        userId,
      });
    }
  }, []);

  const login = (username, token, userId) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
    setAuth({
      isAuthenticated: true,
      username,
      token,
      userId,
    });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setAuth({
      isAuthenticated: false,
      username: null,
      token: null,
      userId: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
