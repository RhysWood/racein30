import mongoose from 'mongoose';
import dotenv from 'dotenv';
import RaceWeekend from '../src/models/RaceWeekend.js';

dotenv.config();

const races = [
  { 
    race: "Australia", 
    date: "2025-03-16",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "China", 
    date: "2025-03-23",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Japan", 
    date: "2025-04-06",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Bahrain", 
    date: "2025-04-13",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Saudi Arabia", 
    date: "2025-04-20",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Miami", 
    date: "2025-05-04",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Emilia-Romagna", 
    date: "2025-05-18",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Monaco", 
    date: "2025-05-25",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Spain", 
    date: "2025-06-01",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Canada", 
    date: "2025-06-15",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Austria", 
    date: "2025-06-29",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Great Britain", 
    date: "2025-07-06",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Belgium", 
    date: "2025-07-27",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Hungary", 
    date: "2025-08-03",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Netherlands", 
    date: "2025-08-31",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Italy", 
    date: "2025-09-07",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Azerbaijan", 
    date: "2025-09-21",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Singapore", 
    date: "2025-10-05",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "United States", 
    date: "2025-10-19",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Mexico City", 
    date: "2025-10-26",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Sao Paulo", 
    date: "2025-11-09",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Las Vegas", 
    date: "2025-11-22",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Qatar", 
    date: "2025-11-30",
    votes: { fullRace: 0, raceIn30: 0 }
  },
  { 
    race: "Abu Dhabi", 
    date: "2025-12-07",
    votes: { fullRace: 0, raceIn30: 0 }
  }
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
