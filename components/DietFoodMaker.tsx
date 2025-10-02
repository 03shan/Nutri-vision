import React, { useState } from 'react';
import { generateRecipe } from '../services/geminiService';
import type { Recipe } from '../nutri-vision-app/types';
import { BackIcon, ChefHatIcon } from './common/Icons';
import Spinner from './common/Spinner';

interface DietFoodMakerProps {
  onBack: () => void;
}

const DietFoodMaker: React.FC<DietFoodMakerProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError('Please describe the recipe you want.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const result = await generateRecipe(prompt);
      setRecipe(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recipe.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg animate-fade-in">
      <button onClick={onBack} className="flex items-center text-blue-500 hover:text-blue-700 font-semibold mb-6 transition-colors">
        <BackIcon className="w-5 h-5 mr-2" />
        Back to Home
      </button>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Diet Food Maker</h2>
        <p className="text-gray-600 mt-1">Describe the kind of meal you'd like, and we'll whip up a recipe!</p>
      </div>

      <form onSubmit={handleGenerateRecipe} className="mb-8">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A low-carb, high-protein chicken breast recipe for dinner"
          className="w-full h-24 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={3}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all disabled:bg-gray-400 flex items-center justify-center"
        >
          {isLoading ? <Spinner /> : 'Generate Recipe'}
        </button>
        {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
      </form>

      {isLoading && (
        <div className="flex flex-col items-center justify-center h-64">
          <Spinner />
          <p className="mt-4 text-gray-500 animate-pulse">Creating your recipe...</p>
        </div>
      )}

      {recipe && (
        <div className="bg-gray-50 p-6 rounded-lg animate-fade-in space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
              <ChefHatIcon className="w-7 h-7 mr-3 text-yellow-600"/>
              {recipe.name}
            </h3>
            <p className="text-gray-600 mt-2">{recipe.description}</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 text-center border-t border-b py-4">
              <div><p className="font-semibold">Prep Time</p><p>{recipe.prepTime}</p></div>
              <div><p className="font-semibold">Cook Time</p><p>{recipe.cookTime}</p></div>
              <div><p className="font-semibold">Servings</p><p>{recipe.servings}</p></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Ingredients</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {recipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Instructions</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>
          </div>

          {recipe.tips && recipe.tips.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Tips</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-500 text-sm">
                {recipe.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DietFoodMaker;