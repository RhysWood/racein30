'use client';

const VotingStats = ({ votes }) => {
  const { fullRace, raceIn30 } = votes;
  const totalVotes = fullRace + raceIn30;
  const fullRacePercentage = totalVotes ? (fullRace / totalVotes) * 100 : 0;
  const raceIn30Percentage = totalVotes ? (raceIn30 / totalVotes) * 100 : 0;

  return (
    <div className="w-full max-w-md">
      {totalVotes > 0 ? (
        <div className="flex justify-between text-sm font-medium mb-2">
          <span className="text-racing-red">
            Full Race {Math.round(fullRacePercentage)}%
          </span>
          <span className="text-blue-400">
            Race in 30 {Math.round(raceIn30Percentage)}%
          </span>
        </div>
      ) : null}

      <div className="relative h-3 rounded-full overflow-hidden bg-card-bg border border-card-border">
        {totalVotes > 0 ? (
          <>
            <div
              className="absolute h-full bg-racing-red transition-all duration-300"
              style={{ width: `${fullRacePercentage}%` }}
            />
            <div
              className="absolute h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${raceIn30Percentage}%`, left: `${fullRacePercentage}%` }}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-card-bg" />
        )}
      </div>

      <div className="text-center mt-2 text-xs text-muted">
        {totalVotes ? `${totalVotes} votes` : 'No votes yet — be the first!'}
      </div>
    </div>
  );
};

export default VotingStats;
