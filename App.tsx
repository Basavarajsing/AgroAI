import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { User } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('agroai-user', null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    // Simulate checking auth status on load
    const timer = setTimeout(() => {
      setIsAuthenticating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (email: string) => {
    const name = email.split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
    setCurrentUser({ email, name });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };
  
  const handleUpdateUser = (updatedUser: Partial<User>) => {
    setCurrentUser(prevUser => prevUser ? { ...prevUser, ...updatedUser } : null);
  };

  if (isAuthenticating) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-brand-cream">
        <div className="text-brand-green text-xl font-semibold">Loading AgroAI...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      {currentUser ? <Dashboard user={currentUser} onLogout={handleLogout} onUpdateUser={handleUpdateUser} /> : <Login onLogin={handleLogin} />}
    </div>
  );
};

export default App;