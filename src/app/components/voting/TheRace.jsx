'use client';
import React, { useEffect, useState } from 'react';
import VoteButtons from './VoteButtons';
import VotingStats from './VotingStats';
import LoadingSkeleton from '../LoadingSkeleton';

const TheRace = () => {
  const [currentRace, setCurrentRace] = useState(null);
  const [nextRace, setNextRace] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getCurrentRace = async () => {
      try {
        const response = await fetch('/api/current-race');
        const data = await response.json();
        setCurrentRace(data.currentRace);
        setNextRace(data.nextRace);
      } catch (error) {
        console.error('Error fetching current race:', error);
      } finally {
        setLoaded(true);
      }
    };

    getCurrentRace();
  }, []);

  useEffect(() => {
    if (!nextRace) return;
    const tick = () => {
      const now = new Date();
      const raceDate = new Date(nextRace.date);
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
  }, [nextRace]);

  const handleVoteComplete = (voteType) => {
    setCurrentRace((prev) => ({
      ...prev,
      votes: {
        ...prev.votes,
        [voteType === 'full' ? 'fullRace' : 'raceIn30']:
          prev.votes[voteType === 'full' ? 'fullRace' : 'raceIn30'] + 1,
      },
    }));
  };

  if (!loaded) return <LoadingSkeleton />;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  };

  // Pre-season: no current race yet, show countdown to first race
  if (!currentRace && nextRace) {
    return (
      <div className="w-full flex flex-col items-center text-center">
        <p className="text-sm text-muted mb-2">Season starts with</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          {nextRace.race}
        </h1>
        <p className="text-sm text-muted mt-2">
          {formatDate(nextRace.date)}
        </p>

        {countdown && (
          <div className="mt-8 p-6 rounded-2xl bg-card-bg border border-card-border w-full max-w-md">
            <div className="flex justify-center gap-4">
              {[
                { value: countdown.days, label: 'Days' },
                { value: countdown.hours, label: 'Hrs' },
                { value: countdown.minutes, label: 'Min' },
                { value: countdown.seconds, label: 'Sec' },
              ].map((unit) => (
                <div key={unit.label} className="flex flex-col items-center">
                  <span className="text-3xl font-bold font-mono text-racing-red">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-muted uppercase tracking-wide">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!currentRace) {
    return (
      <div className="w-full text-center">
        <p className="text-muted">No race data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center text-center">
      {currentRace.sprint && (
        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-racing-red/20 text-racing-red rounded-full mb-3">
          Sprint Weekend
        </span>
      )}

      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        {currentRace.race}
      </h1>
      <p className="text-sm text-muted mt-2">
        {formatDate(currentRace.date)}
      </p>

      <div className="mt-6 mb-6 w-full flex justify-center">
        <VotingStats votes={currentRace.votes} />
      </div>

      <VoteButtons raceId={currentRace._id} onVoteComplete={handleVoteComplete} />

      {countdown && nextRace && (
        <div className="mt-10 p-6 rounded-2xl bg-card-bg border border-card-border w-full max-w-md">
          <p className="text-sm text-muted mb-3">Next Race: {nextRace.race}</p>
          <div className="flex justify-center gap-4">
            {[
              { value: countdown.days, label: 'Days' },
              { value: countdown.hours, label: 'Hrs' },
              { value: countdown.minutes, label: 'Min' },
              { value: countdown.seconds, label: 'Sec' },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <span className="text-3xl font-bold font-mono text-racing-red">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-xs text-muted uppercase tracking-wide">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TheRace;
