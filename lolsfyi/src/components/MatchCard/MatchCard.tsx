import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import scss from "./MatchCard.module.scss";

export type MatchProps = {
    teamRed: string;
    teamBlue: string;
    teamRedScore: number;
    teamBlueScore: number;
    teamRedLogo: string;
    teamBlueLogo: string;
    date: string;
};

const MatchCard = (matchProps : MatchProps) => {
    return (
        <Box className={scss.wrapper}>
            <Paper className={scss.card}>
                <Box className={scss.logo_with_name}>
                    <Image className={scss.logo} src={matchProps.teamRedLogo} width={50} height={50} alt={matchProps.teamRed} />
                    {matchProps.teamRed}
                </Box>
                <Typography variant="h4"> {matchProps.teamRedScore} - {matchProps.teamBlueScore} </Typography> 
                <Box className={scss.logo_with_name}>
                    <Image className={scss.logo} src={matchProps.teamBlueLogo} width={50} height={50} alt={matchProps.teamBlue} />
                    {matchProps.teamBlue}
                </Box>
            </Paper>
            <Typography variant="caption" sx={{marginTop: '10px'}}> {matchProps.date} </Typography>
        </Box>
    )
}

export default MatchCard;