import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';
//根据playerid查找其对应的多赛季胜率，优化先查名字
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract query parameters
  try {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'The name query parameter is required' });
    }else{
      console.log("11111");
        const results = await db.query(`SELECT
    ft.name,
   MAX(CASE WHEN ft.year= '2021' and ft.Split='Spring' THEN ft.win_rate END) AS win_rate_2021SPRING,
     MAX(CASE WHEN ft.year= '2021' and ft.Split='Summer' THEN ft.win_rate END) AS win_rate_2021SUMMER,
   MAX(CASE WHEN ft.year= '2022' and ft.Split='Spring' THEN ft.win_rate END) AS win_rate_2022SPRING,
    MAX(CASE WHEN ft.year= '2022' and ft.Split='Summer' THEN ft.win_rate END) AS win_rate_2022SUMMER,
   MAX(CASE WHEN ft.year= '2023' and ft.Split='Spring' THEN ft.win_rate END) AS win_rate_2023SPRING
   from
   (
   SELECT  ws.Name, ws.year, ws.split , CASE WHEN COUNT(*) < 6 THEN NULL ELSE CAST(SUM(ws.result) AS FLOAT) / COUNT(*) END AS win_rate
   from
       (
       select Ps.Name,  YEAR(M.Match_date) as year, M.split,CASE WHEN pp.Side = M.Win_side THEN 1 ELSE 0 END as result
       from PlayerPerformance pp
       join Matches M
       on M.MatchID = pp.MatchID
       join Players Ps
       on Ps.Name = pp.playername
       where pp.playername = '${name}' and Ps.League = M.League and (M.Split = 'Spring' or M.Split = 'Summer')
       )as  ws
   Group by  ws.Name, ws.year,ws.split) as ft
   group by ft.name`);

    // Close the database connection
    await db.end();

    // Send the fetched data as a response
    res.status(200).json(results);

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
