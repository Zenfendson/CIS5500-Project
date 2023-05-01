import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TEAM_URL, CHAMPION_URL } from "@/constants";

export type MatchDetail = {
    teamname: string,
    ban1: string,
    ban2: string,
    ban3: string,
    ban4: string,
    ban5: string,
    kills: number,
    deaths: number,
    assists: number,
    dragons: number,
    barons: number,
    firstblood: boolean,
    firsttower: boolean,
    firstdragon: boolean,
    damagetochampions: number,
    totalgold: number,
    visionscore: number,
    date: string,
    gamelength: number,
    winside: string,
}

export type PlayerDetail = {
    name: string,
    position: string,
    champion: string,
    kills: number,
    deaths: number,
    assists: number,
    KDA: number,
    firstbloodvictim: boolean,
    damagetochampions: number,
    total_cs: number,
    totalgold: number,
    visionscore: number,
}

const Match = () => {

    const router = useRouter();
    const { matchID } = router.query;
    const [matchDetailRed, setMatchDetailRed] = useState<MatchDetail | null>(null);
    const [matchDetailBlue, setMatchDetailBlue] = useState<MatchDetail | null>(null);
    const [playerDetailRed, setPlayerDetailRed] = useState<PlayerDetail[] | null>(null);
    const [playerDetailBlue, setPlayerDetailBlue] = useState<PlayerDetail[] | null>(null);


    useEffect(() => {
        if (!matchID) return;
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/match/matchdetail?matchid=${matchID}&side=Red`)
                .then((response) => response.json())
                .then((json) => setMatchDetailRed(json?.[0]));
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/match/matchdetail?matchid=${matchID}&side=Blue`)
                .then((response) => response.json())
                .then((json) => setMatchDetailBlue(json?.[0]));
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/match/playerdetail?matchid=${matchID}&side=Red`)
                .then((response) => response.json())
                .then((json) => setPlayerDetailRed(json));
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/match/playerdetail?matchid=${matchID}&side=Blue`)
                .then((response) => response.json())
                .then((json) => setPlayerDetailBlue(json));
    }, [matchID]);

    const DualPerformance = (performances: Object) => {
        const {redPerformance, bluePerformance} = performances;
        return (
            <Grid container xs={12} sx={{height: '100px', width: '100%', marginBottom: '20px'}}>
                <Grid container xs={5.5}>
                    <Grid item xs={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Image src={CHAMPION_URL(redPerformance?.champion)} alt={redPerformance?.champion} width={100} height={100} />
                    </Grid>
                    <Grid container xs={9} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Grid container xs={12} sx={{display: 'flex', alignItems: 'flex-start'}}>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Player</b></Typography>
                                <Typography variant="caption">{redPerformance?.name}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Kills</b></Typography>
                                <Typography variant="caption">{redPerformance?.kills}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Deaths</b></Typography>
                                <Typography variant="caption">{redPerformance?.deaths}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Assists</b></Typography>
                                <Typography variant="caption">{redPerformance?.assists}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>KDA</b></Typography>
                                <Typography variant="caption">{redPerformance?.KDA}</Typography>
                            </Grid>
                        </Grid>
                        
                        <Grid container xs={12} sx={{display: 'flex', alignItems: 'flex-start'}}>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Position</b></Typography>
                                <Typography variant="caption">{redPerformance?.position}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>DMG</b></Typography>
                                <Typography variant="caption">{redPerformance?.damagetochampions}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>CS</b></Typography>
                                <Typography variant="caption">{redPerformance?.total_cs}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Gold</b></Typography>
                                <Typography variant="caption">{redPerformance?.totalgold}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Vision</b></Typography>
                                <Typography variant="caption">{redPerformance?.visionscore}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography variant="h6" >
                        VS
                    </Typography>
                </Grid>
                <Grid container xs={5.5}>
                    <Grid container xs={9} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Grid container xs={12} sx={{display: 'flex', alignItems: 'flex-start'}}>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Player</b></Typography>
                                <Typography variant="caption">{bluePerformance?.name}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Kills</b></Typography>
                                <Typography variant="caption">{bluePerformance?.kills}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Deaths</b></Typography>
                                <Typography variant="caption">{bluePerformance?.deaths}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Assists</b></Typography>
                                <Typography variant="caption">{bluePerformance?.assists}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>KDA</b></Typography>
                                <Typography variant="caption">{bluePerformance?.KDA}</Typography>
                            </Grid>
                        </Grid>
                        
                        <Grid container xs={12} sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Position</b></Typography>
                                <Typography variant="caption">{bluePerformance?.position}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>DMG</b></Typography>
                                <Typography variant="caption">{bluePerformance?.damagetochampions}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>CS</b></Typography>
                                <Typography variant="caption">{bluePerformance?.total_cs}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Gold</b></Typography>
                                <Typography variant="caption">{bluePerformance?.totalgold}</Typography>
                            </Grid>
                            <Grid item xs={2.4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Typography variant="caption"><b>Vision</b></Typography>
                                <Typography variant="caption">{bluePerformance?.visionscore}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} sx={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <Image src={CHAMPION_URL(bluePerformance?.champion)} alt={bluePerformance?.champion} width={100} height={100} />
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}} paddingTop={10}>
            {(matchDetailRed && matchDetailBlue && playerDetailRed?.length !== 0 && playerDetailBlue?.length !== 0) ? (
                <>
                <Grid container xs={8} sx={{display: 'flex', alignItems: 'center'}}>
                    <Grid item xs={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center'}}>
                        <Image src={TEAM_URL(matchDetailRed?.teamname)} alt={matchDetailRed?.teamname} width={100} height={100} />
                        <Typography variant="h6">{matchDetailRed?.teamname}</Typography>
                        <Box sx={{height: '25px', width: '200px', marginTop: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                            <Typography variant="body1" sx={{marginRight: '2px'}}>Bans:</Typography>
                            <Image src={CHAMPION_URL(matchDetailRed?.ban1)} alt={matchDetailRed?.ban1} width={25} height={25} />
                            <Image src={CHAMPION_URL(matchDetailRed?.ban2)} alt={matchDetailRed?.ban2} width={25} height={25} />
                            <Image src={CHAMPION_URL(matchDetailRed?.ban3)} alt={matchDetailRed?.ban3} width={25} height={25} />
                            <Image src={CHAMPION_URL(matchDetailRed?.ban4)} alt={matchDetailRed?.ban4} width={25} height={25} />
                            <Image src={CHAMPION_URL(matchDetailRed?.ban5)} alt={matchDetailRed?.ban5} width={25} height={25} />
                        </Box>
                    </Grid>
                    <Grid item xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                        <Typography variant="h2">
                            {matchDetailRed?.winside === 'Red' ? 1 : 0} : {matchDetailBlue?.winside == 'Blue' ? 1 : 0}
                        </Typography>
                        <Typography variant="body2" marginTop={3}>{matchDetailRed?.date}</Typography>
                    </Grid>
                    <Grid item xs={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'center'}}>
                        <Image src={TEAM_URL(matchDetailBlue?.teamname)} alt={matchDetailBlue?.teamname} width={100} height={100} />
                        <Typography variant="h6">{matchDetailBlue?.teamname}</Typography>
                        <Box sx={{height: '25px', width: '200px', marginTop: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                            <Typography variant="body1" sx={{marginRight: '2px'}}>Bans:</Typography>
                            <Image src={CHAMPION_URL(matchDetailBlue?.ban1)} alt={matchDetailBlue?.ban1} width={25} height={25} />
                            <Image src={CHAMPION_URL(matchDetailBlue?.ban2)} alt={matchDetailBlue?.ban2} width={25} height={25} />
                            <Image src={CHAMPION_URL(matchDetailBlue?.ban3)} alt={matchDetailBlue?.ban3} width={25} height={25} />
                            <Image src={CHAMPION_URL(matchDetailBlue?.ban4)} alt={matchDetailBlue?.ban4} width={25} height={25} />
                            <Image src={CHAMPION_URL(matchDetailBlue?.ban5)} alt={matchDetailBlue?.ban5} width={25} height={25} />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container xs={8} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5vh', paddingBottom: '5vh'}}>
                    <DualPerformance redPerformance={playerDetailRed?.[0]} bluePerformance={playerDetailBlue?.[0]} />
                    <DualPerformance redPerformance={playerDetailRed?.[1]} bluePerformance={playerDetailBlue?.[1]} />
                    <DualPerformance redPerformance={playerDetailRed?.[2]} bluePerformance={playerDetailBlue?.[2]} />
                    <DualPerformance redPerformance={playerDetailRed?.[3]} bluePerformance={playerDetailBlue?.[3]} />
                    <DualPerformance redPerformance={playerDetailRed?.[4]} bluePerformance={playerDetailBlue?.[4]} />
                </Grid>
                </>
            )
            : 
            <Typography variant="h5">No Such Match</Typography>}
        </Grid>
    )
}

export default Match;