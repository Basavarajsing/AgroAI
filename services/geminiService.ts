
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const model = 'gemini-2.5-flash';

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    cropName: { type: Type.STRING, description: "The common name of the crop (e.g., 'Tomato', 'Corn'). If not a plant, state 'Not a plant'." },
    isHealthy: { type: Type.BOOLEAN, description: "True if the plant appears healthy, false otherwise." },
    diseaseName: { type: Type.STRING, description: "The common name of the disease. If healthy, state 'Healthy'." },
    confidenceScore: { type: Type.NUMBER, description: "A confidence score from 0.0 to 1.0 for the disease identification." },
    description: { type: Type.STRING, description: "A brief, one-paragraph overview of the disease." },
    symptoms: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of key visual symptoms of the disease."
    },
    managementStrategies: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The name of the management strategy." },
          description: { type: Type.STRING, description: "A detailed description of the strategy, suitable for a smallholder farmer." },
          isOrganic: { type: Type.BOOLEAN, description: "True if the strategy is organic/sustainable, false if it involves chemicals." }
        },
        required: ["title", "description", "isOrganic"]
      },
      description: "A list of sustainable and conventional management strategies."
    },
    preventiveMeasures: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of preventive measures to avoid this disease in the future."
    },
  },
  required: ["cropName", "isHealthy", "diseaseName", "confidenceScore", "description", "symptoms", "managementStrategies", "preventiveMeasures"]
};


export const analyzeCropImage = async (base64Image: string, mimeType: string): Promise<Omit<AnalysisResult, 'id' | 'imageUrl'>> => {
  try {
    const prompt = `Analyze this image of a plant leaf. You are an expert agronomist advising a smallholder farmer. Identify the crop and any diseases. Provide detailed, practical, and sustainable management and prevention strategies. Prioritize organic and low-cost solutions. If the image is not a plant, is unclear, or the plant is healthy, state that clearly in the response. Format your response according to the provided JSON schema.`;
    
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: prompt,
    };
    
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    return result as Omit<AnalysisResult, 'id' | 'imageUrl'>;

  } catch (error) {
    console.error("Error analyzing crop image:", error);
    throw new Error("Failed to analyze image. The AI model may be overloaded or the image is unsupported. Please try again.");
  }
};
