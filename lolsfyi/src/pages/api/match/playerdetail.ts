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
    pp.Playername as name,pp.Position as position,pp.champion,
    kills,deaths,assists,
    CASE WHEN deaths = 0 THEN kills+assists ELSE (kills+assists)/deaths END AS KDA,
    firstbloodvictim,
    damagetochampions,total_cs, totalgold,visionscore
      FROM
      Matches AS M
      JOIN PlayerPerformance pp ON M.MatchID = pp.MatchID
      WHERE M.MatchID = '${matchid}' and pp.side = '${side}'
      GROUP BY M.MatchID, M.Match_date, pp.Playername, pp.Position, pp.champion
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
