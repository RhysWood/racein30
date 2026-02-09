'use client';
import { useState, useEffect } from 'react';

export default function SeasonProgress() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/calendar');
        const races = await res.json();
        if (!Array.isArray(races)) return;
        const now = new Date();
        const completed = races.filter(r => new Date(r.date) <= now).length;
        setStats({ completed, total: races.length });
      } catch (error) {
        console.error('Failed to fetch season stats:', error);
      }
    }
    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between text-xs text-muted mb-1">
        <span>Season Progress</span>
        <span>{stats.completed}/{stats.total} races</span>
      </div>
      <div className="w-full h-1.5 bg-card-bg rounded-full overflow-hidden border border-card-border">
        <div
          className="h-full bg-racing-red rounded-full transition-all duration-500"
          style={{ width: `${(stats.completed / stats.total) * 100}%` }}
        />
      </div>
    </div>
  );
}
