import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography, TextField, Autocomplete } from "@mui/material";
import React, { useEffect, useState } from "react";
import scss from "./Player.module.scss";
import PlayerCard from "@/components/PlayerCard/PlayerCard";
import PlayerMatches from "@/components/PlayerMatches/PlayerMatches";
import PlayerMatchCard from "@/components/PlayerMatchCard/PlayerMatchCard";
import { useRouter } from "next/router";

const mockPlayerProps = {
    name: "Uzi",
    realname: "Jian Zi-Hao",
    team: "RNG",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/89/BLG_Uzi_2022_Split_1.png/revision/latest?cb=20220109012221",
    age: 23,
    league: "LPL",
    birthdate: "1998-10-10",
    position: "ADC",
}

const Player = () => {
    const [player, setPlayer] = React.useState<string | null>(null);
    const [league, setLeague] = React.useState<string | null>(null);
    const [year, setYear] = React.useState<string | null>(null);

    const handleChangeLeague = (event: SelectChangeEvent) => {
        setLeague(event.target.value);
    };

    const handleChangeYear = (event: SelectChangeEvent) => {
        setYear(event.target.value);
    };

    const router = useRouter();

    useEffect(() => {
        const { name } = router.query;
        setPlayer(name as string);
    }, [router.query]);

    const ComboBox = () => {
        return (
            <Autocomplete
            disablePortal
            id="player-auto-complete"
            options={['Uzi', 'Faker']}
            sx={{ width: 600 }}
            renderInput={(params) => <TextField {...params} label="Player" />}
            value={player}
            onChange={(event: any, player: string | null) => {
                setPlayer(player);
                router.push(`/player?name=${player}`);
            }}
            />
        );
    }

    return (
        <Box className={scss.flex_wrapper} marginTop={5}>
            <Grid container spacing={2} sx={{width: '80vw'}}>
                <Grid item xs={12} sx={{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", marginBottom: "5vh"}}>
                    <Typography variant="h5" marginBottom={5}>Search a Player</Typography>
                    <ComboBox />
                </Grid>
                {player && (<>
                <Grid item xs={12}>
                    <PlayerCard {...mockPlayerProps} />
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
                                        <MenuItem value="LPL">LPL</MenuItem>
                                        <MenuItem value="LDL">LDL</MenuItem>
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
                                        <MenuItem value="2017">2017</MenuItem>
                                        <MenuItem value="2018">2018</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Divider sx={{width: '100%'}} />
                            <Grid overflow={'clip'} container>
                                <Grid xs={3.5} height={600} item>
                                    <PlayerMatches name={mockPlayerProps.name} league={league} year={year} />
                                </Grid>
                                <Grid xs={8.5} height={600} item>
                                    <PlayerMatchCard />
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