import { connectToDb } from '../../../models/utils/database';
import RaceWeekend from '../../../models/RaceWeekend';

export async function GET() {
  try {
    await connectToDb();

    const currentDate = new Date();

    // Find the most recent race whose date is today or earlier
    const currentRace = await RaceWeekend.findOne({
      date: { $lte: currentDate }
    }).sort({ date: -1 });

    if (!currentRace) {
      return new Response(
        JSON.stringify({ message: "No past or current races found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(currentRace), { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return new Response("Failed to fetch current race", { status: 500 });
  }
}
