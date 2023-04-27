import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Pagination, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

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
    const [year, setYear] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setYear(event.target.value as string);
    };

    const TeamMatch = () => {
        return (
            <>
                <Box height={100}>Match1</Box>
                <Divider sx={{width: '100%'}}/>
            </>
        )
    };

    return (
        <Box display={'flex'} justifyContent={'center'} marginTop={5}>
            <Grid container width={'80vw'}>
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
                            onChange={handleChange}
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
                                    <Image src={member.avatar} width={120} height={120} alt={member.name} />
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
                            <TeamMatch />
                            <TeamMatch />
                            <TeamMatch />
                            <TeamMatch />
                            <TeamMatch />
                            <Pagination count={5} />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Team;