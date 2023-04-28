import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract query parameters
  try {
    const results = await db.query('SELECT Name FROM Players');

    // Close the database connection
    await db.end();

    // Send the fetched data as a response
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
