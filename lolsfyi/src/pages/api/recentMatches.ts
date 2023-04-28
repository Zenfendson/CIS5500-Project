import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract query parameters
  const { league, page } = req.query;

  // Validate the query parameters
  if (!league || !page) {
    return res.status(400).json({ error: 'Both league and page query parameters are required' });
  }

  const pageSize = 10; // Define the number of results per page
  const pageNumber = parseInt(page as string);
  const offset = (pageNumber - 1) * pageSize;

  try {

    // Fetch the recent matches and join with TeamPerformance table
    const sqlQuery = `
      SELECT *
      FROM 
        (SELECT *
        FROM Matches
        WHERE Matches.League = ?
        ORDER BY Matches.Match_date DESC
        LIMIT ?, ?
        ) AS M 
        JOIN TeamPerformance T ON M.MatchID = T.MatchID
    `;
    
    const results = await db.query(sqlQuery,[league, offset, pageSize]);

    // Close the database connection
    await db.end();

    // Send the fetched data as a responses
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
