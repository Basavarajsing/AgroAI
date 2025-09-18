import React, { useState } from 'react';
import Header, { View } from './Header';
import Analyzer from './Analyzer';
import SustainablePractices from './SustainablePractices';
import Profile from './Profile';
import Contact from './Contact';
import type { User, HistoryItem } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface DashboardProps {
  onLogout: () => void;
  user: User;
  onUpdateUser: (user: Partial<User>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, user, onUpdateUser }) => {
  const [activeView, setActiveView] = useState<View>('analyzer');
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(`agroai-history-${user.email}`, []);

  const renderView = () => {
    switch (activeView) {
      case 'analyzer':
        return <Analyzer history={history} setHistory={setHistory} />;
      case 'resources':
        return <SustainablePractices />;
      case 'profile':
        return <Profile user={user} history={history} onUpdateUser={onUpdateUser} />;
      case 'contact':
        return <Contact />;
      default:
        return <Analyzer history={history} setHistory={setHistory} />;
    }
  };

  return (
    <>
      <Header onLogout={onLogout} onNavigate={setActiveView} activeView={activeView} />
      <main className="container mx-auto p-4 md:p-6">
        {renderView()}
      </main>
      <footer className="text-center py-4 text-sm text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} AgroAI. Empowering Farmers with Technology.</p>
      </footer>
    </>
  );
};

export default Dashboard;