import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db'; // Import your serverless-mysql instance

const pageSize = 10; // Set the default page size

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the league query parameter
  const { league } = req.query;

  // Validate the query parameters
  if (!league) {
    return res.status(400).json({ error: 'The league query parameter is required' });
  }

  try {
    // Count the total number of matches in the specified league and calculate maxPagination in SQL
    const sqlQuery = `
      SELECT CEIL(COUNT(DISTINCT MatchID) / ?) as maxPagination
      FROM Matches
      WHERE League = ?;
    `;

    const result = await db.query(sqlQuery, [pageSize, league]);

    // Close the database connection
    await db.end();

    // Send the max pagination number as a response
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
