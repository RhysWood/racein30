import { connectToDb } from '../../../models/utils/database';
import mongoose from 'mongoose';
import RaceWeekend from '../../../models/RaceWeekend';

export async function GET() {
  try {
    await connectToDb();

    const races = await RaceWeekend.find({})
      .select('race date sprint votes')
      .sort({ date: 1 });

    if (!races) {
      return new Response(
        JSON.stringify({ error: 'No data found' }), 
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify(races), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Analytics fetch error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch analytics' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
