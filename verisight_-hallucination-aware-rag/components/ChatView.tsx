
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Claim } from '../types';
import { generateHallucinationAwareResponse } from '../services/geminiService';

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await generateHallucinationAwareResponse(textToSend);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.answer,
        claims: result.claims,
        confidence: result.confidence,
        sources: result.sourceIds,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto px-6">
      {/* Header */}
      <header className="py-6 border-b border-white/5 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">RAG Assistant</h1>
          <p className="text-sm text-slate-500">Hallucination-aware knowledge retrieval</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            System Active
          </span>
        </div>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-8 space-y-8 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center border border-white/5 mb-4">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h2 className="text-2xl font-bold">How can I help you today?</h2>
            <p className="text-slate-400 max-w-md">
              Ask about programming (Python, Java, JS), facts about India, or general knowledge.
              Every claim I make will be verified against my knowledge base.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mt-8">
              {[
                "Show me Hello World in Python and Java",
                "How do I calculate an average in JavaScript?",
                "Tell me about the economy of India in 2024",
                "What are the major tech hubs in India?",
                "Provide a C code snippet for calculating average",
                "Who created Python and when?"
              ].map((q) => (
                <button 
                  key={q} 
                  onClick={() => handleSend(q)}
                  className="p-4 bg-slate-900 hover:bg-slate-800 rounded-xl border border-white/5 text-left text-sm transition text-slate-300 hover:border-indigo-500/30"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3xl flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800 border border-white/10'}`}>
                {msg.role === 'user' ? 'U' : 'AI'}
              </div>
              
              <div className="space-y-3">
                <div className={`px-5 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-white/5'}`}>
                  <p className="whitespace-pre-wrap leading-relaxed font-sans">{msg.content}</p>
                </div>

                {msg.claims && (
                  <div className="bg-slate-900/50 rounded-xl border border-white/5 p-4 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Hallucination Verification Report</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400">Confidence:</span>
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${
                              (msg.confidence || 0) > 80 ? 'bg-green-500' : (msg.confidence || 0) > 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${msg.confidence || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-200">{msg.confidence}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {msg.claims.map((claim, idx) => (
                        <div key={idx} className="flex gap-3 group">
                          <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${claim.isVerified ? 'bg-green-500' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`}></div>
                          <div>
                            <p className="text-xs text-slate-300 leading-relaxed">{claim.text}</p>
                            {!claim.isVerified && (
                              <p className="text-[10px] text-red-400/80 mt-1 flex items-center gap-1 italic">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                Hallucination Alert: {claim.reason || "Unable to locate supporting evidence in indexed data."}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="pt-3 border-t border-white/5 flex gap-2 overflow-x-auto pb-1">
                        {msg.sources.map(sid => (
                          <span key={sid} className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-medium text-indigo-400 whitespace-nowrap">
                            Source: {sid}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-4">
              <div className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center bg-slate-800 border border-white/10">
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                </div>
              </div>
              <div className="px-5 py-3 rounded-2xl bg-slate-900 border border-white/5">
                <span className="text-sm text-slate-400 italic">Verifying claims against knowledge base...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="py-6 mt-auto">
        <div className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Python, Java, JS, or India..."
            className="w-full pl-6 pr-24 py-4 bg-slate-900 border border-white/10 rounded-2xl shadow-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition group-hover:border-white/20"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition shadow-lg glow"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
        <p className="mt-3 text-center text-sm text-slate-500">
          Experimental RAG Pipeline. All technical code snippets are verified against standard language specifications.
        </p>
      </div>
    </div>
  );
};

export default ChatView;
