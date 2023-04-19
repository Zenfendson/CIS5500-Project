import { Box, Paper, Typography, List, ListItem, ListItemButton, Pagination, Grid } from "@mui/material";
import React from "react";
import scss from "./PlayerMatches.module.scss";
import Image from "next/image";

export type PlayerMatchesProps = {
    name: string;
    league: string;
    year: string;
};

const mockedMatches = [
    {
        "id": 1,
        "teamRed": "RNG",
        "teamBlue": "EDG",
        "teamRedScore": 3,
        "teamBlueScore": 0,
        "teamRedLogo": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/eb/Royal_Never_Give_Uplogo_square.png/revision/latest/scale-to-width-down/1920?cb=20210521114222",
        "teamBlueLogo": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/56/EDward_Gaminglogo_square.png/revision/latest/scale-to-width-down/1920?cb=20211024133123",
        "date": "2021-08-01"
    },
    {
        "id": 2,
        "teamRed": "RNG",
        "teamBlue": "EDG",
        "teamRedScore": 3,
        "teamBlueScore": 0,
        "teamRedLogo": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/eb/Royal_Never_Give_Uplogo_square.png/revision/latest/scale-to-width-down/1920?cb=20210521114222",
        "teamBlueLogo": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/56/EDward_Gaminglogo_square.png/revision/latest/scale-to-width-down/1920?cb=20211024133123",
        "date": "2021-08-01"
    },
    {
        "id": 3,
        "teamRed": "RNG",
        "teamBlue": "EDG",
        "teamRedScore": 3,
        "teamBlueScore": 0,
        "teamRedLogo": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/eb/Royal_Never_Give_Uplogo_square.png/revision/latest/scale-to-width-down/1920?cb=20210521114222",
        "teamBlueLogo": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/56/EDward_Gaminglogo_square.png/revision/latest/scale-to-width-down/1920?cb=20211024133123",
        "date": "2021-08-01"
    },
    {
        "id": 4,
        "teamRed": "RNG",
        "teamBlue": "EDG",
        "teamRedScore": 3,
        "teamBlueScore": 0,
        "teamRedLogo": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/eb/Royal_Never_Give_Uplogo_square.png/revision/latest/scale-to-width-down/1920?cb=20210521114222",
        "teamBlueLogo": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/56/EDward_Gaminglogo_square.png/revision/latest/scale-to-width-down/1920?cb=20211024133123",
        "date": "2021-08-01"
    },
    {
        "id": 5,
        "teamRed": "RNG",
        "teamBlue": "EDG",
        "teamRedScore": 3,
        "teamBlueScore": 0,
        "teamRedLogo": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/eb/Royal_Never_Give_Uplogo_square.png/revision/latest/scale-to-width-down/1920?cb=20210521114222",
        "teamBlueLogo": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/56/EDward_Gaminglogo_square.png/revision/latest/scale-to-width-down/1920?cb=20211024133123",
        "date": "2021-08-01"
    }
]

const PlayerMatches = (playerMatchesProps : PlayerMatchesProps) => {
    return (
        <Grid container className={scss.wrapper}>
            <Grid container height={550} overflow={'scroll'}>
                <List className={scss.list}>
                    {mockedMatches.map((match) => (
                        <ListItem key={match.id}>
                            <ListItemButton sx={{display: 'flex', flexDirection: 'column', minWidth: '320px'}}>
                                <Paper className={scss.card}>
                                    <Box className={scss.side}>
                                        <Image src={match.teamRedLogo} width={50} height={50} alt={match.teamRed} />
                                        {match.teamRed}
                                    </Box>
                                    <Typography variant="h6"> {match.teamRedScore} - {match.teamBlueScore} </Typography> 
                                    <Box className={scss.side}>
                                        <Image src={match.teamBlueLogo} width={50} height={50} alt={match.teamBlue} />
                                        {match.teamBlue}
                                    </Box>
                                </Paper>
                                <Typography variant="body2"> {match.date} </Typography>
                            </ListItemButton>
                        </ListItem>
                        
                    ))}
                </List>
            </Grid>
            <Grid container sx={{alignItems: 'center', justifyContent: 'center', marginBottom: '10px', height: '40px'}}>
                <Pagination count={8} siblingCount={0} boundaryCount={1} />
            </Grid>
        </Grid>
    );
};

export default PlayerMatches;