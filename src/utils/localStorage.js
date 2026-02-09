export const hasVoted = (raceId) => {
  try {
    if (typeof window === 'undefined') return false;
    const votes = JSON.parse(window.localStorage.getItem('raceVotes') || '{}');
    return votes[raceId] || false;
  } catch {
    return false;
  }
};

export const saveVote = (raceId, voteType) => {
  try {
    if (typeof window === 'undefined') return;
    const votes = JSON.parse(window.localStorage.getItem('raceVotes') || '{}');
    votes[raceId] = voteType;
    window.localStorage.setItem('raceVotes', JSON.stringify(votes));
  } catch {
    // Storage unavailable
  }
};
