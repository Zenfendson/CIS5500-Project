import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db'; // Import your serverless-mysql instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the match_id query parameter
  const { match_id } = req.query;

  // Validate the query parameter
  if (!match_id) {
    return res.status(400).json({ error: 'The match_id query parameter is required' });
  }

  try {
    // Fetch the match details from the TeamPerformance table
    const sqlQuery = `
      SELECT *
      FROM TeamPerformance
      WHERE MatchID = ?
    `;

    const results = await db.query(sqlQuery, [match_id]);

    // Close the database connection
    await db.end();

    // Send the fetched data as a response
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
