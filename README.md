
# VeriSight RAG Dashboard - Local Setup

A Hallucination-Aware Retrieval Augmented Generation dashboard.

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Gemini API Key (configured in environment)

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your API key:
   Create a `.env` file or export it:
   ```bash
   export API_KEY=your_gemini_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`.

## Features
- **RAG Assistance**: Ask about programming (Python, Java, C, JS) and general knowledge (India).
- **Hallucination Detection**: Every claim is verified against a knowledge base.
- **Document Library**: View the data sources used for retrieval.
- **Analytics**: Real-time tracking of AI accuracy.
