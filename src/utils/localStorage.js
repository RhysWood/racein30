export const hasVoted = (raceId) => {
  if (typeof window === 'undefined') return false;
  const votes = JSON.parse(localStorage.getItem('raceVotes') || '{}');
  return !!votes[raceId];
};

export const saveVote = (raceId, voteType) => {
  if (typeof window === 'undefined') return;
  const votes = JSON.parse(localStorage.getItem('raceVotes') || '{}');
  votes[raceId] = voteType;
  localStorage.setItem('raceVotes', JSON.stringify(votes));
};
