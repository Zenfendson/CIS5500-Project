import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db'; // Import your serverless-mysql instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the name query parameter
  const { name } = req.query;

  // Validate the query parameter
  if (!name) {
    return res.status(400).json({ error: 'The name query parameter is required' });
  }

  try {
    // Fetch the player information from the Players table
    const sqlQuery = `
    select wr.win_rate as winrate, wr.Numberofwins as numberofwins, wr.NumberofLoses as numberofloses, avg(kills) as kills, avg(deaths) as deaths, avg(assists) as assists, (avg(kills)+avg(deaths))/avg(assists) as KDA,
    avg(pentakills) as pentakillsrate, avg(dpm) as dpm, avg(earned_gpm) as gpm, avg(cspm) as cspm
    from Players
    join PlayerPerformance pp on Players.Name = pp.Playername
    join
    (
    select playername,
    CASE
        WHEN COUNT(*) < 6 THEN NULL
        ELSE CAST(SUM(result) AS FLOAT) / COUNT(*)
    END AS win_rate,
    sum(result) as Numberofwins,
    count(*)-sum(result) as NumberofLoses
    from
        (select
            playername,
            CASE WHEN pp.Side = M.Win_side THEN 1 ELSE 0 END as result
        from PlayerPerformance pp
        join Matches M
            on M.MatchID = pp.MatchID
        join Players Ps
            on Ps.Name = pp.playername
        where pp.playername= '${name}' and Ps.League = M.League) as resulttable
    Group by resulttable.playername
    ) as wr
    on wr.playername = Players.Name
    `;

    const results = await db.query(sqlQuery);

    // Close the database connection
    await db.end();

    // if (results.length === 0) {
    //   return res.status(400).json({ error: 'Name not found' });
    // }

    // Send the fetched player data as a response
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
