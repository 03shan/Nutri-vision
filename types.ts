export enum View {
  HOME,
  FOOD_CHECKER,
  FITNESS_GUIDE,
  HEALTH_TRACKER,
  DIET_FOOD_MAKER,
}

export interface NutritionInfo {
  calories: number;
  protein: string;
  carbohydrates: string;
  fat: string;
}

export interface FoodAnalysis {
  foodName: string;
  origin: string;
  nutrition: NutritionInfo;
  facts: string[];
}

export interface WorkoutSuggestion {
  activity: string;
  duration: string;
  intensity: string;
}

export interface FitnessPlan {
  calorieBurnEstimate: string;
  workoutSuggestions: WorkoutSuggestion[];
  dietRecommendations: string[];
}

export interface Recipe {
    name: string;
    description: string;
    prepTime: string;
    cookTime: string;
    servings: string;
    ingredients: string[];
    instructions: string[];
    tips?: string[];
}

export interface MealLog {
    id: number;
    name: string;
    calories: number;
}