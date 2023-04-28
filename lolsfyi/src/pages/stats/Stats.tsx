import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Autocomplete } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect } from "react";
import scss from "./Stats.module.scss";

const playerOrders = [
    'Team', 'League', 'Position', 'Player Name', 'Win Rate', 'Wins', 'Loses',
]

const teamOrders = [
    'Team ID', 'Name', 'League', 'Team Name', 'Win Rate',
]

const playerCols: GridColDef[] = [
    { field: 'teamname', headerName: 'Team', width: 150 },
    { field: 'league', headerName: 'League', width: 150 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'playername', headerName: 'Player Name', width: 150 },
    { field: 'winrate', headerName: 'Win Rate', width: 150 },
    { field: 'numberofwin', headerName: 'Wins', width: 150 },
    { field: 'numberofloses', headerName: 'Loses', width: 150 },
]

const playerMap = new Map([
    ['Team', 'teamname'],
    ['League', 'league'],
    ['Position', 'position'],
    ['Player Name', 'playername'],
    ['Win Rate', 'winrate'],
    ['Wins', 'numberofwin'],
    ['Loses', 'numberofloses'],
]);

const teamCols: GridColDef[] = [
    { field: 'Teamname', headerName: 'Team Name', width: 150 },
    { field: 'League', headerName: 'League', width: 150 },
    { field: 'win_rate', headerName: 'Win Rate', width: 150 },
]

const teamMap = new Map([
    ['Team Name', 'Teamname'],
    ['League', 'League'],
    ['Win Rate', 'win_rate'],
]);


const Stats = () => {
    const [scope, setScope] = React.useState('Player');
    const [league, setLeague] = React.useState<string | null>(null);
    const [orderby, setOrderBy] = React.useState<string | null>(null);
    const [order, setOrder] = React.useState<string | null>(null);
    const [name, setName] = React.useState<string | null>(null);
    const [leagues, setLeagues] = React.useState<Object[]>([]);
    const [players, setPlayers] = React.useState<Object[]>([]);
    const [rows, setRows] = React.useState<Object[]>([]);

    const handleChangeScope = (event: SelectChangeEvent) => {
        setScope(event.target.value);
    };

    const handleChangeLeague = (event: SelectChangeEvent) => {
        setLeague(event.target.value);
    };

    const handleChangeOrderBy = (event: SelectChangeEvent) => {
        setOrderBy(event.target.value);
    };

    const handleChangeOrder = (event: SelectChangeEvent) => {
        setOrder(event.target.value);
    };

    const handleChangeName = (event : any) => {
        setName(event.target.value);
        setPlayers([]);
    };

    const handleSubmitName = (event : any) => {
        if (event.key === 'Enter') {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getPlayerByName?name=${name}`)
                .then((response) => response.json())
                .then((json) => setPlayers(json));
        }
    };

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllLeagueNames`)
            .then((response) => response.json())
            .then((json) => setLeagues(json));
    }, []);

    useEffect(() => {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api`;
        url += scope === 'Player' ? '/getPlayerList' : '/getTeamList';
        url += league ? `?league=${league}` : '';
        url += orderby ? `&orderby=${scope === 'Player' ? playerMap.get(orderby) : teamMap.get(orderby) }` : '';
        url += order ? `&order=${order === 'Ascending' ? '1' : '0'}` : '';

        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((json) => console.log(json));
    });
    
    return (
        <Box className={scss.wrapper}>
            <Grid container gap={2} className={scss.inputs}>
                <Box sx={{marginBottom: 5}}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: 5, position: 'sticky' }}>
                        <InputLabel id="player-team-label">Player/Team</InputLabel>
                        <Select
                            labelId="player-team-label"
                            id="player-team"
                            value={scope}
                            onChange={handleChangeScope}
                            label="Player/Team"
                        >
                        <MenuItem value="Player">Player</MenuItem>
                        <MenuItem value="Team">Team</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{marginBottom: 5}}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: 5, position: 'sticky' }}>
                        <InputLabel id="leagues-label">Leagues</InputLabel>
                        <Select
                            labelId="leagues-label"
                            id="leagues"
                            value={league}
                            onChange={handleChangeLeague}
                            label="League"
                        >
                        {leagues.map((league) => <MenuItem value={league?.League}>{league?.League}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{marginBottom: 5}}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: 5, position: 'sticky' }}>
                        <InputLabel id="orderby-label">Order By</InputLabel>
                        <Select
                            labelId="orderby-label"
                            id="orderby"
                            value={orderby}
                            onChange={handleChangeOrderBy}
                            label="Patch"
                        >
                        {scope === 'Player' ? playerOrders.map((order) => <MenuItem value={order}>{order}</MenuItem>) : teamOrders.map((order) => <MenuItem value={order}>{order}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{marginBottom: 5}}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: 5, position: 'sticky' }}>
                        <InputLabel id="order-label">Order</InputLabel>
                        <Select
                            labelId="order-label"
                            id="order"
                            value={order}
                            onChange={handleChangeOrder}
                            label="Patch"
                        >
                        <MenuItem value="Ascending">Ascending</MenuItem>
                        <MenuItem value="Descending">Descending</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{marginBottom: 5}}>
                    <Autocomplete
                        freeSolo
                        id="name-autocomplete"
                        options={players.map((player) => player?.Name)}
                        sx={{ m: 1, minWidth: 120, marginTop: 5, position: 'sticky' }}
                        renderInput={(params) => <TextField {...params} label="Name" variant="standard" />}
                        onInputChange={handleChangeName}
                        onKeyDown={handleSubmitName}
                    />
                </Box>
            </Grid>
            <Box sx={{ height: 500, width: '100%', maxWidth: '70vw' }}>
                <DataGrid
                    rows={rows}
                    columns={scope === 'Player' ? playerCols : teamCols}
                    paginationModel={{ page: 0, pageSize: 20 }}
                    // checkboxSelection
                    disableSelectionOnClick
                    // experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>  
        </Box>
    )
}

export default Stats;