import { Autocomplete, Box, Divider, Grid, List, ListItem, ListItemButton, Pagination, Paper, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { CHAMPION_URL, PLACEHOLDER_PLAYER, TEAM_URL } from "@/constants";

export type TeamMember = {
    name: string;
    avatar: string;
}

const Team = () => {
    const [team, setTeam] = React.useState<string | null>(null);
    const [teams, setTeams] = React.useState<Object[]>([]);
    const [members, setMembers] = React.useState<TeamMember[]>([]);
    const [isShow, setIsShow] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const router = useRouter();

    useEffect(() => {
        const { name } = router.query;
        if (name) {
            setTeam(name as string);
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team/members?teamname=${name}`)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    if (json.members.length > 0) {
                        setIsShow(true);
                    }
                });
        }
    }, [router.query]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team/members?teamname=${team}`)
                .then((response) => response.json())
                .then((json) => setMembers(json.members));
        
    }, [isShow, page, team]);

    const handleChangeName = (event : any) => {
        if (event.type === 'click') {
            router.push(`/team?name=${event.target.textContent.toLowerCase()}`);
        }
    };

    const handleSubmitName = (event : any) => {
        if (event.key === 'Enter') {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getTeamsByName?name=${event.target.value}`)
                .then((response) => response.json())
                .then((json) => setTeams(json));
        }
    };

    const ComboBox = () => {
        return (
            <Autocomplete
            disablePortal
            id="team-auto-complete"
            options={teams.map((team) => team?.Name)}
            sx={{ width: 600 }}
            renderInput={(params) => <TextField {...params} label="Search a Team" />}
            onClose={() => setTeams([])}
            onInputChange={handleChangeName}
            onKeyDown={handleSubmitName}
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
                    <ComboBox />
                </Grid>
                {isShow && (
                    <>
                    <Grid item xs={12} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Image src={TEAM_URL(team)} width={150} height={150} alt={""} />
                        <Typography variant="h5">{team?.toUpperCase()}</Typography>
                    </Grid>
                    <Grid container overflow={'scroll'} display={'flex'} alignItems={'center'} justifyContent={'space-around'} marginTop={5}>
                            {members?.map((member) => (
                                <Grid item key={member.name} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                    <Image src={member.avatar || PLACEHOLDER_PLAYER} width={120} height={120} alt={member.name} style={{ cursor: 'pointer' }} onClick={() => (router.push(`/player?name=${member.name}`))} />
                                    <Typography variant="body1">{member.name}</Typography>
                                </Grid>
                            ))}
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