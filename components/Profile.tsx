import React, { useState, useRef } from 'react';
import type { User, HistoryItem } from '../types';

const StatCard: React.FC<{ label: string; value: string | number; icon: string }> = ({ label, value, icon }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center transition-transform transform hover:scale-105">
    <div className="text-3xl mr-4">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-brand-green">{value}</p>
    </div>
  </div>
);

interface ProfileProps {
  user: User;
  history: HistoryItem[];
  onUpdateUser: (user: Partial<User>) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, history, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onUpdateUser({ name: editedName });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user.name);
    setIsEditing(false);
  };
  
  const handleAvatarClick = () => {
      fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            onUpdateUser({ avatarUrl: reader.result as string });
        };
        reader.readAsDataURL(file);
    }
  };

  // Calculate stats from history
  const cropsAnalyzed = history.length;
  const diseasesDetected = history.filter(item => !item.isHealthy).length;
  const healthyPlantRate = cropsAnalyzed > 0 
    ? `${Math.round((history.filter(item => item.isHealthy).length / cropsAnalyzed) * 100)}%`
    : 'N/A';
  const lastAnalysis = cropsAnalyzed > 0 ? new Date(history[0].id).toLocaleDateString() : 'N/A';


  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-brand-green">My Profile</h1>
        <p className="mt-2 text-lg text-gray-600">Your farming journey at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative group">
            <img
              src={user.avatarUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
              alt="User Avatar"
              className="w-32 h-32 rounded-full mb-4 border-4 border-brand-light-green shadow-md object-cover"
            />
            <button 
                onClick={handleAvatarClick}
                className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                Change
            </button>
             <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
          </div>
          {isEditing ? (
             <input 
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-2xl font-bold text-brand-green bg-gray-100 border-2 border-brand-light-green rounded-md p-1 text-center md:text-left w-full"
             />
          ) : (
             <h2 className="text-2xl font-bold text-brand-green">{user.name}</h2>
          )}
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400 mt-1">Member since 2024</p>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl font-bold text-brand-green mb-4">Farm Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard label="Crops Analyzed" value={cropsAnalyzed} icon="🌿" />
            <StatCard label="Diseases Detected" value={diseasesDetected} icon="🐞" />
            <StatCard label="Healthy Plant Rate" value={healthyPlantRate} icon="✅" />
            <StatCard label="Last Analysis" value={lastAnalysis} icon="📅" />
          </div>
        </div>
      </div>

      <div className="mt-10 border-t pt-8">
         <h3 className="text-xl font-bold text-brand-green mb-4">Account Settings</h3>
         <div className="flex items-center space-x-4">
            {isEditing ? (
                <>
                    <button onClick={handleSave} className="w-full sm:w-auto bg-brand-green hover:bg-brand-light-green text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors">
                        Save Changes
                    </button>
                    <button onClick={handleCancel} className="w-full sm:w-auto bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded-lg border hover:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors">
                        Cancel
                    </button>
                </>
            ) : (
                <>
                     <button onClick={() => setIsEditing(true)} className="w-full sm:w-auto bg-brand-green hover:bg-brand-light-green text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors">
                        Edit Profile Name
                    </button>
                    <button className="w-full sm:w-auto bg-gray-200 text-gray-600 font-bold py-2 px-4 rounded-lg cursor-not-allowed" disabled>
                        Change Password
                    </button>
                </>
            )}
         </div>
      </div>
    </div>
  );
};

export default Profile;