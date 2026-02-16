import { GoogleGenAI, Type } from "@google/genai";
import { BrainstormParams, BrainstormResult } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateGameConcept = async (params: BrainstormParams): Promise<BrainstormResult | null> => {
  const ai = getAiClient();
  if (!ai) return null;

  const prompt = `
    Create a unique game concept for "Moose Studios" based on these inputs:
    Genre: ${params.genre}
    Mood: ${params.mood}
    Key Elements: ${params.elements}

    The game should have a creative, indie-game vibe.
    Return the result strictly as a JSON object with the following schema:
    {
      "title": "Game Title",
      "tagline": "A catchy short tagline",
      "concept": "A 2-3 sentence description of the core loop and setting.",
      "mechanics": ["Mechanic 1", "Mechanic 2", "Mechanic 3"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            tagline: { type: Type.STRING },
            concept: { type: Type.STRING },
            mechanics: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "tagline", "concept", "mechanics"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as BrainstormResult;
    }
    return null;

  } catch (error) {
    console.error("Error generating game concept:", error);
    throw error;
  }
};
