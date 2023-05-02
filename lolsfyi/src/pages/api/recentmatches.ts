import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract query parameters
  const { league, page=1 } = req.query;

  // Validate the query parameters
  if (!league || !page) {
    return res.status(400).json({ error: 'Both league and page query parameters are required' });
  }

  const pageSize = 10; // Define the number of results per page
  const pageNumber = parseInt(page as string);
  const offset = (pageNumber - 1) * pageSize;

  try {

    // Fetch the recent matches and join with TeamPerformance table
    
    // SELECT M.MatchID, T.TeamID, T.Teamname, T.Side, M.Win_side, M.Match_date
    const sqlQuery = `
    SELECT M.MatchID,
      MAX(CASE WHEN T.Side = 'Red' THEN T.Teamname END) AS teamRed,
      MAX(CASE WHEN T.Side = 'Blue' THEN T.Teamname END) AS teamBlue,
      SUM(CASE WHEN M.Win_side = 'Red' THEN 1 ELSE 0 END)/2 AS teamRedScore,
      SUM(CASE WHEN M.Win_side = 'Blue' THEN 1 ELSE 0 END)/2 AS teamBlueScore,
      NULL AS teamRedLogo,
      NULL AS teamBlueLogo,
      DATE_FORMAT(M.Match_date, '%Y-%m-%d') AS date
      FROM 
        (SELECT *
        FROM Matches
        WHERE Matches.League = ?
        ORDER BY Matches.Match_date DESC
        LIMIT ?, ?
        ) AS M 
      JOIN TeamPerformance T ON M.MatchID = T.MatchID
      GROUP BY M.MatchID, M.Match_date
    `;
    
    const results = await db.query(sqlQuery,[league, offset, pageSize]);

    // Close the database connection
    await db.end();

    // Send the fetched data as a responses
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
