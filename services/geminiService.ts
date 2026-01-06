
import { GoogleGenAI } from "@google/genai";

export const optimizeText = async (type: 'objective' | 'project', content: string) => {
  // Check if process and process.env exist before accessing to prevent blank page crash
  const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';
  
  if (!apiKey) {
    console.warn("API Key not found. AI features are disabled. Please ensure API_KEY is provided in the environment.");
    return content;
  }

  // Always create a new instance right before use to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = type === 'objective' 
    ? `Rewrite the following career objective for a 2nd-year B.Tech CSE student resume. 
       Make it professional, industry-ready, and ATS-friendly. 
       Avoid clichés. Use strong professional keywords like 'problem-solving', 'scalable solutions', etc.
       Keep it strictly under 3 lines. 
       Content: "${content}"`
    : `Rewrite this project description for a CSE student resume to be highly professional and technical. 
       Use strong action verbs (e.g., 'Engineered', 'Architected', 'Optimized'). 
       Focus on technical implementation details. 
       Ensure it is ATS-optimized. 
       Content: "${content}"`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || content;
  } catch (error) {
    console.error("Gemini optimization error:", error);
    return content;
  }
};
