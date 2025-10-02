import React from 'react';
import { View } from '../types';
import { FoodCheckIcon, DumbbellIcon, HealthTrackerIcon, ChefHatIcon } from './common/Icons';

interface HomeProps {
  navigate: (view: View) => void;
  isFitnessGuideEnabled: boolean;
}

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}> = ({ title, description, icon, onClick, disabled }) => (
  <div
    onClick={!disabled ? onClick : undefined}
    className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      disabled
        ? 'opacity-50 cursor-not-allowed bg-gray-100'
        : 'cursor-pointer'
    }`}
  >
    <div className="flex items-start">
      <div className="bg-green-100 p-3 rounded-lg mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
    {disabled && <p className="text-xs text-gray-500 mt-2">Analyze a food item first to enable this feature.</p>}
  </div>
);


const Home: React.FC<HomeProps> = ({ navigate, isFitnessGuideEnabled }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FeatureCard
        title="Food Check"
        description="Analyze food from an image to see its nutritional details."
        icon={<FoodCheckIcon className="w-8 h-8 text-green-600" />}
        onClick={() => navigate(View.FOOD_CHECKER)}
      />
      <FeatureCard
        title="Fitness Guide"
        description="Get a personalized fitness plan based on your meal."
        icon={<DumbbellIcon className="w-8 h-8 text-blue-600" />}
        onClick={() => navigate(View.FITNESS_GUIDE)}
        disabled={!isFitnessGuideEnabled}
      />
      <FeatureCard
        title="Health Tracker"
        description="Log your meals and track your daily calorie intake."
        icon={<HealthTrackerIcon className="w-8 h-8 text-red-600" />}
        onClick={() => navigate(View.HEALTH_TRACKER)}
      />
      <FeatureCard
        title="Diet Food Maker"
        description="Generate healthy recipes based on your preferences."
        icon={<ChefHatIcon className="w-8 h-8 text-yellow-600" />}
        onClick={() => navigate(View.DIET_FOOD_MAKER)}
      />
    </div>
  );
};

export default Home;
