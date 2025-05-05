import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });

  const login = (username, password) => {
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true');
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};