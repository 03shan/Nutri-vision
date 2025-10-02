
import React, { useState, useEffect, useCallback } from 'react';
import { getFitnessPlan } from '../services/geminiService';
import type { FoodAnalysis, FitnessPlan } from '../types';
import Spinner from './common/Spinner';
import { BackIcon, DumbbellIcon, PlateIcon } from './common/Icons';

interface FitnessTrackerProps {
  foodAnalysis: FoodAnalysis;
  onBack: () => void;
}

const FitnessTracker: React.FC<FitnessTrackerProps> = ({ foodAnalysis, onBack }) => {
  const [fitnessPlan, setFitnessPlan] = useState<FitnessPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFitnessPlan = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const plan = await getFitnessPlan(foodAnalysis.foodName, foodAnalysis.nutrition.calories);
      setFitnessPlan(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not fetch fitness plan.');
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodAnalysis.foodName, foodAnalysis.nutrition.calories]);

  useEffect(() => {
    fetchFitnessPlan();
  }, [fetchFitnessPlan]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg animate-fade-in">
      <button onClick={onBack} className="flex items-center text-blue-500 hover:text-blue-700 font-semibold mb-6 transition-colors">
        <BackIcon className="w-5 h-5 mr-2" />
        Back to Analyzer
      </button>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Fitness Plan</h2>
        <p className="text-gray-600 mt-1">
          Based on your meal: <span className="font-semibold text-green-600 capitalize">{foodAnalysis.foodName}</span> ({foodAnalysis.nutrition.calories} kcal)
        </p>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center h-64">
          <Spinner />
          <p className="mt-4 text-gray-500 animate-pulse">Generating your personalized plan...</p>
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!isLoading && fitnessPlan && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Workout Suggestions */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 flex items-center mb-4">
              <DumbbellIcon className="w-6 h-6 mr-3" />
              Workout Suggestions
            </h3>
            <p className="text-blue-700 text-sm mb-4">{fitnessPlan.calorieBurnEstimate}</p>
            <div className="space-y-3">
              {fitnessPlan.workoutSuggestions.map((workout, index) => (
                <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                  <p className="font-semibold text-gray-800">{workout.activity}</p>
                  <p className="text-sm text-gray-600">{workout.duration} ({workout.intensity} intensity)</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diet Recommendations */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800 flex items-center mb-4">
              <PlateIcon className="w-6 h-6 mr-3" />
              Diet Recommendations
            </h3>
            <ul className="list-disc list-inside space-y-3 text-green-700">
              {fitnessPlan.dietRecommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FitnessTracker;
