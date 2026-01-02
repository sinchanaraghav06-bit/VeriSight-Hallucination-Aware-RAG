
import React, { useState } from 'react';
import { MOCK_DOCUMENTS } from '../constants';

const DocumentLibrary: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Programming', 'India', 'General'];

  const filteredDocs = filter === 'All' 
    ? MOCK_DOCUMENTS 
    : MOCK_DOCUMENTS.filter(d => d.category === filter);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Knowledge Base</h1>
          <p className="text-slate-400">Indexed documents available for retrieval-augmented generation.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition text-sm font-semibold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Upload Source
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === cat 
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-slate-900 rounded-2xl border border-white/5 p-6 hover:border-indigo-500/40 transition-all group flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-slate-800 rounded-xl group-hover:bg-indigo-500/10 transition-colors">
                {doc.type === 'pdf' ? (
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                ) : (
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                )}
              </div>
              <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-400 uppercase font-bold tracking-tighter">
                {doc.id}
              </span>
            </div>
            
            <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors">{doc.title}</h3>
            <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-1">
              {doc.content}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase">
                {doc.category}
              </span>
              <button className="text-slate-500 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentLibrary;
