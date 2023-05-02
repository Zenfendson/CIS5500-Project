import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { league, team} = req.query;
    const conditions = {
        league: league && `league='${league}'`,
        team: team && `name=${team}`,
    };
    const whereClause = Object.values(conditions).filter(Boolean).join(' AND ');
            try {
                const sqlQuery = 
                    `select TeamPerformance.Teamid as id, TeamPerformance.Teamname, tl.league as League,
                    CASE
                      WHEN COUNT(*) < 3 THEN NULL
                      ELSE CAST(SUM(TeamPerformance.result) AS FLOAT) / COUNT(*)
                    END AS win_rate
                  from TeamPerformance
                  join (
                  select * from
                    Team
                     ${whereClause ? ` where ${whereClause}` : ''}) as tl
                  on tl.teamid = TeamPerformance.Teamid
                  Group by  TeamPerformance.Teamid, TeamPerformance.Teamname;`;
                const results = await db.query(sqlQuery);
                // Close the database connection
                await db.end();
                // Send the fetched data as a response
                res.status(200).json(results);
              } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error fetching data from the database' });
              }
        
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database' });
  }
};

export default handler;
