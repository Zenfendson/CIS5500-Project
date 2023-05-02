import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db'; // Import your serverless-mysql instance

const pageSize = 4; // Set the desired page size

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the teamname query parameter
  const { teamname , page = 1} = req.query;

  // Validate the query parameter
  if (!teamname) {
    return res.status(400).json({ error: 'The teamname query parameter is required' });
  }

  const pageNumber = parseInt(page as string);
  const offset = (pageNumber - 1) * pageSize;

  try {
    const sqlQuery = `
      SELECT 
        TP.MatchID,
        MAX(CASE WHEN TP.Side = 'Red' THEN TP.teamname END) AS red_teamname,
        MAX(CASE WHEN TP.Side = 'Red' THEN TP.ban1 END) AS red_ban1,
        MAX(CASE WHEN TP.Side = 'Red' THEN TP.ban2 END) AS red_ban2,
        MAX(CASE WHEN TP.Side = 'Red' THEN TP.ban3 END) AS red_ban3,
        MAX(CASE WHEN TP.Side = 'Red' THEN TP.ban4 END) AS red_ban4,
        MAX(CASE WHEN TP.Side = 'Red' THEN TP.ban5 END) AS red_ban5,
        MAX(CASE WHEN TP.Side = 'Red' THEN TP.result END) AS red_result,
        MAX(CASE WHEN TP.Side = 'Blue' THEN TP.teamname END) AS blue_teamname,
        MAX(CASE WHEN TP.Side = 'Blue' THEN TP.ban1 END) AS blue_ban1,
        MAX(CASE WHEN TP.Side = 'Blue' THEN TP.ban2 END) AS blue_ban2,
        MAX(CASE WHEN TP.Side = 'Blue' THEN TP.ban3 END) AS blue_ban3,
        MAX(CASE WHEN TP.Side = 'Blue' THEN TP.ban4 END) AS blue_ban4,
        MAX(CASE WHEN TP.Side = 'Blue' THEN TP.ban5 END) AS blue_ban5,
        MAX(CASE WHEN TP.Side = 'Blue' THEN TP.result END) AS blue_result,
        GROUP_CONCAT(
            CASE WHEN PP.Side = 'Red' THEN PP.Champion END
            ORDER BY PP.Position
            SEPARATOR ','
          ) AS red_champions,
        GROUP_CONCAT(
            CASE WHEN PP.Side = 'Blue' THEN PP.Champion END
            ORDER BY PP.Position
            SEPARATOR ','
        ) AS blue_champions,
      DATE_FORMAT(M.Match_date, '%Y-%m-%d') AS date,
      MAX(CASE WHEN TP.Side = 'Red' THEN TP.kills END) AS red_kills,
      MAX(CASE WHEN TP.Side = 'Red' THEN TP.deaths END) AS red_deaths,
      MAX(CASE WHEN TP.Side = 'Red' THEN TP.assists END) AS red_assists,
      MAX(CASE WHEN TP.Side = 'Red' THEN TP.totalgold END) AS red_totalgold,
      MAX(CASE WHEN TP.Side = 'Red' THEN TP.dragons END) AS red_dragons,
      MAX(CASE WHEN TP.Side = 'Blue' THEN TP.kills END) AS blue_kills,
      MAX(CASE WHEN TP.Side = 'Blue' THEN TP.deaths END) AS blue_deaths,
      MAX(CASE WHEN TP.Side = 'Blue' THEN TP.assists END) AS blue_assists,
      MAX(CASE WHEN TP.Side = 'Blue' THEN TP.totalgold END) AS blue_totalgold,
      MAX(CASE WHEN TP.Side = 'Blue' THEN TP.dragons END) AS blue_dragons,
      (SELECT CEIL(COUNT(DISTINCT MatchID) / ?)
        FROM (
          SELECT MatchID
          FROM TeamPerformance
          WHERE TeamPerformance.teamname = ?
        ) AS SubQuery) AS maxPagination
      FROM 
        (SELECT MatchID
          FROM TeamPerformance
          WHERE TeamPerformance.teamname = ?) AS FM
      JOIN TeamPerformance TP ON TP.MatchID = FM.MatchID
      JOIN PlayerPerformance PP ON TP.MatchID = PP.MatchID AND TP.Side = PP.Side
      JOIN Matches M on TP.MatchID = M.MatchID
      GROUP BY TP.MatchID
      ORDER BY M.Match_date DESC
      LIMIT ? OFFSET ?;
    `;

    const results = await db.query(sqlQuery, [pageSize, teamname, teamname, pageSize, offset]);

    // Close the database connection
    await db.end();

    // Send the fetched match data as a response
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
