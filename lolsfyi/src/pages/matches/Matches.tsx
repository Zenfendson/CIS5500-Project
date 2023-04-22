import { Box, Grid } from "@mui/material";
import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import scss from "./Matches.module.scss";
import MatchCard from "@/components/MatchCard/MatchCard";

const mockMatchProps = {
    teamRed: "RNG",
    teamBlue: "EDG",
    teamRedScore: 3,
    teamBlueScore: 2,
    teamRedLogo: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/eb/Royal_Never_Give_Uplogo_square.png/revision/latest/scale-to-width-down/1920?cb=20210521114222",
    teamBlueLogo: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/56/EDward_Gaminglogo_square.png/revision/latest/scale-to-width-down/1920?cb=20211024133123",
    date: "2021-10-10",
}

const Matches = () => {

    const [league, setLeague] = React.useState('LPL');

    const handleChange = (event: SelectChangeEvent) => {
        setLeague(event.target.value);
    };

    return (
        <Box className={scss.wrapper}>
            <Box sx={{marginBottom: 5}}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: 5, position: 'sticky' }}>
                    <InputLabel id="match-league-select">Leagues</InputLabel>
                    <Select
                    labelId="match-league-select"
                    id="match-league-select"
                    value={league}
                    onChange={handleChange}
                    label="Leagues"
                    >
                    <MenuItem value="LPL">LPL</MenuItem>
                    <MenuItem value="LCK">LCK</MenuItem>
                    <MenuItem value="LCS">LCS</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Grid container gap={2} className={scss.matches}>
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
                <MatchCard {...mockMatchProps} />
            </Grid>
        </Box>
    )
}

export default Matches;
