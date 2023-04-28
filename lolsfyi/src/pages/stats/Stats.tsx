import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Autocomplete } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect } from "react";
import scss from "./Stats.module.scss";

const mockPlayers = [
    'Uzi', 'Jackeylove', 'Deft', 'Rookie',
]

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

const Stats = () => {
    const [scope, setScope] = React.useState('Player');
    const [league, setLeague] = React.useState('LPL');
    const [patch, setPatch] = React.useState('1.1');
    const [name, setName] = React.useState('');
    // const [allPlayers, setAllPlayers] = React.useState([]);

    const handleChangeScope = (event: SelectChangeEvent) => {
        setScope(event.target.value);
    };

    const handleChangeLeague = (event: SelectChangeEvent) => {
        setLeague(event.target.value);
    };

    const handleChangePatch = (event: SelectChangeEvent) => {
        setPatch(event.target.value);
    };

    const handleChangeName = (event: SelectChangeEvent) => {
        setName(event.target.innerHTML);
    };

    // useEffect(() => {
    //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllPlayerNames`)
    //       .then((response) => response.json())
    //       .then((json) => setAllPlayers(json));
    // }, []);
    
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
                        <MenuItem value="LPL">LPL</MenuItem>
                        <MenuItem value="LCK">LCK</MenuItem>
                        <MenuItem value="LCS">LCS</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{marginBottom: 5}}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: 5, position: 'sticky' }}>
                        <InputLabel id="patch-label">Patch</InputLabel>
                        <Select
                        labelId="patch-label"
                        id="patch"
                        value={patch}
                        onChange={handleChangePatch}
                        label="Patch"
                        >
                        <MenuItem value="1.1">1.1</MenuItem>
                        <MenuItem value="1.2">1.2</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{marginBottom: 5}}>
                    <Autocomplete
                        freeSolo
                        id="name-autocomplete"
                        options={mockPlayers}
                        sx={{ m: 1, minWidth: 120, marginTop: 5, position: 'sticky' }}
                        renderInput={(params) => <TextField {...params} label="Name" variant="standard" />}
                        onChange={handleChangeName}
                    />
                </Box>
            </Grid>
            <Box sx={{ height: 500, width: '100%', maxWidth: '70vw' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    // checkboxSelection
                    disableSelectionOnClick
                    // experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>  
        </Box>
    )
}

export default Stats;