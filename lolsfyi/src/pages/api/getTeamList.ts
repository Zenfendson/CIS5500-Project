import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { league, page, team, order , asc} = req.query;
    const conditions = {
        league: league && `league='${league}'`,
        team: team && `Name=${team}`,
    };
    const whereClause = Object.values(conditions).filter(Boolean).join(' AND ');
    const winrateq = `select Teamid as id, Teamname,
    CASE
      WHEN COUNT(*) < 3 THEN NULL
      ELSE CAST(SUM(result) AS FLOAT) / COUNT(*)
    END AS win_rate
   from TeamPerformance
   Group by  Teamid, Teamname`
    if (!page) {
        if (!order){
            try {
                const sqlQuery = `SELECT * FROM Team join (${winrateq}) as wr on wr.id = teamid ${whereClause ? `WHERE ${whereClause}` : ''}`;
                const results = await db.query(sqlQuery);
                // Close the database connection
                await db.end();
                // Send the fetched data as a response
                res.status(200).json(results);
              } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error fetching data from the database' });
              }
        }
        if (order) {
            try {
                const sqlQuery = `SELECT * FROM (SELECT * FROM Team join (${winrateq}) as wr on wr.id = teamid ${whereClause ? `WHERE ${whereClause}` : ''}) as ps Order by ps.${order} ${(asc == '1') ? ` asc` : ' desc'}`;
                const results = await db.query(sqlQuery);
                // Close the database connection
                await db.end();
                // Send the fetched data as a response
                res.status(200).json(results);
              } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error fetching data from the database' });
              }
        }
      }
      else{
        const pageSize = 10; // Define the number of results per page
        const pageNumber = parseInt(page as string);
        const offset = (pageNumber - 1) * pageSize;
        if (!order){
            try {
                const sqlQuery = `SELECT * FROM Team join (${winrateq}) as wr on wr.id = Teamid ${whereClause ? `WHERE ${whereClause}` : ''} LIMIT ${offset}, ${pageSize}`;
                const results = await db.query(sqlQuery);
                // Close the database connection
                await db.end();
                // Send the fetched data as a response
                res.status(200).json(results);
              } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error fetching data from the database' });
              }
        }
        if (order) {
            try {
                const sqlQuery = `SELECT * FROM (SELECT * FROM Team join (${winrateq}) as wr on wr.id = Teamid ${whereClause ? `WHERE ${whereClause}` : ''}) as ps Order by ps.${order} ${(asc == '1') ? ` asc` : ' desc'} LIMIT ${offset}, ${pageSize}`;
                const results = await db.query(sqlQuery);
                // Close the database connection
                await db.end();
                // Send the fetched data as a response
                res.status(200).json(results);
              } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error fetching data from the database' });
              }
        }
      }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database' });
  }
};

export default handler;
