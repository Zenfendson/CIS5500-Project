import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import scss from "./MatchCard.module.scss";

export type MatchProps = {
    TeamRed: string;
    TeamBlue: string;
    TeamRedScore: number;
    TeamBlueScore: number;
    TeamRedLogo: string;
    TeamBlueLogo: string;
    Date: string;
};

const MatchCard = (matchProps : MatchProps) => {
    return (
        <Box className={scss.wrapper}>
            <Paper className={scss.card}>
                <Box className={scss.logo_with_name}>
                    <Image className={scss.logo} src={matchProps.TeamRedLogo} width={50} height={50} alt={matchProps.TeamRed} />
                    {matchProps.TeamRed}
                </Box>
                <Typography variant="h4"> {matchProps.TeamRedScore} - {matchProps.TeamBlueScore} </Typography> 
                <Box className={scss.logo_with_name}>
                    <Image className={scss.logo} src={matchProps.TeamBlueLogo} width={50} height={50} alt={matchProps.TeamBlue} />
                    {matchProps.TeamBlue}
                </Box>
            </Paper>
            <Typography variant="caption" sx={{marginTop: '10px'}}> {matchProps.Date} </Typography>
        </Box>
    )
}

export default MatchCard;