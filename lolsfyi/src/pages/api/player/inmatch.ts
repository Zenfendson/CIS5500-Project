import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db'; // Import your serverless-mysql instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { matchid } = req.query;

  if (!matchid) {
    return res.status(400).json({ error: 'The match_id query parameter is required' });
  }

  try {
    const sqlQuery = `
    SELECT 
    UUID() as id,
    P.Playername as player,
    P.Position as position,
    P.Champion as champion,
    NULL as championImage,
    P.kills as kills,
    P.deaths as deaths,
    P.assists as assists,
    P.total_cs as cs,
    P.totalgold as gold,
    P.damagetochampions as damage
    FROM PlayerPerformance P
    WHERE P.MatchID = ?;
    `;

    const results = await db.query(sqlQuery, [matchid]);

    // Close the database connection
    await db.end();

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
