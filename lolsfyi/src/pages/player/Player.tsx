import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography, TextField, Autocomplete, Pagination, List } from "@mui/material";
import React, { useEffect, useState } from "react";
import scss from "./Player.module.scss";
import PlayerCard from "@/components/PlayerCard/PlayerCard";
import PlayerMatch from "@/components/PlayerMatch/PlayerMatch";
import PlayerMatchCard from "@/components/PlayerMatchCard/PlayerMatchCard";
import { useRouter } from "next/router";
import { MatchProps } from "../matches/Matches";

export type PlayerInfo = {
    name: string;
    team: string;
    avatar: string;
    league: string;
    position: string;
};

export type PlayerStats = {
    winrate: number;
    numberofwins: number;
    numberofloses: number;
    kills: number;
    deaths: number;
    assists: number;
    KDA: number;
    pentakillsrate: number;
    dpm: number;
    gpm: number;
    cspm: number;
};

export type PlayerSplits = {
    name: string;
    win_rate_2021SPRING: number;
    win_rate_2021SUMMER: number;
    win_rate_2022SPRING: number;
    win_rate_2022SUMMER: number;
    win_rate_2023SPRING: number;
}

export type Performance = {
    id : number;
    player: string;
    position: string;
    champion : string;
    championImage : string;
    kills : number;
    deaths : number;
    assists : number;
    cs : number;
    gold : number;
    damage : number;
}

const Player = () => {
    const [leagues, setLeagues] = React.useState<Object[]>([]);
    const [years, setYears] = React.useState<Object[]>([]);
    const [league, setLeague] = React.useState<string | null>(null);
    const [year, setYear] = React.useState<string | null>(null);
    const [players, setPlayers] = React.useState<Object[]>([]);
    const [player, setPlayer] = React.useState<string | null>(null);
    const [isShow, setIsShow] = React.useState<boolean>(false);
    const [playerInfo, setPlayerInfo] = React.useState<PlayerInfo | null>(null);
    const [playerStats, setPlayerStats] = React.useState<PlayerStats | null>(null);
    const [playerSplits, setPlayerSplits] = React.useState<PlayerSplits | null>(null);
    const [playerMatches, setPlayerMatches] = React.useState<MatchProps[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [pagenum, setPagenum] = React.useState<number>(1);
    const [selectedMatch, setSelectedMatch] = React.useState<string | null>(null);
    const [performances, setPerformances] = React.useState<Performance[]>([]);

    const router = useRouter();

    const handleChangeLeague = (event: SelectChangeEvent) => {
        setLeague(event.target.value);
    };

    const handleChangeYear = (event: SelectChangeEvent) => {
        setYear(event.target.value);
    };

    const handleChangeName = (event : any) => {
        if (event.type === 'click') {
            router.push(`/player?name=${event.target.textContent.toLowerCase()}`);
        }
    };

    const handleSubmitName = (event : any) => {
        if (event.key === 'Enter') {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getPlayerByName?name=${event.target.value}`)
                .then((response) => response.json())
                .then((json) => setPlayers(json));
        }
    };

    const handleSelectMatch = (event : any, matchID: string) => {
        setSelectedMatch(matchID);
    };

    useEffect(() => {
        const { name } = router.query;
        if (name) {
            setPlayer(name as string);
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/player/playerinfo?name=${name}`)
                .then((response) => response.json())
                .then((json) => {
                    if (json.length > 0) {
                        setIsShow(true);
                    }
                });
        }
    }, [router.query]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/player/playerinfo?name=${player}`)  
            .then((response) => response.json())
            .then((json) => setPlayerInfo(json[0]));
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/player/playerstats?name=${player}`)  
            .then((response) => response.json())
            .then((json) => setPlayerStats(json[0]));
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/player/playerwrbysplit?name=${player}`)
            .then((response) => response.json())
            .then((json) => setPlayerSplits(json[0]));
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/player/matches?name=${player}&page=${page}`)  
            .then((response) => response.json())
            .then((json) => {
                setPlayerMatches(json);
                setPagenum(json[0]?.maxPagination);
            });
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/player/yearoptions?name=${player}`)
            .then((response) => response.json())
            .then((json) => setYears(json.map((years : Object) => years.year)));
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/player/leagueoptions?name=${player}`)
            .then((response) => response.json())
            .then((json) => setLeagues(json.map((leagues : Object) => leagues.league)));
    }, [isShow, page, player]);

    useEffect(() => {
        if (league && year) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/player/matches?name=${player}&league=${league}&year=${year}&page=${page}`)  
            .then((response) => response.json())
            .then((json) => {
                setPlayerMatches(json);
                setPagenum(json[0]?.maxPagination);
            });
        } else if (league) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/player/matches?name=${player}&league=${league}&page=${page}`)  
            .then((response) => response.json())
            .then((json) => {
                setPlayerMatches(json);
                setPagenum(json[0]?.maxPagination);
            });
        } else if (year) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/player/matches?name=${player}&year=${year}&page=${page}`)  
            .then((response) => response.json())
            .then((json) => {
                setPlayerMatches(json);
                setPagenum(json[0]?.maxPagination);
            });
        }
    }, [league, year, page]);

    useEffect(() => {
        if (selectedMatch) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/player/inmatch?matchid=${selectedMatch}`)
                .then((response) => response.json())
                .then((json) => setPerformances(json));
        }
    }, [selectedMatch]);

    const ComboBox = () => {
        return (
            <Autocomplete
            disablePortal
            id="player-auto-complete"
            options={players.map((player) => player?.Name)}
            sx={{ width: 600 }}
            renderInput={(params) => <TextField {...params} label="Search a Player" />}
            onClose={() => setPlayers([])}
            onInputChange={handleChangeName}
            onKeyDown={handleSubmitName}
            />
        );
    }

    return (
        <Box className={scss.flex_wrapper} marginTop={5}>
            <Grid container spacing={2} sx={{width: '80vw'}}>
                <Grid item xs={12} sx={{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", marginBottom: "5vh"}}>
                    <ComboBox />
                </Grid>
                {isShow && (<>
                <Grid item xs={12}>
                    <PlayerCard playerProps={{ playerInfo, playerStats, playerSplits }} />
                </Grid>
                <Grid container sx={{marginTop: '5vh'}}>
                    <Grid item xs={12}>
                        <Paper sx={{height: '680px'}}>
                            <Grid height={80} container>
                                <Grid xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '30px', paddingTop: '10px'}}>
                                    <Typography variant="h5">Matches</Typography>
                                </Grid>
                                <Grid xs={10} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120}}>
                                        <InputLabel id="select-by-league">by League</InputLabel>
                                        <Select
                                        labelId="select-by-league"
                                        value={league}
                                        onChange={handleChangeLeague}
                                        label="Leagues"
                                        >
                                        <MenuItem value={null}>All</MenuItem>
                                        {leagues.map((league) => <MenuItem key={league} value={league}>{league}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120}}>
                                        <InputLabel id="select-by-year">by Year</InputLabel>
                                        <Select
                                        labelId="select-by-year"
                                        value={year}
                                        onChange={handleChangeYear}
                                        label="Year"
                                        >
                                        <MenuItem value={null}>All</MenuItem>
                                        {years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Divider sx={{width: '100%'}} />
                            <Grid overflow={'clip'} container>
                                <Grid xs={3.5} height={600} item>
                                    <Grid container className={scss.wrapper}>
                                        <Grid container height={550} overflow={'scroll'}>
                                            <List className={scss.list}>
                                                {playerMatches.map((match) => 
                                                   <div onClick={(event) => handleSelectMatch(event, match.MatchID)}><PlayerMatch key={match.MatchID} {...match} /></div> 
                                                )}
                                            </List>
                                        </Grid>
                                        <Grid container sx={{alignItems: 'center', justifyContent: 'center', marginBottom: '10px', height: '40px'}}>
                                            <Pagination count={pagenum} page={page} onChange={(event, value) => setPage(value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs={8.5} height={600} item>
                                    {selectedMatch ? 
                                    <PlayerMatchCard playerPerformances={performances} /> : 
                                    <Typography variant="h5" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>Select a Match</Typography>}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                </>)}
                
                <Grid container sx={{marginTop: '5vh'}}/>
            </Grid>
        </Box>
    )
}

export default Player;