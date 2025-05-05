import mongoose from 'mongoose';

const raceWeekendSchema = new mongoose.Schema({
  race: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.models.RaceWeekend || mongoose.model('RaceWeekend', raceWeekendSchema);
