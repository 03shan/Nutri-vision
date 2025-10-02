import React, { useState, useCallback, useRef } from 'react';
import { analyzeFoodImage } from '../services/geminiService';
import type { FoodAnalysis } from '../types';
import { UploadIcon, BackIcon } from './common/Icons';
import Spinner from './common/Spinner';
import NutritionCard from './NutritionCard';

interface FoodIdentifierProps {
  onAnalysisComplete: (analysis: FoodAnalysis) => void;
  analysisResult: FoodAnalysis | null;
  onBack: () => void;
}

const FoodIdentifier: React.FC<FoodIdentifierProps> = ({ onAnalysisComplete, analysisResult, onBack }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    } else {
      setError('Please select a valid image file (JPG or PNG).');
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };
  
  const handleAnalyzeClick = useCallback(async () => {
    if (!selectedFile) {
      setError('Please select an image first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeFoodImage(selectedFile);
      onAnalysisComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, onAnalysisComplete]);

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-300">
       <button onClick={onBack} className="flex items-center text-blue-500 hover:text-blue-700 font-semibold mb-6 transition-colors">
        <BackIcon className="w-5 h-5 mr-2" />
        Back to Home
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Upload and Preview */}
        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg, image/png"
            className="hidden"
          />
          <div 
            onClick={triggerFileSelect}
            className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Selected food" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <>
                <UploadIcon className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-500 font-semibold">Click to upload an image</p>
                <p className="text-sm text-gray-400">JPG or PNG</p>
              </>
            )}
          </div>
          <button
            onClick={handleAnalyzeClick}
            disabled={!selectedFile || isLoading}
            className="mt-6 w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? <Spinner /> : 'Analyze Image'}
          </button>
          {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
        </div>

        {/* Right Side: Results */}
        <div className="flex flex-col">
          {isLoading && (
             <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Spinner />
                <p className="mt-4 text-lg font-medium animate-pulse">Analyzing your delicious meal...</p>
             </div>
          )}
          {!isLoading && analysisResult && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 capitalize">{analysisResult.foodName}</h2>
              <p className="text-gray-600"><strong className="font-semibold text-gray-700">Origin:</strong> {analysisResult.origin}</p>
              
              <NutritionCard nutrition={analysisResult.nutrition} />
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Fun Facts</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {analysisResult.facts.map((fact, index) => <li key={index}>{fact}</li>)}
                </ul>
              </div>
            </div>
          )}
          {!isLoading && !analysisResult && (
             <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg p-8">
                 <p className="text-gray-500 text-lg text-center">Upload an image and click 'Analyze' to see the magic happen!</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodIdentifier;