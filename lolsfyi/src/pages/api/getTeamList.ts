import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { league, team} = req.query;
    const conditions = {
        league: league && `league='${league}'`,
        team: team && `Teamname=${team}`,
    };
    const whereClause = Object.values(conditions).filter(Boolean).join(' AND ');
            try {
                const sqlQuery = 
                    `select Teamid as teamid, Teamname,
                        CASE
                          WHEN COUNT(*) < 3 THEN NULL
                          ELSE CAST(SUM(result) AS FLOAT) / COUNT(*)
                        END AS win_rate
                      from TeamPerformance
                      ${whereClause ? `WHERE ${whereClause}` : ''}
                      Group by  Teamid, Teamname`;
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
