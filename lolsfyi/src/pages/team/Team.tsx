import { Autocomplete, Box, Divider, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, MenuItem, Pagination, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const mockMatchProps = {
    team: "RNG",
    fullname: "Royal Never Give Up",
    teamLogo: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/eb/Royal_Never_Give_Uplogo_square.png/revision/latest/scale-to-width-down/1920?cb=20210521114222",
    members: [
        {   
            name: "Uzi",
            avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/89/BLG_Uzi_2022_Split_1.png/revision/latest?cb=20220109012221",
        },
        {   
            name: "Uzi",
            avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/89/BLG_Uzi_2022_Split_1.png/revision/latest?cb=20220109012221",
        },
        {   
            name: "Uzi",
            avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/89/BLG_Uzi_2022_Split_1.png/revision/latest?cb=20220109012221",
        },
        {   
            name: "Uzi",
            avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/89/BLG_Uzi_2022_Split_1.png/revision/latest?cb=20220109012221",
        },
        {   
            name: "Uzi",
            avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/89/BLG_Uzi_2022_Split_1.png/revision/latest?cb=20220109012221",
        },
    ]
}

const Team = () => {
    const [team, setTeam] = React.useState<string | null>(null);
    const [year, setYear] = React.useState<string | null>(null);

    const router = useRouter();

    const handleChangeYear = (event: SelectChangeEvent) => {
        setYear(event.target.value as string);
    };

    useEffect(() => {
        const { name } = router.query;
        setTeam(name as string);
    }, [router.query]);

    const ComboBox = () => {
        return (
            <Autocomplete
            disablePortal
            id="team-auto-complete"
            options={['RNG', 'EDG']}
            sx={{ width: 600 }}
            renderInput={(params) => <TextField {...params} label="team" />}
            value={team}
            onChange={(event: any, team: string | null) => {
                setTeam(team);
                router.push(`/team?name=${team}`);
            }}
            />
        );
    }

    const TeamMatch = () => {
        return (
            <ListItem>
                <ListItemButton sx={{display: 'flex', flexDirection: 'column'}}>
                    <Grid container height={80} minWidth={1000}>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{height: '80px', width: '80px', backgroundColor: 'wheat'}}/>
                        </Grid>
                        <Grid item xs={4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{display: 'flex'}}>
                                <Box sx={{height: '35px', width: '35px', backgroundColor: 'wheat', marginLeft: '2.5px', marginRight: '2.5px'}}/>
                                <Box sx={{height: '35px', width: '35px', backgroundColor: 'wheat', marginLeft: '2.5px', marginRight: '2.5px'}}/>
                                <Box sx={{height: '35px', width: '35px', backgroundColor: 'wheat', marginLeft: '2.5px', marginRight: '2.5px'}}/>
                                <Box sx={{height: '35px', width: '35px', backgroundColor: 'wheat', marginLeft: '2.5px', marginRight: '2.5px'}}/>
                                <Box sx={{height: '35px', width: '35px', backgroundColor: 'wheat', marginLeft: '2.5px', marginRight: '2.5px'}}/>
                            </Box>
                            <Typography variant="body1">KDA: 10/10/10</Typography>
                            <Typography variant="body1">KDA: 10/10/10</Typography>
                        </Grid>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography variant="h6">Win</Typography>
                        </Grid>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography variant="h6">Lose</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{display: 'flex'}}>
                                <Box sx={{height: '35px', width: '35px', backgroundColor: 'wheat', marginLeft: '2.5px', marginRight: '2.5px'}}/>
                                <Box sx={{height: '35px', width: '35px', backgroundColor: 'wheat', marginLeft: '2.5px', marginRight: '2.5px'}}/>
                                <Box sx={{height: '35px', width: '35px', backgroundColor: 'wheat', marginLeft: '2.5px', marginRight: '2.5px'}}/>
                                <Box sx={{height: '35px', width: '35px', backgroundColor: 'wheat', marginLeft: '2.5px', marginRight: '2.5px'}}/>
                                <Box sx={{height: '35px', width: '35px', backgroundColor: 'wheat', marginLeft: '2.5px', marginRight: '2.5px'}}/>
                            </Box>
                            <Typography variant="body1">KDA: 10/10/10</Typography>
                            <Typography variant="body1">KDA: 10/10/10</Typography>
                        </Grid>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{height: '80px', width: '80px', backgroundColor: 'wheat'}}/>
                        </Grid>
                    </Grid>
                    <Typography variant="body2"> 01/01 </Typography>
                </ListItemButton>
            </ListItem> 
        )
    };

    return (
        <Box display={'flex'} justifyContent={'center'} marginTop={5}>
            <Grid container width={'80vw'}>
                <Grid item xs={12} sx={{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", marginBottom: "5vh"}}>
                    <Typography variant="h5" marginBottom={5}>Search a Team</Typography>
                    <ComboBox />
                </Grid>
                {team && (
                    <>
                    <Grid item xs={12} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Image src={mockMatchProps.teamLogo} width={150} height={150} alt={""} />
                        <Typography variant="body1">{mockMatchProps.fullname}</Typography>
                        <Typography variant="h5">{mockMatchProps.team}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ maxWidth: 120 }}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="team-year-select">Year</InputLabel>
                                <Select
                                labelId="team-year-select"
                                id="teamyeare-select"
                                value={year}
                                label="Year"
                                onChange={handleChangeYear}
                                >
                                <MenuItem value={10}>2023</MenuItem>
                                <MenuItem value={20}>2022</MenuItem>
                                <MenuItem value={30}>2021</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid container marginTop={5}>
                            {mockMatchProps.members.map((member) => {
                                return (
                                    <Grid item xs={2.4} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <Image src={member.avatar} width={120} height={120} alt={member.name} onClick={() => (router.push(`/player?name=${member.name}`))}/>
                                        <Typography variant="body1">{member.name}</Typography>
                                    </Grid>
                                )
                            })}
                    </Grid>
                    <Grid container marginTop={5}>
                        <Grid item xs={12} height={680} paddingBottom={5}>
                            <Paper sx={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', paddingBottom: '10px'}}>
                                <Box sx={{display: 'flex', width: '100%', height: '40px', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Typography variant="h6" paddingLeft={3}>Red Team</Typography>
                                    <Typography variant="h6" paddingRight={3}>Blue Team</Typography>
                                </Box>
                                <Divider sx={{width: '100%'}}/>
                                <List>
                                    <TeamMatch />
                                    <TeamMatch />
                                    <TeamMatch />
                                    <TeamMatch />
                                </List>
                                <Pagination count={5} />
                            </Paper>
                        </Grid>
                    </Grid>
                    </>
                )}

            </Grid>
        </Box>
    )
}

export default Team;