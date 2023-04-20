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
    const results = await db.query('SELECT * FROM Matches WHERE League = ? ORDER BY Match_date DESC LIMIT ?, ?',[league, offset, pageSize]);

    // Close the database connection
    await db.end();

    // Send the fetched data as a response
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
