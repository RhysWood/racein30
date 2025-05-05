import mongoose from 'mongoose';
import dotenv from 'dotenv';
import RaceWeekend from '../src/models/RaceWeekend.js';

dotenv.config();

const races = [
  { race: "Australia", date: "2025-03-16" },
  { race: "China", date: "2025-03-23" },
  { race: "Japan", date: "2025-04-06" },
  { race: "Bahrain", date: "2025-04-13" },
  { race: "Saudi Arabia", date: "2025-04-20" },
  { race: "Miami", date: "2025-05-04" },
  { race: "Emilia-Romagna", date: "2025-05-18" },
  { race: "Monaco", date: "2025-05-25" },
  { race: "Spain", date: "2025-06-01" },
  { race: "Canada", date: "2025-06-15" },
  { race: "Austria", date: "2025-06-29" },
  { race: "Great Britain", date: "2025-07-06" },
  { race: "Belgium", date: "2025-07-27" },
  { race: "Hungary", date: "2025-08-03" },
  { race: "Netherlands", date: "2025-08-31" },
  { race: "Italy", date: "2025-09-07" },
  { race: "Azerbaijan", date: "2025-09-21" },
  { race: "Singapore", date: "2025-10-05" },
  { race: "United States", date: "2025-10-19" },
  { race: "Mexico City", date: "2025-10-26" },
  { race: "Sao Paulo", date: "2025-11-09" },
  { race: "Las Vegas", date: "2025-11-22" },
  { race: "Qatar", date: "2025-11-30" },
  { race: "Abu Dhabi", date: "2025-12-07" }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await RaceWeekend.deleteMany({});
    console.log('🧹 Cleared existing data');

    await RaceWeekend.insertMany(races);
    console.log('🌱 Seeded race weekends');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding:', err);
    process.exit(1);
  }
}

seed();
