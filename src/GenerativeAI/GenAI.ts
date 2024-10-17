/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GENERATIVE_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAiReports = () => {};

export const GenAIRes = async ({data}:any) => {
    
  const prompt =
    "Analyze a user's financial data (income and expenses) to identify areas where expense management can be improved. Provide actionable recommendations tailored to the user's specific financial situation and goals. Consider factors such as income level, spending patterns, and industry benchmarks. The analysis should be comprehensive and insightful, highlighting potential savings opportunities and areas for increased financial efficiency.";
  const result = await model.generateContent(`${prompt}${JSON.stringify(data)}`);
  return result.response.text()
};
