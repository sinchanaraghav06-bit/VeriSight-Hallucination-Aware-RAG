
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import { AuthStatus, User } from './types';

const App: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.UNAUTHENTICATED);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setAuthStatus(AuthStatus.AUTHENTICATED);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setAuthStatus(AuthStatus.AUTHENTICATED);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setAuthStatus(AuthStatus.UNAUTHENTICATED);
    localStorage.removeItem('user');
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            authStatus === AuthStatus.AUTHENTICATED ? 
            <Navigate to="/dashboard" replace /> : 
            <AuthPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/dashboard/*" 
          element={
            authStatus === AuthStatus.AUTHENTICATED ? 
            <Dashboard user={user!} onLogout={handleLogout} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
