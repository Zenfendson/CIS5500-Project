import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract query parameters
  const { matchid, side } = req.query;

  // Validate the query parameters
  if (!side || !matchid) {
    return res.status(400).json({ error: 'Both matchid and side query parameters are required' });
  }
  try {
    const sqlQuery = `
    select
      ban1,ban2,ban3,ban4,ban5,
      kills,deaths,assists,
      dragons,barons,
      firstblood, firsttower, firstdragon,
      damagetochampions,totalgold,visionscore,
      M.Match_date AS date,
      M.GameLength
      FROM
      Matches AS M
      JOIN TeamPerformance T ON M.MatchID = T.MatchID
      WHERE M.MatchID = '${matchid}' and T.side = '${side}'
      GROUP BY M.MatchID, M.Match_date
    `;
    
    const results = await db.query(sqlQuery);

    // Close the database connection
    await db.end();

    // Send the fetched data as a responses
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
