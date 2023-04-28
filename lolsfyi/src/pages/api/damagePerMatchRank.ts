import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db'; // Import your serverless-mysql instance

interface PlayerDamageRank {
  Playername: string;
  Position: string;
  League: string;
  total_damage: number;
  damage_permatch: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { position, league, patch } = req.query;

  if (!position || !league || !patch) {
    return res.status(400).json({ error: 'The position, league, and patch query parameters are required' });
  }

  try {
    const sqlQuery = `
      SELECT P.Playername, P.Position, M.League, SUM(P.damagetochampions) as total_damage, AVG(P.damagetochampions) as damage_permatch
      FROM PlayerPerformance P
      JOIN (SELECT *
            FROM Matches
            WHERE Patch > ? AND League = ?) M ON P.MatchID = M.MatchID
      WHERE P.Position = ?
      GROUP BY P.Playername, P.Position
      HAVING COUNT(*) > 5
      ORDER BY damage_permatch DESC
    `;

    const results = await db.query<PlayerDamageRank[]>(sqlQuery, [patch, league, position]);

    // Close the database connection
    await db.end();

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
