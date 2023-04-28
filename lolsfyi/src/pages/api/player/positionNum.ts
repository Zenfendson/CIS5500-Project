import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db'; // Import your serverless-mysql instance

interface PlayerCountResult {
  player_count: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the position and league query parameters
  const { position, league } = req.query;

  // Validate the query parameters
  if (!position || !league) {
    return res.status(400).json({ error: 'The position and league query parameters are required' });
  }

  // Check if the position is valid
  const validPositions = ['top', 'bot', 'jng', 'sup', 'mid'];
  if (!validPositions.includes(position as string)) {
    return res.status(400).json({ error: 'Invalid position' });
  }

  try {
    // Fetch the number of players in the given position in the specified league
    const sqlQuery = `
      SELECT
        SUM(CASE WHEN Position = ? THEN 1 ELSE 0 END) AS player_count
      FROM Players
      WHERE League = ?
    `;

    const results = await db.query<PlayerCountResult[]>(sqlQuery, [position, league]);

    // Close the database connection
    await db.end();

    // Send the fetched player count data as a response
    res.status(200).json({ player_count: results[0].player_count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
