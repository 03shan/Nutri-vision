import React, { useState } from 'react';
import type { FoodAnalysis } from './types';
import { View } from './types';
import Home from './components/Home';
import FoodIdentifier from './components/FoodIdentifier';
import FitnessTracker from './components/FitnessTracker';
import HealthTracker from './components/HealthTracker';
import DietFoodMaker from './components/DietFoodMaker';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [foodAnalysis, setFoodAnalysis] = useState<FoodAnalysis | null>(null);

  const handleAnalysisComplete = (analysis: FoodAnalysis) => {
    setFoodAnalysis(analysis);
  };

  const navigate = (view: View) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Home navigate={navigate} isFitnessGuideEnabled={!!foodAnalysis} />;
      case View.FOOD_CHECKER:
        return (
          <FoodIdentifier
            onAnalysisComplete={handleAnalysisComplete}
            analysisResult={foodAnalysis}
            onBack={() => navigate(View.HOME)}
          />
        );
      case View.FITNESS_GUIDE:
        if (foodAnalysis) {
          return <FitnessTracker foodAnalysis={foodAnalysis} onBack={() => navigate(View.HOME)} />;
        }
        // Fallback if accessed without analysis - though UI should prevent this
        setCurrentView(View.HOME);
        return null;
      case View.HEALTH_TRACKER:
        return <HealthTracker onBack={() => navigate(View.HOME)} />;
      case View.DIET_FOOD_MAKER:
        return <DietFoodMaker onBack={() => navigate(View.HOME)} />;
      default:
        return <Home navigate={navigate} isFitnessGuideEnabled={!!foodAnalysis} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight">
            <span className="text-green-500">Nutri</span> Vision
          </h1>
          <p className="mt-2 text-lg text-gray-600">Your AI-powered health and wellness assistant.</p>
        </header>
        
        <main>
          {renderView()}
        </main>
      </div>
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>2025</p>
      </footer>
    </div>
  );
};

export default App;