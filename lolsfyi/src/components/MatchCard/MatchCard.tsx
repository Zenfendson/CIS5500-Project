import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import scss from "./MatchCard.module.scss";
import { MatchProps } from "@/pages/matches/Matches";
import { TEAM_URL } from "@/constants";


const MatchCard = (matchProps : MatchProps) => {
    return (
        <Box className={scss.wrapper}>
            <Paper className={scss.card}>
                <Grid container xs={12}>
                    <Grid item xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image className={scss.logo} src={TEAM_URL(matchProps.teamRed)} width={50} height={50} alt={matchProps.teamRed} />
                    </Grid>
                    <Grid item xs={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography variant="body2"> {matchProps.teamRed} </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography variant="h4"> {matchProps.teamRedScore} - {matchProps.teamBlueScore} </Typography> 
                    </Grid>
                    <Grid item xs={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography variant="body2"> {matchProps.teamBlue} </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image className={scss.logo} src={TEAM_URL(matchProps.teamBlue)} width={50} height={50} alt={matchProps.teamBlue} />
                    </Grid>
                </Grid>
            </Paper>
            <Typography variant="caption" sx={{marginTop: '10px'}}> {matchProps.date} </Typography>
        </Box>
    )
}

export default MatchCard;