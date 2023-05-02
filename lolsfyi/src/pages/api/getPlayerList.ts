import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    
    const { league,name, team} = req.query;
    const conditions = {
        league: league && `Ps.league='${league}'`,
        team: team && `Ps.Teamname=${team}`,
        name: name && `Ps.name='${name}'`,
    };
    const whereClause = Object.values(conditions).filter(Boolean).join(' AND ');
    // const winrateq = `select playername,
    //             CASE
    //               WHEN COUNT(*) < 6 THEN NULL
    //               ELSE CAST(SUM(result) AS FLOAT) / COUNT(*)
    //             END AS win_rate,
    //             sum(result) as Numberofwins,
    //             count(*)-sum(result) as NumberofLoses
    //            from
    //            (select playername,
    //             CASE WHEN pp.Side = M.Win_side THEN 1 ELSE 0 END as result
    //            from PlayerPerformance pp
    //            join Matches M
    //            on M.MatchID = pp.MatchID
    //            join Players Ps
    //            on Ps.Name = pp.playername
    //            where Ps.League = M.League) resulttable
    //            Group by  playername`
        
            try {
                // const sqlQuery = `SELECT Teamname as teamname, 
                // playername as id,
                // League as league, 
                // Position as position, 
                // wr.win_rate as winrate, 
                // wr.Numberofwins as numberofwin, 
                // wr.NumberofLoses as numberofloses 
                // FROM Players join (${winrateq}) as wr on wr.playername = name 
                // ${whereClause ? `WHERE ${whereClause}` : ''}`; 

                const sqlQuery =`
                select playername,Teamname as teamname,
                playername as id,
                League as league,
                Position as position,
                CASE
                  WHEN COUNT(*) < 6 THEN NULL
                  ELSE CAST(SUM(result) AS FLOAT) / COUNT(*)
                END AS winrate,
                sum(result) as numberofwin,
                count(*)-sum(result) as numberofloses
               from
               (select playername, Ps.Teamname, Ps.League, Ps.Position,
                CASE WHEN pp.Side = M.Win_side THEN 1 ELSE 0 END as result
               from PlayerPerformance pp
               join Matches M
               on M.MatchID = pp.MatchID
               join Players Ps
               on Ps.Name = pp.playername
               where Ps.League = M.League ${whereClause ? `and ${whereClause}` : ''}) resulttable
               Group by  playername;`
                
                // LIMIT ${pageSize} OFFSET ${offset}`;
                const results = await db.query(sqlQuery);
                // Close the database connection
                await db.end();
                // Send the fetched data as a response
                res.status(200).json(results);
              } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error fetching data from the database' });
              }

        // if (order) {
        //     try {
        //         const sqlQuery = `SELECT * FROM (SELECT Teamname as teamname,  
        //           playername as id,League as league, Position as position, 
        //           wr.win_rate as winrate, 
        //           wr.Numberofwins as numberofwin, 
        //           wr.NumberofLoses as numberofloses 
        //           FROM Players join (${winrateq}) as wr on wr.playername = name 
        //           ${whereClause ? `WHERE ${whereClause}` : ''}) as ps 
        //           Order by ps.${order} ${(asc == '1') ? ` asc` : ' desc'}`;
        //           // LIMIT ${pageSize} OFFSET ${offset}`;
        //         const results = await db.query(sqlQuery);
        //         // Close the database connection
        //         await db.end();
        //         // Send the fetched data as a response
        //         res.status(200).json(results);
        //       } catch (error) {
        //         console.error(error);
        //         res.status(500).json({ error: 'Error fetching data from the database' });
        //       }
        // }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database' });
  }
};

export default handler;
