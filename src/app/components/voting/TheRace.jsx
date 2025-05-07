'use client';
import React, { useEffect, useState } from 'react';
import VoteButtons from './VoteButtons';
import VotingStats from './VotingStats';

const TheRace = () => {
  const [currentRace, setCurrentRace] = useState(null);

  useEffect(() => {
    const getCurrentRace = async () => {
      try {
        const response = await fetch('/api/current-race');
        const data = await response.json();
        setCurrentRace(data);
      } catch (error) {
        console.error('Error fetching current race:', error);
      }
    };

    getCurrentRace();
  }, []);

  // Add this handler to update votes instantly
  const handleVoteComplete = (voteType) => {
    setCurrentRace((prev) => ({
      ...prev,
      votes: {
        ...prev.votes,
        [voteType === 'full' ? 'fullRace' : 'raceIn30']: prev.votes[
          voteType === 'full' ? 'fullRace' : 'raceIn30'
        ] + 1,
      },
    }));
  };

  if (!currentRace) return <div>Loading...</div>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full flex flex-col items-center text-center mb-6">
      <h1 className="text-3xl font-extrabold text-black tracking-tight">
        {currentRace.race}
      </h1>
      <p className="text-sm text-gray-400 mt-1">
        {formatDate(currentRace.date)}
      </p>
      <div className="mt-6 mb-8 w-full">
        <VotingStats votes={currentRace.votes} />
      </div>
      <VoteButtons raceId={currentRace._id} onVoteComplete={handleVoteComplete} />
    </div>
  );
};

export default TheRace;
