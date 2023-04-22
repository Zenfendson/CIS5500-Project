import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";
import scss from "./Player.module.scss";
import { styled } from '@mui/material/styles';
import PlayerCard from "@/components/PlayerCard/PlayerCard";
import PlayerMatches from "@/components/PlayerMatches/PlayerMatches";
import PlayerMatchCard from "@/components/PlayerMatchCard/PlayerMatchCard";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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
    const [league, setLeague] = React.useState('LPL');
    const [year, setYear] = React.useState('2018');

    const handleChangeLeague = (event: SelectChangeEvent) => {
        setLeague(event.target.value);
    };

    const handleChangeYear = (event: SelectChangeEvent) => {
        setYear(event.target.value);
    };

    return (
        <Box className={scss.flex_wrapper}>
            <Grid container spacing={2} sx={{width: '80vw', marginTop: '10vh'}}>
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
                                        <InputLabel id="demo-simple-select-standard-label">Filter by League</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={league}
                                        onChange={handleChangeLeague}
                                        label="Leagues"
                                        >
                                        <MenuItem value="LPL">LPL</MenuItem>
                                        <MenuItem value="LDL">LDL</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120}}>
                                        <InputLabel id="demo-simple-select-standard-label">Filter by Year</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
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
                            <Grid xs={12} overflow={'clip'} container>
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
                <Grid container sx={{marginTop: '5vh'}}/>
            </Grid>
        </Box>
    )
}

export default Player;