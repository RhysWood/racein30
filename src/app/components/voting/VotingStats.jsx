'use client';

const VotingStats = ({ votes }) => {
  const { fullRace, raceIn30 } = votes;
  const totalVotes = fullRace + raceIn30;
  const fullRacePercentage = totalVotes ? (fullRace / totalVotes) * 100 : 0;
  const raceIn30Percentage = totalVotes ? (raceIn30 / totalVotes) * 100 : 0;

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-2 text-sm text-gray-500">
        {totalVotes ? `Total Votes: ${totalVotes}` : 'No votes yet'}
      </div>
      
      <div className="relative h-8 rounded-full overflow-hidden group border border-gray-200">
        {totalVotes > 0 ? (
          <>
            <div 
              className="absolute h-full bg-red-500 transition-all duration-300"
              style={{ width: `${fullRacePercentage}%` }}
            />
            <div 
              className="absolute h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${raceIn30Percentage}%`, left: `${fullRacePercentage}%` }}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-100" />
        )}
        
        <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center text-sm font-medium transition-opacity duration-200 bg-black/20">
          {totalVotes > 0 ? (
            <>
              <span className="px-2 text-white">
                Full Race: {Math.round(fullRacePercentage)}%
              </span>
              <span className="px-2 border-l border-white/20 text-white">
                Race in 30: {Math.round(raceIn30Percentage)}%
              </span>
            </>
          ) : (
            <span className="text-gray-600">
              Be the first to vote!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingStats;
