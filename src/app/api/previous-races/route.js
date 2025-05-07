import { connectToDb } from '../../../models/utils/database';
import RaceWeekend from '../../../models/RaceWeekend';

export async function GET() {
  await connectToDb();
  const today = new Date();
  // Get last 4 races before today, most recent first
  const races = await RaceWeekend.find({ date: { $lt: today } })
    .sort({ date: -1 })
    .limit(4)
    .lean();
  return new Response(JSON.stringify(races), { status: 200 });
}
