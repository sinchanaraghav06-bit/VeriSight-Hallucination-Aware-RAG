
export enum AuthStatus {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  AUTHENTICATED = 'AUTHENTICATED'
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Claim {
  text: string;
  isVerified: boolean;
  sourceId?: string;
  reason?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  claims?: Claim[];
  confidence?: number;
  sources?: string[];
  timestamp: Date;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  category: 'Programming' | 'India' | 'General';
  type: string;
}

export interface RAGResponse {
  answer: string;
  claims: Claim[];
  confidence: number;
  sourceIds: string[];
}
