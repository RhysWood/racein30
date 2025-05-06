import { connectToDb } from '../../../models/utils/database';
import RaceWeekend from '../../../models/RaceWeekend';
import { trackVote } from '../../../utils/analytics';


export async function POST(request) {
    try {
      const { raceId, voteType } = await request.json();
      
      // Input validation
      if (!raceId || !voteType) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }), 
          { status: 400 }
        );
      }
  
      // Validate vote type
      if (!['fullRace', 'raceIn30'].includes(voteType)) {
        return new Response(
          JSON.stringify({ error: 'Invalid vote type' }), 
          { status: 400 }
        );
      }
  
      // Connect to database
      await connectToDb();
  
      // Update vote count
      const race = await RaceWeekend.findByIdAndUpdate(
        raceId,
        { $inc: { [`votes.${voteType}`]: 1 } },
        { new: true }
      );
  
      // Check if race exists
      if (!race) {
        return new Response(
          JSON.stringify({ error: 'Race not found' }), 
          { status: 404 }
        );
      }
  
      // Track analytics
      try {
        await trackVote(raceId, voteType);
      } catch (analyticsError) {
        // Log but don't fail the vote if analytics fails
        console.error('Analytics error:', analyticsError);
      }
  
      // Return updated race data
      return new Response(
        JSON.stringify(race), 
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
    } catch (error) {
      console.error('Vote error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to cast vote' }), 
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }
  }
