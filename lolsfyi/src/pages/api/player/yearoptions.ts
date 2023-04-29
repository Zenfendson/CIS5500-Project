import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'The name query parameter is required' });
  }

  try {
    const sqlQuery = `
      SELECT DISTINCT YEAR(M.Match_date) AS year
      FROM PlayerPerformance P
      JOIN Matches M ON M.MatchID = P.MatchID
      WHERE P.Playername = ?
      ORDER BY year
    `;

    const results = await db.query(sqlQuery, [name]);

    await db.end();

    // const options = results.map(result => result.year);

    // res.status(200).json({ options });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
