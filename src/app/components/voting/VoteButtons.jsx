'use client';
import { useState, useEffect } from 'react';
import { hasVoted, saveVote } from '../../../utils/localStorage';
import LoadingSkeleton from '../LoadingSkeleton';

export default function VoteButtons({ raceId, onVoteComplete }) {
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user has already voted and get their vote type
    const previousVote = hasVoted(raceId);
    if (previousVote) {
      setSelected(previousVote); // Will be either 'full' or '30'
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
      onVoteComplete?.();
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
      <h2 className="text-2xl font-bold text-center">How was the race?</h2>
      <div className="flex gap-6">
        {/* Race in 30 Button */}
        <div className="relative group">
          <button
            onClick={() => handleVote('30')}
            disabled={isLoading || selected}
            className={`px-6 py-4 rounded-2xl text-white text-lg font-semibold transition-all duration-200 ease-in-out
              bg-gray-800 hover:bg-gray-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
              ${selected === '30' ? 'ring-4 ring-blue-400' : ''}`}
          >
            Race in 30
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            😴
          </span>
        </div>

        {/* Full Race Replay Button */}
        <div className="relative group">
          <button
            onClick={() => handleVote('full')}
            disabled={isLoading || selected}
            className={`px-6 py-4 rounded-2xl text-white text-lg font-semibold transition-all duration-200 ease-in-out
              bg-red-600 hover:bg-red-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
              ${selected === 'full' ? 'ring-4 ring-green-400' : ''}`}
          >
            Full Race Replay
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            🔥
          </span>
        </div>
      </div>

      {error && (
        <p className="text-red-500 mt-4 text-sm">{error}</p>
      )}

      {selected && !error && (
        <p className="text-green-500 mt-4 text-sm">
          Thanks for voting for the <strong>{selected === 'full' ? 'Full Race' : 'Race in 30'}</strong>!
        </p>
      )}
    </div>
  );
}
