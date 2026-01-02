
import { GoogleGenAI, Type } from "@google/genai";
import { RAGResponse, Claim } from "../types";
import { MOCK_DOCUMENTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateHallucinationAwareResponse = async (query: string): Promise<RAGResponse> => {
  // 1. Simulating Retrieval Logic (Mock RAG)
  const relevantDocs = MOCK_DOCUMENTS.filter(doc => 
    query.toLowerCase().includes(doc.category.toLowerCase()) || 
    query.toLowerCase().includes(doc.title.toLowerCase()) ||
    query.toLowerCase().split(' ').some(word => word.length > 3 && doc.content.toLowerCase().includes(word))
  );

  const context = relevantDocs.map(d => `[Source ${d.id}]: ${d.content}`).join('\n\n');

  // 2. Generation & Validation via Gemini
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      User Question: ${query}
      
      Retrieved Context Data:
      ${context || "No internal documents found. Rely on general knowledge but mark claims as 'Not verified against local database'."}
      
      Instructions:
      1. Role: You are VeriSight AI, a hallucination-aware informant.
      2. Programming Tasks: If the user asks for code (Hello World, averages, etc.) in Python, Java, JS, or C, provide clean, standard snippets.
      3. Information Tasks: If the user asks for information about India or general knowledge, be factual, objective, and detailed.
      4. Verification: Breakdown your response into atomic "claims".
      5. Cross-Check: For each claim, check if it matches the 'Retrieved Context Data' provided above.
      6. Confidence: Set a confidence score based on how much of your answer is supported by the context.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          answer: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          claims: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                isVerified: { type: Type.BOOLEAN },
                sourceId: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["text", "isVerified"]
            }
          }
        },
        required: ["answer", "claims", "confidence"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || '{}') as RAGResponse;
    data.sourceIds = relevantDocs.map(d => d.id);
    return data;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return {
      answer: "I encountered an error processing the information request.",
      claims: [],
      confidence: 0,
      sourceIds: []
    };
  }
};
