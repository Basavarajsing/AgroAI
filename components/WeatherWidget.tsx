
import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { ThermometerIcon } from './icons/ThermometerIcon';
import { WaterIcon } from './icons/WaterIcon';

const WeatherWidget: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-brand-green mb-4">Local Weather</h3>
      <div className="flex items-center justify-between bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-lg mb-4">
        <div>
          <p className="text-lg font-semibold">Sunny Valley</p>
          <p className="text-4xl font-bold">28°C</p>
          <p>Clear Skies</p>
        </div>
        <SunIcon className="w-16 h-16 text-yellow-300" />
      </div>
      <div className="space-y-3 text-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ThermometerIcon className="w-5 h-5 text-gray-500 mr-2" />
            <span>Feels Like</span>
          </div>
          <span className="font-semibold">30°C</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <WaterIcon className="w-5 h-5 text-gray-500 mr-2" />
            <span>Humidity</span>
          </div>
          <span className="font-semibold">65%</span>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center">Weather data is for demonstration purposes only.</p>
    </div>
  );
};

export default WeatherWidget;
