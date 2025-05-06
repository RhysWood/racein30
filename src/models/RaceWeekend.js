import mongoose from 'mongoose';

const raceWeekendSchema = new mongoose.Schema({
  race: { type: String, required: true },
  date: { type: Date, required: true },
  votes: {
    fullRace: { type: Number, default: 0 },
    raceIn30: { type: Number, default: 0 }
  }
});

export default mongoose.models.RaceWeekend || mongoose.model('RaceWeekend', raceWeekendSchema);
