import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db'; // Import your serverless-mysql instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the name query parameter
  const { name } = req.query;

  // Validate the query parameter
  if (!name) {
    return res.status(400).json({ error: 'The name query parameter is required' });
  }

  try {
    // Fetch the player information from the Players table
    const sqlQuery = `
      SELECT *
      FROM Players
      WHERE Name = ?
    `;

    const results = await db.query(sqlQuery, [name]);

    // Close the database connection
    await db.end();

    // if (results.length === 0) {
    //   return res.status(400).json({ error: 'Name not found' });
    // }

    // Send the fetched player data as a response
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
