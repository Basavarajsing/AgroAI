
import React from 'react';
import type { HistoryItem } from '../types';
import { HealthyIcon } from './icons/HealthyIcon';
import { WarningIcon } from './icons/WarningIcon';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelectHistory, onClearHistory }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-brand-green">Analysis History</h3>
        {history.length > 0 && (
          <button onClick={onClearHistory} className="text-sm text-gray-500 hover:text-red-600 transition-colors">
            Clear
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No analyses yet. Upload an image to get started.</p>
      ) : (
        <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {history.map(item => (
            <li key={item.id}>
              <button 
                onClick={() => onSelectHistory(item)} 
                className="w-full flex items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 border border-gray-200 hover:border-brand-light-green transition-all duration-200 text-left"
              >
                <img src={item.imageUrl} alt={item.cropName} className="w-12 h-12 rounded-md object-cover mr-4" />
                <div className="flex-grow">
                  <p className="font-semibold text-brand-green">{item.cropName}</p>
                  <p className={`text-sm ${item.isHealthy ? 'text-brand-light-green' : 'text-red-600'}`}>
                    {item.diseaseName}
                  </p>
                </div>
                {item.isHealthy ? <HealthyIcon className="w-5 h-5 text-brand-light-green ml-2"/> : <WarningIcon className="w-5 h-5 text-red-500 ml-2"/>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPanel;
