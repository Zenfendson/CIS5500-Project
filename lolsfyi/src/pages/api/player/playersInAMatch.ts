import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db'; // Import your serverless-mysql instance

interface PlayerPerformance {
  // Add the required fields from the PlayerPerformance table as needed
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { match_id } = req.query;

  if (!match_id) {
    return res.status(400).json({ error: 'The match_id query parameter is required' });
  }

  try {
    const sqlQuery = `
      SELECT *
      FROM PlayerPerformance
      WHERE MatchID = ?
    `;

    const results = await db.query<PlayerPerformance[]>(sqlQuery, [match_id]);

    // Close the database connection
    await db.end();

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
