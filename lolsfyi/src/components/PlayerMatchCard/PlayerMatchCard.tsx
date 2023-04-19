import React from "react";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

const mockedMatchPerformanceRed = [
    {
        "id": 1,
        "champion": "Aatrox",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 2,
        "champion": "Aatrox",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 3,
        "champion": "Aatrox",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 4,
        "champion": "Aatrox",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 5,
        "champion": "Aatrox",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
];

const mockedMatchPerformanceBlue = [
    {
        "id": 6,
        "champion": "Aatrox",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 7,
        "champion": "Aatrox",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 8,
        "champion": "Aatrox",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 9,
        "champion": "Aatrox",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 10,
        "champion": "Aatrox",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
];

export type Performance = {
    id : number;
    champion : string;
    kills : number;
    deaths : number;
    assists : number;
    cs : number;
    gold : number;
    damage : number;
}

const PlayerMatchCard = () => {

    const PlayerPerformance = (performance : Performance) => {
        return (
            <Box sx={{ width: "100%", height: '50px', backgroundColor:'wheat' }}> 
                {performance.champion}
            </Box>
        ) 
    }

    return (
        <Stack spacing={0}>
            <Typography variant="h6">Red Team</Typography>
            {mockedMatchPerformanceRed.map((performance) => (
                <><PlayerPerformance key={performance.id} {...performance} /><Divider /></>
            ))}
            <Typography variant="h6">Blue Team</Typography>
            {mockedMatchPerformanceBlue.map((performance) => (
                <><PlayerPerformance key={performance.id} {...performance} /><Divider /></>
            ))}
        </Stack>
    );
};

export default PlayerMatchCard;