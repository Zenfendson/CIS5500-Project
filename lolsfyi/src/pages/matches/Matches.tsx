import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
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
    const [matches, setMatches] = React.useState([]);
    const [page, setPage] = React.useState(1);

    const handleChangeLeague = (event: SelectChangeEvent) => {
        setLeague(event.target.value);
    };

    // useEffect(() => {
    //     setMatches([mockMatchProps, mockMatchProps, mockMatchProps, mockMatchProps, mockMatchProps]);
    //     setPage(1);
    // }, [league]);

    // const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`);
	// const data = await res.json();

    return (
        <Box className={scss.wrapper}>
            <Box sx={{marginBottom: 5, width: '50%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', position: 'sticky'}}>
                <Typography variant="body1">Red Team</Typography>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: 5 }}>
                    <InputLabel id="match-league-select">Leagues</InputLabel>
                    <Select
                    labelId="match-league-select"
                    id="match-league-select"
                    value={league}
                    onChange={handleChangeLeague}
                    label="Leagues"
                    >
                    <MenuItem value="LPL">LPL</MenuItem>
                    <MenuItem value="LCK">LCK</MenuItem>
                    <MenuItem value="LCS">LCS</MenuItem>
                    </Select>
                </FormControl>
                <Typography variant="body1">Blue Team</Typography>
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
