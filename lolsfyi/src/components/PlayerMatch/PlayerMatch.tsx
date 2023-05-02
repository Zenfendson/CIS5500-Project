import { Box, Paper, Typography, List, ListItem, ListItemButton, Grid } from "@mui/material";
import React from "react";
import scss from "./PlayerMatch.module.scss";
import Image from "next/image";
import { MatchProps } from "@/pages/matches/Matches";
import { TEAM_URL } from "@/constants";

const PlayerMatches = (match : MatchProps) => {

    return (
        <ListItem key={match.MatchID}>
            <ListItemButton sx={{display: 'flex', flexDirection: 'column', minWidth: '320px'}}>
                <Paper className={scss.card}>
                    <Grid container xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Grid item xs={5}>
                            <Box className={scss.side}>
                                <Image src={TEAM_URL(match?.teamRed)} width={50} height={50} alt={match.teamRed} />
                                <Typography variant="caption"> {match.teamRed} </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h6"> {match.teamRedScore} - {match.teamBlueScore} </Typography> 
                        </Grid>
                        <Grid item xs={5}>
                            <Box className={scss.side}>
                                <Image src={TEAM_URL(match?.teamBlue)} width={50} height={50} alt={match.teamBlue} />
                                <Typography variant="caption"> {match.teamBlue} </Typography>
                            </Box> 
                        </Grid>
                    </Grid>
                </Paper>
                <Typography variant="body2"> {match.date} </Typography>
            </ListItemButton>
        </ListItem>  
    );
};

export default PlayerMatches;