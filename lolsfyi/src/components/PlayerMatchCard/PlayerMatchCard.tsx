import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { Performance } from "@/pages/player/Player";
import { PLACEHOLDER_CHAMPION, CHAMPION_URL } from "@/constants";

const mockedMatchPerformanceRed = [
    {
        "id": 1,
        "player": "Uzi",
        "position": "ADC",
        "champion": "Kai'Sa",
        "championImage": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/49/Kai%27SaSquare.png/",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 2,
        "player": "Uzi",
        "position": "ADC",
        "champion": "Kai'Sa",
        "championImage": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/49/Kai%27SaSquare.png/",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 3,
        "player": "Uzi",
        "position": "ADC",
        "champion": "Kai'Sa",
        "championImage": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/49/Kai%27SaSquare.png/",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 4,
        "player": "Uzi",
        "position": "ADC",
        "champion": "Kai'Sa",
        "championImage": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/49/Kai%27SaSquare.png/",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 5,
        "player": "Uzi",
        "position": "ADC",
        "champion": "Kai'Sa",
        "championImage": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/49/Kai%27SaSquare.png/",
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
        "player": "Uzi",
        "position": "ADC",
        "champion": "Kai'Sa",
        "championImage": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/49/Kai%27SaSquare.png/",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 7,
        "player": "Uzi",
        "position": "ADC",
        "champion": "Kai'Sa",
        "championImage": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/49/Kai%27SaSquare.png/",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 8,
        "player": "Uzi",
        "position": "ADC",
        "champion": "Kai'Sa",
        "championImage": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/49/Kai%27SaSquare.png/",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 9,
        "player": "Uzi",
        "position": "ADC",
        "champion": "Kai'Sa",
        "championImage": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/49/Kai%27SaSquare.png/",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
    {
        "id": 10,
        "player": "Uzi",
        "position": "ADC",
        "champion": "Kai'Sa",
        "championImage": "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/49/Kai%27SaSquare.png/",
        "kills": 3,
        "deaths": 0,
        "assists": 0,
        "cs": 0,
        "gold": 0,
        "damage": 0
    },
];

const PlayerMatchCard = ( playerPerformances : Performance[] ) => {

    const performances = playerPerformances?.playerPerformances; 
    const redPerformance : Performance[] = performances.slice(0, 5);
    const bluePerformance : Performance[] = performances.slice(5, 10);

    const PlayerPerformanceRed = (performance : Performance) => {
        return (
            <Box sx={{ width: "100%", height: '96px', display: "flex", justifyContent: "center" }}>
                <Box sx={{ width: "100%", height: '64px', display: "flex" }}> 
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "5px"}}>
                        <Image src={CHAMPION_URL(performance.champion)} alt={performance.champion} width={64} height={64} />
                        <Typography variant="body1">{performance.player}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", marginLeft: "5px"}}>
                        <Typography variant="body2"><b>Champ:</b> {performance.champion}</Typography>
                        <Typography variant="body2"><b>Pos:</b> {performance.position}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", marginLeft: "5px"}}>
                        <Typography variant="body2"><b>KDA:</b> {performance.kills} / {performance.deaths} / {performance.kills}</Typography>
                        <Typography variant="body2"><b>CS:</b> {performance.cs}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", marginLeft: "5px"}}>
                        <Typography variant="body2"><b>Gold:</b> {performance.gold}</Typography>
                        <Typography variant="body2"><b>Damage:</b> {performance.damage}</Typography>
                    </Box>
                </Box>
            </Box>
        ) 
    }

    const PlayerPerformanceBlue = (performance : Performance) => {
        return (
            <Box sx={{ width: "100%", height: '96px', display: "flex", justifyContent: "center" }}>
                <Box sx={{ width: "100%", height: '64px', display: "flex" }}> 
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", marginLeft: "5px"}}>
                        <Typography variant="body2"><b>Gold:</b> {performance.gold}</Typography>
                        <Typography variant="body2"><b>Damage:</b> {performance.damage}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", marginLeft: "5px"}}>
                        <Typography variant="body2"><b>KDA:</b> {performance.kills} / {performance.deaths} / {performance.kills}</Typography>
                        <Typography variant="body2"><b>CS:</b> {performance.cs}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", marginLeft: "5px"}}>
                        <Typography variant="body2"><b>Champ:</b> {performance.champion}</Typography>
                        <Typography variant="body2"><b>Pos:</b> {performance.position}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "5px"}}>
                        <Image src={CHAMPION_URL(performance.champion)} alt={performance.champion} width={64} height={64} />
                        <Typography variant="body1">{performance.player}</Typography>
                    </Box>
                </Box>
            </Box>
        ) 
    }

    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "20px 20px 20px 20px" }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start"}}>
                <Typography variant="h6" sx={{marginBottom: "10px"}}>Red Team</Typography>
                {redPerformance?.map((performance) => (
                    <PlayerPerformanceRed key={performance.id} {...performance} />
                ))}
            </Box>
            
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end"}}>
                <Typography variant="h6" sx={{marginBottom: "10px"}}>Blue Team</Typography>
                {bluePerformance?.map((performance) => (
                    <PlayerPerformanceBlue key={performance.id} {...performance} />
                ))}
            </Box>
        </Box>
    );
};

export default PlayerMatchCard;