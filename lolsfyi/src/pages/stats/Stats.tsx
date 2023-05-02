import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Autocomplete } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from "react";
import scss from "./Stats.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

// const playerOrders = [
//     'Team', 'League', 'Position', 'Player Name', 'Win Rate', 'Wins', 'Loses',
// ]

// const teamOrders = [
//     'Team ID', 'Name', 'League', 'Team Name', 'Win Rate',
// ]

const playerCols: GridColDef[] = [
    { field: 'id', headerName: 'Player', width: 150},
    { field: 'teamname', headerName: 'Team', width: 150 },
    { field: 'league', headerName: 'League', width: 150 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'winrate', headerName: 'Win Rate', width: 150, valueFormatter: (params) => `${Math.round(params.value * 10000) / 100}%` },
    { field: 'numberofwin', headerName: 'Wins', width: 150},
    { field: 'numberofloses', headerName: 'Loses', width: 150 },
]

// const playerMap = new Map([
//     ['Team', 'teamname'],
//     ['League', 'league'],
//     ['Position', 'position'],
//     ['Player Name', 'playername'],
//     ['Win Rate', 'winrate'],
//     ['Wins', 'numberofwin'],
//     ['Loses', 'numberofloses'],
// ]);

const teamCols: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'Teamname', headerName: 'Team Name', width: 150 },
    { field: 'League', headerName: 'League', width: 150 },
    { field: 'win_rate', headerName: 'Win Rate', width: 150, valueFormatter: (params) => `${Math.round(params.value * 10000) / 100}%` },
]

// const teamMap = new Map([
//     ['Team Name', 'Teamname'],
//     ['League', 'League'],
//     ['Win Rate', 'win_rate'],
// ]);


const Stats = () => {
    const [scope, setScope] = React.useState('Player');
    const [league, setLeague] = React.useState<string | null>('LPL');
    // const [orderby, setOrderBy] = React.useState<string | null>(null);
    // const [order, setOrder] = React.useState<string | null>(null);
    const [name, setName] = React.useState<string | null>(null);
    const [input, setInput] = React.useState<string | null>(null);
    const [leagues, setLeagues] = React.useState<Object[]>([]);
    const [players, setPlayers] = React.useState<Object[]>([]);
    const [rows, setRows] = React.useState<Object[]>([]);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 10,
        page: 0,
    });
    const router = useRouter();

    const handleChangeScope = (event: SelectChangeEvent) => {
        setScope(event.target.value);
    };

    const handleChangeLeague = (event: SelectChangeEvent) => {
        setLeague(event.target.value);
    };

    // const handleChangeOrderBy = (event: SelectChangeEvent) => {
    //     setOrderBy(event.target.value);
    // };

    // const handleChangeOrder = (event: SelectChangeEvent) => {
    //     setOrder(event.target.value);
    // };

    const handleChangeName = (event : any) => {
        if (event.type === 'click') {
            setName(event.target.textContent.toLowerCase());
            setPlayers([]); 
        } else {
            console.log(event.target.value);
            setInput(event.target.value);
        }
    };

    const handleSubmitName = (event : any) => {
        if (event.key === 'Enter') {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getPlayerByName?name=${input}`)
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
        let prev = false;
        if (league) {
            url += league ? `?league=${league}` : '';
            prev = true;
        }
        // if (prev) {
        //     url += orderby ? `&orderby=${scope === 'Player' ? playerMap.get(orderby) : teamMap.get(orderby) }` : '';
        // } else if (orderby) {
        //     url += orderby ? `?orderby=${scope === 'Player' ? playerMap.get(orderby) : teamMap.get(orderby) }` : '';
        //     prev = true;
        // }
        // if (prev) {
        //     url += order ? `&order=${order === 'Ascending' ? '1' : '0'}` : '';
        // } else if (order) {
        //     url += order ? `?order=${order === 'Ascending' ? '1' : '0'}` : '';
        //     prev = true;
        // }
        if (prev) {
            url += name ? `&name=${name}` : '';
        } else if (name) {
            url += name ? `?name=${name}` : '';
            prev = true;
        }

        fetch(url)
            .then((response) => response.json())
            .then((json) => setRows(json));

    // }, [scope, league, orderby, order, name]);
    }, [scope, league, name]);
    
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
                        <MenuItem value={null}>All</MenuItem>
                        {leagues.map((league) => <MenuItem value={league?.League}>{league?.League}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
                {/* <Box sx={{marginBottom: 5}}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: 5, position: 'sticky' }}>
                        <InputLabel id="orderby-label">Order By</InputLabel>
                        <Select
                            labelId="orderby-label"
                            id="orderby"
                            value={orderby}
                            onChange={handleChangeOrderBy}
                            label="Patch"
                        >
                        <MenuItem value={null}>All</MenuItem>
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
                </Box> */}
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
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    // checkboxSelection
                    // disableSelectionOnClicks
                    // experimentalFeatures={{ newEditingApi: true }}
                    loading={rows.length === 0}
                    onCellClick={(params) => {
                        if (scope === 'Player') {
                            router.push(`/player?name=${params.row.id}`);
                        } else {
                            router.push(`/team?name=${params.row.Teamname}`);
                        }
                    }}
                />
            </Box>  
        </Box>
    )
}

export default Stats;