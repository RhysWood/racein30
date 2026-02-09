import { connectToDb } from '../../../models/utils/database';
import RaceWeekend from '../../../models/RaceWeekend';

export async function GET() {
  try {
    await connectToDb();

    const currentDate = new Date();

    const currentRace = await RaceWeekend.findOne({
      date: { $lte: currentDate }
    }).sort({ date: -1 });

    const nextRace = await RaceWeekend.findOne({
      date: { $gt: currentDate }
    }).sort({ date: 1 });

    return new Response(
      JSON.stringify({ currentRace: currentRace || null, nextRace: nextRace || null }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('API Error:', error);
    return new Response("Failed to fetch current race", { status: 500 });
  }
}
