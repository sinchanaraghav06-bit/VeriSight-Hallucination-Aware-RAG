
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Cell 
} from 'recharts';

const Analytics: React.FC = () => {
  const data = [
    { name: 'Python History', accuracy: 98, hallucinations: 2 },
    { name: 'India Facts', accuracy: 95, hallucinations: 5 },
    { name: 'Java Platform', accuracy: 92, hallucinations: 8 },
    { name: 'Modern India', accuracy: 88, hallucinations: 12 },
    { name: 'C Language', accuracy: 99, hallucinations: 1 },
    { name: 'JS Trends', accuracy: 85, hallucinations: 15 },
  ];

  const trendData = [
    { date: 'Mon', score: 92 },
    { date: 'Tue', score: 94 },
    { date: 'Wed', score: 91 },
    { date: 'Thu', score: 95 },
    { date: 'Fri', score: 98 },
    { date: 'Sat', score: 97 },
    { date: 'Sun', score: 99 },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Hallucination Analytics</h1>
        <p className="text-slate-400">Monitoring RAG reliability and factual precision across domains.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Avg. Accuracy', value: '94.2%', color: 'text-green-400', sub: '+1.2% from last week' },
          { label: 'Hallucination Rate', value: '5.8%', color: 'text-red-400', sub: '-0.8% from last week' },
          { label: 'Total Claims', value: '12,482', color: 'text-indigo-400', sub: 'Verified by system' },
          { label: 'Confidence Score', value: '8.9/10', color: 'text-yellow-400', sub: 'Cross-domain average' },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900 p-6 rounded-2xl border border-white/5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
            <p className="text-[10px] text-slate-500">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Domain Accuracy */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
          <h3 className="text-lg font-bold mb-6">Accuracy per Knowledge Domain</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.accuracy > 90 ? '#6366f1' : '#f43f5e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reliability Trend */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
          <h3 className="text-lg font-bold mb-6">Verification Reliability Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="score" stroke="#818cf8" strokeWidth={3} dot={{ r: 4, fill: '#818cf8' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Logs Table */}
      <div className="mt-10 bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-bold">Recent Hallucination Prevented</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase text-slate-500 tracking-widest bg-slate-800/50">
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Domain</th>
              <th className="px-6 py-4">Hallucinated Claim</th>
              <th className="px-6 py-4">Resolution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { time: '2 mins ago', domain: 'Programming', claim: 'Python was released in 1985.', res: 'Corrected to 1991' },
              { time: '15 mins ago', domain: 'India', claim: 'Mumbai is the capital of India.', res: 'Corrected to New Delhi' },
              { time: '1 hour ago', domain: 'Java', claim: 'Java is exactly like JavaScript.', res: 'Flagged as mismatch' },
            ].map((log, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-xs text-slate-400 font-medium">{log.time}</td>
                <td className="px-6 py-4 text-xs font-bold text-indigo-400">{log.domain}</td>
                <td className="px-6 py-4 text-xs text-red-400 line-clamp-1">{log.claim}</td>
                <td className="px-6 py-4 text-xs text-green-400">{log.res}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
