import React from 'react';
import { LeafIcon } from './icons/LeafIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { ProfileIcon } from './icons/ProfileIcon';
import { MailIcon } from './icons/MailIcon';

export type View = 'analyzer' | 'resources' | 'profile' | 'contact';

interface NavLinkProps {
  label: string;
  view: View;
  activeView: View;
  onNavigate: (view: View) => void;
  icon: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ label, view, activeView, onNavigate, icon }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={() => onNavigate(view)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-brand-green text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-brand-green'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

interface HeaderProps {
  onLogout: () => void;
  onNavigate: (view: View) => void;
  activeView: View;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onNavigate, activeView }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-brand-green p-2 rounded-lg">
              <LeafIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-brand-green hidden sm:inline">AgroAI</span>
          </div>
          
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <NavLink label="Analyzer" view="analyzer" activeView={activeView} onNavigate={onNavigate} icon={<ChartBarIcon className="w-5 h-5" />} />
            <NavLink label="Resources" view="resources" activeView={activeView} onNavigate={onNavigate} icon={<BookOpenIcon className="w-5 h-5" />} />
            <NavLink label="Profile" view="profile" activeView={activeView} onNavigate={onNavigate} icon={<ProfileIcon className="w-5 h-5" />} />
            <NavLink label="Contact" view="contact" activeView={activeView} onNavigate={onNavigate} icon={<MailIcon className="w-5 h-5" />} />
          </nav>

          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-brand-green bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-light-green transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
