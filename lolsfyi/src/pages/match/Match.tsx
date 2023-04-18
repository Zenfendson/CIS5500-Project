import { Box, Grid} from "@mui/material";
import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import scss from "./Match.module.scss";
import MatchCard from "@/components/MatchCard/MatchCard";

const mockMatchProps = {
    TeamRed: "RNG",
    TeamBlue: "EDG",
    TeamRedScore: 3,
    TeamBlueScore: 2,
    TeamRedLogo: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/eb/Royal_Never_Give_Uplogo_square.png/revision/latest/scale-to-width-down/1920?cb=20210521114222",
    TeamBlueLogo: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/56/EDward_Gaminglogo_square.png/revision/latest/scale-to-width-down/1920?cb=20211024133123",
    Date: "2021-10-10",
}

const Match = () => {

    const [league, setLeague] = React.useState('LPL');

    const handleChange = (event: SelectChangeEvent) => {
        setLeague(event.target.value);
    };

    return (
        <Box className={scss.wrapper}>
            <Box sx={{marginBottom: 5}}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: 5, position: 'sticky' }}>
                    <InputLabel id="demo-simple-select-standard-label">Leagues</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
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

export default Match;
