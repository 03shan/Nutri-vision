import { GoogleGenAI, Type } from "@google/genai";
import type { FoodAnalysis, FitnessPlan, Recipe } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const analyzeFoodImage = async (imageFile: File): Promise<FoodAnalysis> => {
  const imagePart = await fileToGenerativePart(imageFile);
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: {
      parts: [
        { text: "Analyze this image of food. Identify the food item, its likely origin, estimated nutritional information (calories, protein, carbs, fat), and three popular or interesting facts about it. Provide the output in a structured JSON format." },
        imagePart,
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          foodName: { type: Type.STRING, description: "Name of the food item." },
          origin: { type: Type.STRING, description: "Country or region of origin." },
          nutrition: {
            type: Type.OBJECT,
            properties: {
              calories: { type: Type.NUMBER, description: "Estimated calories in kcal." },
              protein: { type: Type.STRING, description: "Estimated protein in grams." },
              carbohydrates: { type: Type.STRING, description: "Estimated carbohydrates in grams." },
              fat: { type: Type.STRING, description: "Estimated fat in grams." }
            },
            required: ["calories", "protein", "carbohydrates", "fat"]
          },
          facts: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of 3 interesting facts about the food."
          },
        },
        required: ["foodName", "origin", "nutrition", "facts"]
      },
    },
  });

  const jsonText = response.text.trim();
  try {
    return JSON.parse(jsonText) as FoodAnalysis;
  } catch (e) {
    console.error("Failed to parse Gemini JSON response:", jsonText);
    throw new Error("AI response was not in the expected format.");
  }
};

export const getFitnessPlan = async (foodName: string, calories: number): Promise<FitnessPlan> => {
    const prompt = `Based on consuming a meal of ${foodName} which has approximately ${calories} calories, create a fitness and diet plan. Suggest 3 different workout activities with duration and intensity to help burn these calories. Also, provide 3 basic diet recommendations for maintaining a balanced lifestyle. Provide the output in a structured JSON format.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    calorieBurnEstimate: { type: Type.STRING, description: "A brief statement about burning the consumed calories." },
                    workoutSuggestions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                activity: { type: Type.STRING, description: "e.g., Running, Cycling, Weightlifting" },
                                duration: { type: Type.STRING, description: "e.g., 30 minutes, 1 hour" },
                                intensity: { type: Type.STRING, description: "e.g., Moderate, Vigorous" }
                            },
                            required: ["activity", "duration", "intensity"]
                        }
                    },
                    dietRecommendations: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "An array of 3 diet tips."
                    },
                },
                required: ["calorieBurnEstimate", "workoutSuggestions", "dietRecommendations"]
            }
        }
    });

    const jsonText = response.text.trim();
    try {
        return JSON.parse(jsonText) as FitnessPlan;
    } catch (e) {
        console.error("Failed to parse Gemini JSON response:", jsonText);
        throw new Error("AI response for fitness plan was not in the expected format.");
    }
};

export const generateRecipe = async (prompt: string): Promise<Recipe> => {
    const fullPrompt = `Generate a healthy recipe based on the following user request: "${prompt}". Provide the output in a structured JSON format. Include a recipe name, a brief description, prep time, cook time, servings, a list of ingredients, a list of instructions, and optional tips.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    prepTime: { type: Type.STRING },
                    cookTime: { type: Type.STRING },
                    servings: { type: Type.STRING },
                    ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                    instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    tips: { type: Type.ARRAY, items: { type: Type.STRING }, nullable: true },
                },
                required: ["name", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions"]
            }
        }
    });

    const jsonText = response.text.trim();
    try {
        return JSON.parse(jsonText) as Recipe;
    } catch (e) {
        console.error("Failed to parse Gemini JSON response for recipe:", jsonText);
        throw new Error("AI response for recipe was not in the expected format.");
    }
};