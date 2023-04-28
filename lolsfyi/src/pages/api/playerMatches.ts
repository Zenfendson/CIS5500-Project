import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db'; // Import your serverless-mysql instance

const pageSize = 10; // Set the desired page size

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the name and page query parameters
  const { name, page } = req.query;

  // Validate the query parameters
  if (!name || !page) {
    return res.status(400).json({ error: 'The name, and page query parameters are required' });
  }

  const pageNumber = parseInt(page as string);
  const offset = (pageNumber - 1) * pageSize;

  try {
    // Fetch the most recent matches relevant to the player by name, league, and team
    // inner Here can be optimized to MatchID
    const sqlQuery = `
      SELECT *
      FROM (
        SELECT *                        
        FROM PlayerPerformance
        WHERE Playername = ?
        LIMIT ? OFFSET ?
      ) AS Filtered_match
      JOIN Matches ON Matches.MatchID = Filtered_match.MatchID
      JOIN TeamPerformance ON Filtered_match.MatchID = TeamPerformance.MatchID
    `;

    const results = await db.query(sqlQuery, [name, pageSize, offset]);

    // Close the database connection
    await db.end();

    // Send the fetched match data as a response
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
