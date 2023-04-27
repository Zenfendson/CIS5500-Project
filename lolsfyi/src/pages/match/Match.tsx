import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const mockMatchProps = [
    {
        name: "Royal Never Give Up",
        score: 0,
        logo: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/eb/Royal_Never_Give_Uplogo_square.png/revision/latest/scale-to-width-down/1920?cb=20210521114222",
        players: [{
            name: "Uzi",
            position: "ADC",
            champion: "Jhin",
            kills: 1,
            deaths: 2,
            assists: 3,
            gold: 1000,
            cs: 100,
        }, {
            name: "Uzi",
            position: "ADC",
            champion: "Jhin",
            kills: 1,
            deaths: 2,
            assists: 3,
            gold: 1000,
            cs: 100,
        }, {
            name: "Uzi",
            position: "ADC",
            champion: "Jhin",
            kills: 1,
            deaths: 2,
            assists: 3,
            gold: 1000,
            cs: 100,
        }, {
            name: "Uzi",
            position: "ADC",
            champion: "Jhin",
            kills: 1,
            deaths: 2,
            assists: 3,
            gold: 1000,
            cs: 100,
        }, {
            name: "Uzi",
            position: "ADC",
            champion: "Jhin",
            kills: 1,
            deaths: 2,
            assists: 3,
            gold: 1000,
            cs: 100,
        }, ],
        date: "2021-10-10",
        bans: [
            'Zoe', 'Rumble', 'Renekton', 'Rell', 'Lucian',
        ]
    },
    {
        name: "Royal Never Give Up",
        score: 1,
        logo: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/eb/Royal_Never_Give_Uplogo_square.png/revision/latest/scale-to-width-down/1920?cb=20210521114222",
        players: [{
            name: "Uzi",
            position: "ADC",
            champion: "Jhin",
            kills: 1,
            deaths: 2,
            assists: 3,
            gold: 1000,
            cs: 100,
        }, {
            name: "Uzi",
            position: "ADC",
            champion: "Jhin",
            kills: 1,
            deaths: 2,
            assists: 3,
            gold: 1000,
            cs: 100,
        }, {
            name: "Uzi",
            position: "ADC",
            champion: "Jhin",
            kills: 1,
            deaths: 2,
            assists: 3,
            gold: 1000,
            cs: 100,
        }, {
            name: "Uzi",
            position: "ADC",
            champion: "Jhin",
            kills: 1,
            deaths: 2,
            assists: 3,
            gold: 1000,
            cs: 100,
        }, {
            name: "Uzi",
            position: "ADC",
            champion: "Jhin",
            kills: 1,
            deaths: 2,
            assists: 3,
            gold: 1000,
            cs: 100,
        }, ],
        date: "2021-10-10",
        bans: [
            'Zoe', 'Rumble', 'Renekton', 'Rell', 'Lucian',
        ]
    },
]

const Match = () => {
    const router = useRouter();
    const [match, setMatch] = useState<string | null>(null);

    useEffect(() => {
        const { match } = router.query;
        setMatch(match as string);
    }, [router.query]);

    const DualPerformance = () => {
        return (
            <Grid container xs={12} sx={{height: '100px', width: '100%', marginBottom: '20px', backgroundColor: '#cccccc'}}>
                <Grid container xs={6}>
                    <Grid item xs={3}>
                        <Box sx={{height: '100px', width: '100px', backgroundColor: 'wheat'}} />
                    </Grid>
                    <Grid item xs={4}>
                        Player: Uzi
                        KDA: 1/2/3
                        
                    </Grid>
                </Grid>
                <Grid container xs={6}>
                    
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}} paddingTop={10}>
            {match && (
                <>
                <Grid container xs={8} sx={{display: 'flex', alignItems: 'center'}}>
                    <Grid item xs={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center'}}>
                        <Image src={mockMatchProps[0]?.logo} alt={mockMatchProps[0]?.name} width={100} height={100} />
                        <Typography variant="h6">{mockMatchProps[0]?.name}</Typography>
                        <Box sx={{height: '25px', width: '200px', marginTop: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                            <Typography variant="body1" sx={{marginRight: '2px'}}>Bans:</Typography>
                            <Box sx={{height: '25px', width: '25px', marginRight: '2px', backgroundColor: 'black'}} />
                            <Box sx={{height: '25px', width: '25px', marginRight: '2px', backgroundColor: 'black'}} />
                            <Box sx={{height: '25px', width: '25px', marginRight: '2px', backgroundColor: 'black'}} />
                            <Box sx={{height: '25px', width: '25px', marginRight: '2px', backgroundColor: 'black'}} />
                            <Box sx={{height: '25px', width: '25px', marginRight: '2px', backgroundColor: 'black'}} />
                        </Box>
                    </Grid>
                    <Grid item xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                        <Typography variant="h2">{mockMatchProps[0]?.score} : {mockMatchProps[1]?.score}</Typography>
                        <Typography variant="body2" marginTop={3}>{mockMatchProps[0]?.date}</Typography>
                    </Grid>
                    <Grid item xs={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'center'}}>
                        <Image src={mockMatchProps[1]?.logo} alt={mockMatchProps[1]?.name} width={100} height={100} />
                        <Typography variant="h6">{mockMatchProps[1]?.name}</Typography>
                        <Box sx={{height: '25px', width: '200px', marginTop: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                            <Typography variant="body1" sx={{marginRight: '2px'}}>Bans:</Typography>
                            <Box sx={{height: '25px', width: '25px', marginRight: '2px', backgroundColor: 'black'}} />
                            <Box sx={{height: '25px', width: '25px', marginRight: '2px', backgroundColor: 'black'}} />
                            <Box sx={{height: '25px', width: '25px', marginRight: '2px', backgroundColor: 'black'}} />
                            <Box sx={{height: '25px', width: '25px', marginRight: '2px', backgroundColor: 'black'}} />
                            <Box sx={{height: '25px', width: '25px', marginRight: '2px', backgroundColor: 'black'}} />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container xs={8} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5vh', paddingBottom: '5vh'}}>
                    <DualPerformance />
                    <DualPerformance />
                    <DualPerformance />
                    <DualPerformance />
                    <DualPerformance />
                </Grid>
                </>
            )}
        </Grid>
    )
}

export default Match;