import { connectToDb } from '../../../models/utils/database';
import RaceWeekend from '../../../models/RaceWeekend';

export async function GET() {
  try {
    await connectToDb();

    const races = await RaceWeekend.find({})
      .select('race date sprint votes')
      .sort({ date: 1 })
      .lean();

    return new Response(JSON.stringify(races), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Calendar fetch error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch calendar' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
