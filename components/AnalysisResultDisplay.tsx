
import React from 'react';
import type { AnalysisResult, ManagementStrategy } from '../types';
import { HealthyIcon } from './icons/HealthyIcon';
import { WarningIcon } from './icons/WarningIcon';
import { OrganicIcon } from './icons/OrganicIcon';
import { ChemicalIcon } from './icons/ChemicalIcon';

interface AnalysisResultDisplayProps {
  result: AnalysisResult;
}

const ConfidenceBar: React.FC<{ score: number }> = ({ score }) => {
    const percentage = Math.round(score * 100);
    let barColor = 'bg-red-500';
    if (percentage > 50) barColor = 'bg-yellow-500';
    if (percentage > 80) barColor = 'bg-green-500';

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`${barColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
    );
};


const StrategyCard: React.FC<{ strategy: ManagementStrategy }> = ({ strategy }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center mb-2">
            {strategy.isOrganic ? <OrganicIcon className="w-6 h-6 text-brand-light-green mr-3" /> : <ChemicalIcon className="w-6 h-6 text-brand-brown mr-3" />}
            <h4 className="font-bold text-lg text-brand-green">{strategy.title}</h4>
        </div>
        <p className="text-gray-700">{strategy.description}</p>
    </div>
);


const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6">
            <img src={result.imageUrl} alt="Analyzed crop" className="rounded-lg w-full object-cover aspect-square" />
        </div>
        <div className="p-6">
            <div className="flex items-center mb-4">
                {result.isHealthy ? <HealthyIcon className="w-8 h-8 text-brand-light-green mr-3"/> : <WarningIcon className="w-8 h-8 text-red-500 mr-3"/>}
                <div>
                    <p className="text-sm text-gray-500">{result.cropName}</p>
                    <h2 className="text-3xl font-bold text-brand-green">{result.diseaseName}</h2>
                </div>
            </div>
            
            {!result.isHealthy && (
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Confidence Score: {Math.round(result.confidenceScore * 100)}%</label>
                    <ConfidenceBar score={result.confidenceScore} />
                </div>
            )}
            
            <p className="text-gray-700 mb-6">{result.description}</p>
        </div>
      </div>
      
      <div className="p-6 border-t border-gray-200 space-y-6 bg-gray-50/50">
        {!result.isHealthy && (
            <div>
                <h3 className="text-xl font-bold text-brand-green mb-4">Symptoms</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {result.symptoms.map((symptom, index) => <li key={index}>{symptom}</li>)}
                </ul>
            </div>
        )}

        <div>
            <h3 className="text-xl font-bold text-brand-green mb-4">Management Strategies</h3>
            <div className="space-y-4">
                {result.managementStrategies.map((strategy, index) => <StrategyCard key={index} strategy={strategy}/>)}
            </div>
        </div>

        <div>
            <h3 className="text-xl font-bold text-brand-green mb-4">Preventive Measures</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
                {result.preventiveMeasures.map((measure, index) => <li key={index}>{measure}</li>)}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultDisplay;
