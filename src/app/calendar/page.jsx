'use client';
import { useState, useEffect } from 'react';

function CountdownTimer({ race }) {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const raceDate = new Date(race.date);
      const diff = raceDate - now;
      if (diff <= 0) {
        setCountdown(null);
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [race]);

  if (!countdown) return null;

  return (
    <div className="p-6 rounded-2xl bg-card-bg border border-racing-red/30 mb-8">
      <p className="text-sm text-muted mb-1">Up Next</p>
      <p className="text-xl font-bold mb-4">
        {race.race}
        {race.sprint && (
          <span className="ml-2 px-2 py-0.5 text-[10px] font-bold uppercase bg-racing-red/20 text-racing-red rounded-full align-middle">
            Sprint
          </span>
        )}
      </p>
      <div className="flex justify-center gap-4">
        {[
          { value: countdown.days, label: 'Days' },
          { value: countdown.hours, label: 'Hrs' },
          { value: countdown.minutes, label: 'Min' },
          { value: countdown.seconds, label: 'Sec' },
        ].map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-racing-red">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-xs text-muted uppercase tracking-wide">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCalendar() {
      try {
        const res = await fetch('/api/calendar');
        const data = await res.json();
        if (Array.isArray(data)) setRaces(data);
      } catch (error) {
        console.error('Failed to fetch calendar:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCalendar();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto py-8">
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-16 bg-card-bg rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const now = new Date();
  const pastRaces = races.filter(r => new Date(r.date) <= now);
  const futureRaces = races.filter(r => new Date(r.date) > now);
  const nextRace = futureRaces[0];

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">2026 Season</h1>
      <p className="text-muted text-sm mb-6">
        {pastRaces.length} of {races.length} races completed
      </p>

      <div className="w-full h-2 bg-card-bg rounded-full mb-8 overflow-hidden border border-card-border">
        <div
          className="h-full bg-racing-red rounded-full transition-all duration-500"
          style={{ width: `${races.length ? (pastRaces.length / races.length) * 100 : 0}%` }}
        />
      </div>

      {nextRace && <CountdownTimer race={nextRace} />}

      <div className="space-y-2">
        {races.map((race, index) => {
          const isPast = new Date(race.date) <= now;
          const isNext = nextRace && race._id === nextRace._id;
          const totalVotes = race.votes.fullRace + race.votes.raceIn30;

          return (
            <div
              key={race._id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                isNext
                  ? 'border-racing-red bg-racing-red/5'
                  : isPast
                  ? 'border-card-border bg-card-bg/50 opacity-60'
                  : 'border-card-border bg-card-bg'
              }`}
            >
              <span className="text-sm font-mono text-muted w-8 shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">{race.race}</span>
                  {race.sprint && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-racing-red/20 text-racing-red rounded-full">
                      Sprint
                    </span>
                  )}
                  {isNext && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-green-500/20 text-green-400 rounded-full">
                      Next
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted">
                  {new Date(race.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              {isPast && totalVotes > 0 && (
                <span className="text-xs text-muted shrink-0">
                  {totalVotes} votes
                </span>
              )}
              {isPast && (
                <span className="text-muted shrink-0">&#10003;</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
