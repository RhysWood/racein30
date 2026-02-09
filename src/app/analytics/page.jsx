'use client';
import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AnalyticsDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-card-bg rounded mb-8" />
          <div className="h-[400px] bg-card-bg rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Analytics</h1>

      <div className="rounded-xl bg-card-bg border border-card-border p-6">
        <h2 className="text-lg font-semibold mb-6">Vote Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis
              dataKey="race"
              tick={{ fill: '#888', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fill: '#888' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                color: '#ededed',
              }}
            />
            <Legend wrapperStyle={{ color: '#ededed' }} />
            <Bar dataKey="votes.fullRace" fill="#e10600" name="Full Race" radius={[4, 4, 0, 0]} />
            <Bar dataKey="votes.raceIn30" fill="#3b82f6" name="Race in 30" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
