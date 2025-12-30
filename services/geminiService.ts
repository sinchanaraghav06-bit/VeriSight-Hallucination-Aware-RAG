
import { GoogleGenAI, Type } from "@google/genai";
import { RAGResponse, Claim } from "../types";
import { MOCK_DOCUMENTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateHallucinationAwareResponse = async (query: string): Promise<RAGResponse> => {
  // 1. Simulating Retrieval Logic (Mock RAG)
  // In a real app, this would be a vector search.
  const relevantDocs = MOCK_DOCUMENTS.filter(doc => 
    query.toLowerCase().includes(doc.category.toLowerCase()) || 
    query.toLowerCase().includes(doc.title.toLowerCase()) ||
    doc.content.toLowerCase().split(' ').some(word => word.length > 4 && query.toLowerCase().includes(word))
  );

  const context = relevantDocs.map(d => `[Source ${d.id}]: ${d.content}`).join('\n\n');

  // 2. Generation & Validation via Gemini
  // We use a specific schema to force verification
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      User Question: ${query}
      
      Retrieved Context:
      ${context || "No specific documents found. Use general knowledge but flag uncertainty."}
      
      Instructions:
      1. Provide a comprehensive answer based primarily on the provided context.
      2. Breakdown your answer into specific "claims".
      3. For each claim, check if it is directly supported by the context.
      4. Assign a confidence score (0-100) based on context support.
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
                sourceId: { type: Type.STRING, description: "The id from [Source id] if available" },
                reason: { type: Type.STRING, description: "Why it is verified or not" }
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
    // Map internal IDs if needed
    data.sourceIds = relevantDocs.map(d => d.id);
    return data;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return {
      answer: "I encountered an error processing the request.",
      claims: [],
      confidence: 0,
      sourceIds: []
    };
  }
};
