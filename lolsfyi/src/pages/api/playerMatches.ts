import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db'; // Import your serverless-mysql instance

const pageSize = 5; // Set the desired page size

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the name and page query parameters
  const { name, page = 1, league, year } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'The name query parameter is required' });
  }

  const pageNumber = parseInt(page as string);
  const offset = (pageNumber - 1) * pageSize;

  try {
    // Fetch the most recent matches relevant to the player by name, league, and team
    // inner Here can be optimized to MatchID
    const sqlQuery = `
      SELECT M.MatchID,
      MAX(CASE WHEN T.Side = 'Red' THEN T.Teamname END) AS teamRed,
      MAX(CASE WHEN T.Side = 'Blue' THEN T.Teamname END) AS teamBlue,
      SUM(CASE WHEN M.Win_side = 'Red' THEN 1 ELSE 0 END)/2 AS teamRedScore,
      SUM(CASE WHEN M.Win_side = 'Blue' THEN 1 ELSE 0 END)/2 AS teamBlueScore,
      NULL AS teamRedLogo,
      NULL AS teamBlueLogo,
      DATE_FORMAT(M.Match_date, '%Y-%m-%d') AS date
      FROM (
        SELECT *                        
        FROM PlayerPerformance
        WHERE Playername = ?
      ) AS F
      JOIN Matches M ON M.MatchID = F.MatchID
      JOIN TeamPerformance T ON F.MatchID = T.MatchID
      WHERE (? IS NULL OR M.League = ?)
      AND (? IS NULL OR YEAR(M.Match_date) = ?)
      GROUP BY F.MatchID, F.Playername
      ORDER BY M.Match_date DESC
      LIMIT ? OFFSET ?;
    `;

    const results = await db.query(sqlQuery, [name, league, league, year, year, pageSize, offset]);

    // Close the database connection
    await db.end();

    // Send the fetched match data as a response
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
