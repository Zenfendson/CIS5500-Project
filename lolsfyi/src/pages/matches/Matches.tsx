import { Box, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import scss from "./Matches.module.scss";
import MatchCard from "@/components/MatchCard/MatchCard";
import { useRouter } from "next/router";

export type MatchProps = {
    MatchID: string;
    teamRed: string;
    teamBlue: string;
    teamRedScore: number;
    teamBlueScore: number;
    teamRedLogo: string | null;
    teamBlueLogo: string | null;
    date: string;
};

const Matches = () => {
    const [league, setLeague] = React.useState<string>('LPL');
    const [leagues, setLeagues] = React.useState<Object[]>([]);
    const [matches, setMatches] = React.useState<MatchProps[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);

    const handleChangeLeague = (event: SelectChangeEvent) => {
        setLeague(event.target.value);
    };

    const router = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllLeagueNames`)
              .then((response) => response.json())
              .then((json) => setLeagues(json));
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recentMatches?league=${league}&page=${page}`)
              .then((response) => response.json())
              .then((json) => setMatches(json));
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/maxpagehome?league=${league}`)
              .then((response) => response.json())
              .then((json) => setTotalPages(json));
    }, []);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recentMatches?league=${league}&page=${page}`)
              .then((response) => response.json())
              .then((json) => setMatches(json));
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/maxpagehome?league=${league}`)
              .then((response) => response.json())
              .then((json) => setTotalPages(json[0].maxPagination));
    }, [league, page]);


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
                        {
                            leagues.map((league) => <MenuItem value={league?.League}>{league?.League}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <Typography variant="body1">Blue Team</Typography>
            </Box>
            <Grid container gap={2} className={scss.matches}>
                {matches.map((match) => 
                    <div onClick={() => router.push(`/match/?match=${match.MatchID}`)}>
                        <MatchCard {...match} />
                    </div>
                )}
            </Grid>
            <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} sx={{marginTop: 5, marginBottom: 5}} />
        </Box>
    )
}

export default Matches;
