import React, { useState } from 'react';
import type { MealLog } from '../types';
import { BackIcon, PlateIcon } from './common/Icons';

interface HealthTrackerProps {
  onBack: () => void;
}

const HealthTracker: React.FC<HealthTrackerProps> = ({ onBack }) => {
  const [meals, setMeals] = useState<MealLog[]>([]);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState<number | ''>('');

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (mealName && typeof calories === 'number' && calories > 0) {
      const newMeal: MealLog = {
        id: Date.now(),
        name: mealName,
        calories: Number(calories),
      };
      setMeals([...meals, newMeal]);
      setMealName('');
      setCalories('');
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg animate-fade-in">
      <button onClick={onBack} className="flex items-center text-blue-500 hover:text-blue-700 font-semibold mb-6 transition-colors">
        <BackIcon className="w-5 h-5 mr-2" />
        Back to Home
      </button>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Health Tracker</h2>
        <p className="text-gray-600 mt-1">Log your daily meals and keep an eye on your calorie intake.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Meal Log Form */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Log a New Meal</h3>
          <form onSubmit={handleAddMeal} className="space-y-4">
            <div>
              <label htmlFor="mealName" className="block text-sm font-medium text-gray-700">Meal / Food Name</label>
              <input
                type="text"
                id="mealName"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                placeholder="e.g., Chicken Salad"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="calories" className="block text-sm font-medium text-gray-700">Calories (kcal)</label>
              <input
                type="number"
                id="calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value ? parseInt(e.target.value, 10) : '')}
                placeholder="e.g., 350"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all disabled:bg-gray-400"
            >
              Add Meal
            </button>
          </form>
        </div>

        {/* Daily Summary */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 flex items-center mb-4">
            <PlateIcon className="w-6 h-6 mr-3" />
            Today's Log
          </h3>
          <div className="bg-white p-4 rounded-md shadow-sm mb-4 text-center">
            <p className="text-gray-600">Total Calories</p>
            <p className="text-3xl font-bold text-blue-600">{totalCalories} kcal</p>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {meals.length > 0 ? (
              meals.map(meal => (
                <div key={meal.id} className="bg-white p-3 rounded-md shadow-sm flex justify-between items-center">
                  <p className="font-semibold text-gray-800 capitalize">{meal.name}</p>
                  <p className="text-sm text-gray-600 font-medium">{meal.calories} kcal</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 pt-8">No meals logged yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTracker;
