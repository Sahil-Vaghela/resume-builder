
import { GoogleGenAI } from "@google/genai";

export const optimizeText = async (type: 'objective' | 'project', content: string) => {
  // Always create a new instance right before use to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
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
