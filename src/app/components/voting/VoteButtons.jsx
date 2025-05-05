'use client';

import { useState } from 'react';

export default function VoteButtons() {
  const [selected, setSelected] = useState(null);

  const handleVote = (vote) => {
    setSelected(vote);
    // TODO: send vote to backend
    console.log(`User voted: ${vote}`);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-bold text-center">How was the race?</h2>
      <div className="flex gap-6">
        {/* Race in 30 Button */}
        <div className="relative group">
          <button
            onClick={() => handleVote('30')}
            className={`px-6 py-4 rounded-2xl text-white text-lg font-semibold transition-all duration-200 ease-in-out
              bg-gray-800 hover:bg-gray-700 active:scale-95
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
            className={`px-6 py-4 rounded-2xl text-white text-lg font-semibold transition-all duration-200 ease-in-out
              bg-red-600 hover:bg-red-500 active:scale-95
              ${selected === 'full' ? 'ring-4 ring-green-400' : ''}`}
          >
            Full Race Replay
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            🔥
          </span>
        </div>
      </div>

      {selected && (
        <p className="text-green-500 mt-4 text-sm">
          Thanks for voting for the <strong>{selected === 'full' ? 'Full Race' : 'Race in 30'}</strong>!
        </p>
      )}
    </div>
  );
}
