
import React from 'react';
import type { NutritionInfo } from '../types';

interface NutritionCardProps {
  nutrition: NutritionInfo;
}

const NutritionItem: React.FC<{ label: string; value: string | number; unit: string; color: string; }> = ({ label, value, unit, color }) => (
  <div className="flex flex-col items-center text-center p-2 rounded-lg">
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xs text-gray-400">{unit}</p>
  </div>
);

const NutritionCard: React.FC<NutritionCardProps> = ({ nutrition }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 text-center mb-3">Nutritional Info</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <NutritionItem label="Calories" value={nutrition.calories} unit="kcal" color="text-orange-500" />
        <NutritionItem label="Protein" value={nutrition.protein} unit="g" color="text-red-500" />
        <NutritionItem label="Carbs" value={nutrition.carbohydrates} unit="g" color="text-blue-500" />
        <NutritionItem label="Fat" value={nutrition.fat} unit="g" color="text-yellow-500" />
      </div>
    </div>
  );
};

export default NutritionCard;
