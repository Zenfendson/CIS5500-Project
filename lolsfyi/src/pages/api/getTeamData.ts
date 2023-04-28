import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const results = await db.query('SELECT TeamID, Name, League FROM Team');

    await db.end();

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database' });
  }
};

export default handler;
