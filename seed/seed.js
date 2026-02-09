import mongoose from 'mongoose';
import dotenv from 'dotenv';
import RaceWeekend from '../src/models/RaceWeekend.js';

dotenv.config();

const races = [
  { race: "Australia", date: "2026-03-08", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "China", date: "2026-03-15", sprint: true, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Japan", date: "2026-03-29", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Bahrain", date: "2026-04-12", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Saudi Arabia", date: "2026-04-19", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Miami", date: "2026-05-03", sprint: true, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Canada", date: "2026-05-24", sprint: true, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Monaco", date: "2026-06-07", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Barcelona", date: "2026-06-14", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Austria", date: "2026-06-28", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Great Britain", date: "2026-07-05", sprint: true, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Belgium", date: "2026-07-19", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Hungary", date: "2026-07-26", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Netherlands", date: "2026-08-23", sprint: true, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Italy", date: "2026-09-06", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Madrid", date: "2026-09-13", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Azerbaijan", date: "2026-09-26", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Singapore", date: "2026-10-11", sprint: true, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "United States", date: "2026-10-25", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Mexico City", date: "2026-11-01", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Sao Paulo", date: "2026-11-08", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Las Vegas", date: "2026-11-21", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Qatar", date: "2026-11-29", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
  { race: "Abu Dhabi", date: "2026-12-06", sprint: false, votes: { fullRace: 0, raceIn30: 0 } },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await RaceWeekend.deleteMany({});
    console.log('Cleared existing data');

    await RaceWeekend.insertMany(races);
    console.log('Seeded 2026 race weekends');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding:', err);
    process.exit(1);
  }
}

seed();
