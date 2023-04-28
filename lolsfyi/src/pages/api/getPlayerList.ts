import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    
    const { league, page=1, name, team, order , asc} = req.query;
    const conditions = {
        league: league && `league='${league}'`,
        team: team && `team=${team}`,
        name: name && `name='${name}'`,
    };
    const whereClause = Object.values(conditions).filter(Boolean).join(' AND ');
    const winrateq = `select playername,
                CASE
                  WHEN COUNT(*) < 6 THEN NULL
                  ELSE CAST(SUM(result) AS FLOAT) / COUNT(*)
                END AS win_rate,
                sum(result) as Numberofwins,
                count(*)-sum(result) as NumberofLoses
               from
               (select playername,
                CASE WHEN pp.Side = M.Win_side THEN 1 ELSE 0 END as result
               from PlayerPerformance pp
               join Matches M
               on M.MatchID = pp.MatchID
               join Players Ps
               on Ps.Name = pp.playername
               where Ps.League = M.League) resulttable
               Group by  playername`
    
    // if (!page) {
    //     if (!order){
    //         try {
    //             const sqlQuery = `SELECT * FROM Players join (${winrateq}) as wr on wr.playername = name ${whereClause ? `WHERE ${whereClause}` : ''}`;
    //             const results = await db.query(sqlQuery);
    //             // Close the database connection
    //             await db.end();
    //             // Send the fetched data as a response
    //             res.status(200).json(results);
    //           } catch (error) {
    //             console.error(error);
    //             res.status(500).json({ error: 'Error fetching data from the database' });
    //           }
    //     }
    //     if (order) {
    //         try {
    //             const sqlQuery = `SELECT * FROM (SELECT * FROM Players join (${winrateq}) as wr on wr.playername = name ${whereClause ? `WHERE ${whereClause}` : ''}) as ps Order by ps.${order} ${(asc == '1') ? ` asc` : ' desc'}`;
    //             const results = await db.query(sqlQuery);
    //             // Close the database connection
    //             await db.end();
    //             // Send the fetched data as a response
    //             res.status(200).json(results);
    //           } catch (error) {
    //             console.error(error);
    //             res.status(500).json({ error: 'Error fetching data from the database' });
    //           }
    //     }
    //   }
    //   else{
        const pageSize = 20; // Define the number of results per page
        const pageNumber = parseInt(page as string);
        const offset = (pageNumber - 1) * pageSize;
        if (!order){
            try {
                const sqlQuery = `SELECT Teamname as teamname, League as league, Position as position, wr.win_rate as winrate, wr.Numberofwins as numberofwin, wr.NumberofLoses as numberofloses FROM Players join (${winrateq}) as wr on wr.playername = name ${whereClause ? `WHERE ${whereClause}` : ''} LIMIT ${offset}, ${pageSize}`;
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
                const sqlQuery = `SELECT * FROM (SELECT Teamname as teamname, League as league, Position as position, wr.win_rate as winrate, wr.Numberofwins as numberofwin, wr.NumberofLoses as numberofloses FROM Players join (${winrateq}) as wr on wr.playername = name ${whereClause ? `WHERE ${whereClause}` : ''}) as ps Order by ps.${order} ${(asc == '1') ? ` asc` : ' desc'} LIMIT ${offset}, ${pageSize}`;
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
      //}
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database' });
  }
};

export default handler;
