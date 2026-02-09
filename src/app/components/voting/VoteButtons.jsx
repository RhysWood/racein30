'use client';
import { useState, useEffect } from 'react';
import { hasVoted, saveVote } from '../../../utils/localStorage';
import LoadingSkeleton from '../LoadingSkeleton';

export default function VoteButtons({ raceId, onVoteComplete }) {
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const previousVote = hasVoted(raceId);
    if (previousVote) {
      setSelected(previousVote);
    }
  }, [raceId]);

  const handleVote = async (voteType) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raceId,
          voteType: voteType === 'full' ? 'fullRace' : 'raceIn30'
        }),
      });

      if (!response.ok) throw new Error('Vote failed');

      saveVote(raceId, voteType);
      setSelected(voteType);
      onVoteComplete?.(voteType);
    } catch (err) {
      setError('Failed to submit vote. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-xl font-semibold text-center text-muted">How was the race?</h2>
      <div className="flex gap-4 sm:gap-6">
        <button
          onClick={() => handleVote('full')}
          disabled={isLoading || selected}
          className={`group relative px-8 py-5 rounded-2xl text-lg font-semibold transition-all duration-200 ease-in-out
            bg-white/5 backdrop-blur-sm border hover:bg-white/10 active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
            ${selected === 'full'
              ? 'border-racing-red text-racing-red'
              : 'border-white/10 text-foreground hover:border-racing-red/50'
            }`}
        >
          <span className="block">Full Race</span>
          <span className="block text-xs text-muted font-normal mt-1">Watch it all</span>
        </button>

        <button
          onClick={() => handleVote('30')}
          disabled={isLoading || selected}
          className={`group relative px-8 py-5 rounded-2xl text-lg font-semibold transition-all duration-200 ease-in-out
            bg-white/5 backdrop-blur-sm border hover:bg-white/10 active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
            ${selected === '30'
              ? 'border-blue-500 text-blue-400'
              : 'border-white/10 text-foreground hover:border-blue-500/50'
            }`}
        >
          <span className="block">Race in 30</span>
          <span className="block text-xs text-muted font-normal mt-1">Just highlights</span>
        </button>
      </div>

      {error && (
        <p className="text-racing-red text-sm">{error}</p>
      )}

      {selected && !error && (
        <p className="text-sm text-muted">
          Thanks for voting for the <strong className="text-foreground">{selected === 'full' ? 'Full Race' : 'Race in 30'}</strong>!
        </p>
      )}
    </div>
  );
}
