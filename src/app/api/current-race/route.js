import { connectToDb } from '../../../models/utils/database';
import RaceWeekend from '../../../models/RaceWeekend';

export async function GET() {
  try {
    await connectToDb();

    const currentDate = new Date();
    
    // Find the next race that hasn't happened yet
    const nextRace = await RaceWeekend.findOne({
      date: { $gte: currentDate }
    }).sort({ date: 1 });

    if (!nextRace) {
      return new Response(
        JSON.stringify({ message: "No upcoming races found" }), 
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(nextRace), { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return new Response("Failed to fetch current race", { status: 500 });
  }
}
