import React, { useState, useCallback } from 'react';
import type { HistoryItem, AnalysisResult } from '../types';
import { analyzeCropImage } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import AnalysisResultDisplay from './AnalysisResultDisplay';
import HistoryPanel from './HistoryPanel';
import WeatherWidget from './WeatherWidget';
import LoadingSpinner from './LoadingSpinner';
import WelcomeDashboard from './WelcomeDashboard';

interface AnalyzerProps {
    history: HistoryItem[];
    setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
}

const Analyzer: React.FC<AnalyzerProps> = ({ history, setHistory }) => {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageAnalysis = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setCurrentAnalysis(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64String = (reader.result as string).split(',')[1];
        const imageDataUrl = reader.result as string;

        try {
          const analysisData = await analyzeCropImage(base64String, file.type);
          const newAnalysis: AnalysisResult = {
            ...analysisData,
            id: new Date().toISOString(),
            imageUrl: imageDataUrl,
          };

          setCurrentAnalysis(newAnalysis);
          setHistory(prevHistory => [newAnalysis, ...prevHistory].slice(0, 10)); // Keep last 10
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("An unknown error occurred during analysis.");
            }
        } finally {
            setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read the image file.');
        setIsLoading(false);
      };
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unexpected error occurred.');
        }
        setIsLoading(false);
    }
  }, [setHistory]);

  const handleSelectHistory = (item: HistoryItem) => {
    setCurrentAnalysis(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Main Content Column */}
      <div className="lg:col-span-2 space-y-6">
        {!currentAnalysis && !isLoading && !error && (
            <WelcomeDashboard onImageSelect={handleImageAnalysis} disabled={isLoading} />
        )}

        {isLoading && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-200 flex flex-col items-center justify-center min-h-[300px]">
            <LoadingSpinner />
            <p className="text-brand-green font-semibold mt-4">Analyzing your crop... this may take a moment.</p>
            <p className="text-gray-500 text-sm mt-2">Our AI is hard at work. Please don't close this window.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-bold text-red-700 mb-2">Analysis Failed</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <ImageUploader onImageSelect={handleImageAnalysis} disabled={isLoading} />
          </div>
        )}
        
        {currentAnalysis && (
          <div className="space-y-6">
            <AnalysisResultDisplay result={currentAnalysis} />
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-brand-green mb-4">Analyze Another Crop</h3>
                <ImageUploader onImageSelect={handleImageAnalysis} disabled={isLoading} />
            </div>
          </div>
        )}
      </div>
      
      {/* Sidebar Column */}
      <div className="space-y-6">
        <WeatherWidget />
        <HistoryPanel 
          history={history} 
          onSelectHistory={handleSelectHistory}
          onClearHistory={handleClearHistory}
        />
      </div>
    </div>
  );
};

export default Analyzer;