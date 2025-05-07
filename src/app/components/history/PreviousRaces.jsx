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
    <section className="w-full max-w-2xl mt-8">
      <h3 className="text-lg font-semibold mb-4 text-center">Previous Races</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {races.map(race => {
          const totalVotes = race.votes.fullRace + race.votes.raceIn30;
          const fullRacePct = totalVotes ? (race.votes.fullRace / totalVotes) * 100 : 0;
          const raceIn30Pct = totalVotes ? (race.votes.raceIn30 / totalVotes) * 100 : 0;
          return (
            <div
              key={race._id}
              className="border rounded-lg p-6 bg-gray-50 shadow-sm flex flex-col gap-3"
            >
              <div className="font-bold text-base">{race.race}</div>
              <div className="text-xs text-gray-500 mb-2">
                {new Date(race.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div className="flex flex-col gap-2">
                <div className="relative h-4 rounded-full overflow-hidden bg-gray-200">
                  <div
                    className="absolute h-full bg-red-500"
                    style={{ width: `${fullRacePct}%` }}
                  />
                  <div
                    className="absolute h-full bg-blue-500"
                    style={{ width: `${raceIn30Pct}%`, left: `${fullRacePct}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-red-600">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1 align-middle" />
                    {race.votes.fullRace}
                  </span>
                  <span className="text-blue-500">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1 align-middle" />
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
