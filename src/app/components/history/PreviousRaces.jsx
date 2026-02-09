'use client';
import { useEffect, useState } from 'react';

export default function PreviousRaces() {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    async function fetchRaces() {
      const res = await fetch('/api/previous-races');
      const data = await res.json();
      setRaces(data);
    }
    fetchRaces();
  }, []);

  if (!races.length) return null;

  return (
    <section className="w-full max-w-2xl mt-4">
      <h3 className="text-lg font-semibold mb-4 text-center">Previous Races</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {races.map(race => {
          const totalVotes = race.votes.fullRace + race.votes.raceIn30;
          const fullRacePct = totalVotes ? (race.votes.fullRace / totalVotes) * 100 : 0;
          const raceIn30Pct = totalVotes ? (race.votes.raceIn30 / totalVotes) * 100 : 0;
          return (
            <div
              key={race._id}
              className="rounded-xl p-5 bg-card-bg border border-card-border flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-base">{race.race}</span>
                {race.sprint && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-racing-red/20 text-racing-red rounded-full">
                    Sprint
                  </span>
                )}
              </div>
              <div className="text-xs text-muted mb-1">
                {new Date(race.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div className="flex flex-col gap-2">
                <div className="relative h-2.5 rounded-full overflow-hidden bg-[#2a2a2a]">
                  <div
                    className="absolute h-full bg-racing-red"
                    style={{ width: `${fullRacePct}%` }}
                  />
                  <div
                    className="absolute h-full bg-blue-500"
                    style={{ width: `${raceIn30Pct}%`, left: `${fullRacePct}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-racing-red flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-racing-red" />
                    {race.votes.fullRace}
                  </span>
                  <span className="text-blue-400 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                    {race.votes.raceIn30}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
