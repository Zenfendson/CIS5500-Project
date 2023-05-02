import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db'; // Import your serverless-mysql instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the teamname query parameter
  const { teamname } = req.query;

  // Validate the query parameter
  if (!teamname) {
    return res.status(400).json({ error: 'The teamname query parameter is required' });
  }

  try {
    // Fetch the team members of the specified team
    const sqlQuery = `
      SELECT Name as name
      FROM Players
      WHERE Teamname = ?;
    `;

    const members: { name: string }[] = await db.query(sqlQuery, [teamname]);

    // Close the database connection
    await db.end();

    // Create the response object based on TeamProps
    const teamProps = {
      team: teamname,
      teamLogo: null,
      members: members.map(member => ({
        name: member.name,
        avatar: null,
      })),
    };

    // Send the fetched team data as a response
    res.status(200).json(teamProps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
}
