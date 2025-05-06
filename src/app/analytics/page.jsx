'use client';
import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
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

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Race Vote Analytics</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Vote Distribution</h2>
        <BarChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="race" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="votes.fullRace" fill="#ef4444" name="Full Race" />
          <Bar dataKey="votes.raceIn30" fill="#1f2937" name="Race in 30" />
        </BarChart>
      </div>
    </div>
  );
}
