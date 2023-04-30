import { Autocomplete, Box, Divider, Grid, List, ListItem, ListItemButton, Pagination, Paper, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { CHAMPION_URL, PLACEHOLDER_PLAYER, TEAM_URL } from "@/constants";

export type TeamMember = {
    name: string;
    avatar: string;
}

export type TwoTeamPerformance = {
    MatchID: string;
    red_teamname: string;
    red_ban1: string;
    red_ban2: string;
    red_ban3: string;
    red_ban4: string;
    red_ban5: string;
    red_result: number;
    blue_teamname: string;
    blue_ban1: string;
    blue_ban2: string;
    blue_ban3: string;
    blue_ban4: string;
    blue_ban5: string;
    blue_result: number;
    red_champions: string;
    blue_champions: string;
    date: string;
    red_kills: string;
    red_deaths: string;
    red_assists: string;
    red_totalgold: string;
    red_dragons: string;
    blue_kills: string;
    blue_deaths: string;
    blue_assists: string;
    blue_totalgold: string;
    blue_dragons: string;
}

const Team = () => {
    const [team, setTeam] = React.useState<string | null>(null);
    const [teams, setTeams] = React.useState<Object[]>([]);
    const [members, setMembers] = React.useState<TeamMember[]>([]);
    const [isShow, setIsShow] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [matches, setMatches] = React.useState<TwoTeamPerformance[]>([]);
    const router = useRouter();

    useEffect(() => {
        const { name } = router.query;
        if (name) {
            setTeam(name as string);
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team/members?teamname=${name}`)
                .then((response) => response.json())
                .then((json) => {
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
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team/recentmatches?teamname=${team}&page=${page}`)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    setMatches(json);
                    setTotalPages(json[0]?.maxPagination);
                });
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

    const handleSelectMatch = (event : any, matchID: string) => {
        router.push(`/match?matchID=${matchID}`);
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

    const TeamMatch = ( twoTeamPerformance : TwoTeamPerformance ) => {
        const redPicks = twoTeamPerformance.red_champions.split(',');
        const bluePicks = twoTeamPerformance.blue_champions.split(',');
        return (
            <ListItem>
                <ListItemButton sx={{display: 'flex', flexDirection: 'column'}} onClick={(event) => handleSelectMatch(event, twoTeamPerformance.MatchID)}>
                    <Grid container height={80} minWidth={1000}>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{height: '80px', width: '80px'}}>
                                <Image src={TEAM_URL(twoTeamPerformance.red_teamname)} width={80} height={80} alt={twoTeamPerformance.red_teamname} />
                            </Box>
                        </Grid>
                        <Grid item xs={4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Typography variant="body1">Bans: </Typography>
                                <Image src={CHAMPION_URL(twoTeamPerformance.red_ban1)} width={30} height={30} alt={twoTeamPerformance.red_ban1} />
                                <Image src={CHAMPION_URL(twoTeamPerformance.red_ban2)} width={30} height={30} alt={twoTeamPerformance.red_ban2} />
                                <Image src={CHAMPION_URL(twoTeamPerformance.red_ban3)} width={30} height={30} alt={twoTeamPerformance.red_ban3} />
                                <Image src={CHAMPION_URL(twoTeamPerformance.red_ban4)} width={30} height={30} alt={twoTeamPerformance.red_ban4} />
                                <Image src={CHAMPION_URL(twoTeamPerformance.red_ban5)} width={30} height={30} alt={twoTeamPerformance.red_ban5} />
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', marginTop: '2px'}}>
                                <Typography variant="body1">Picks: </Typography>
                                {redPicks.map((pick) => (<Image key={pick} src={CHAMPION_URL(pick)} width={30} height={30} alt={pick} />))}
                            </Box>
                            <Typography variant="caption" sx={{display: 'flex', alignItems: 'center', marginTop: '2px'}}>
                                KDA: {twoTeamPerformance.red_kills} / {twoTeamPerformance.red_deaths} / {twoTeamPerformance.red_assists}
                                
                            </Typography>
                            <Typography variant="caption" sx={{display: 'flex', alignItems: 'center'}}>
                                Gold: {twoTeamPerformance.red_totalgold} {}
                                Dragons: {twoTeamPerformance.red_dragons}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography variant="h6">{twoTeamPerformance.red_result === 1 ? 'Win' : 'Lose'}</Typography>
                        </Grid>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography variant="h6">{twoTeamPerformance.blue_result === 1 ? 'Win' : 'Lose'}</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Typography variant="body1">Bans: </Typography>
                                <Image src={CHAMPION_URL(twoTeamPerformance.blue_ban1)} width={30} height={30} alt={twoTeamPerformance.blue_ban1} />
                                <Image src={CHAMPION_URL(twoTeamPerformance.blue_ban2)} width={30} height={30} alt={twoTeamPerformance.blue_ban2} />
                                <Image src={CHAMPION_URL(twoTeamPerformance.blue_ban3)} width={30} height={30} alt={twoTeamPerformance.blue_ban3} />
                                <Image src={CHAMPION_URL(twoTeamPerformance.blue_ban4)} width={30} height={30} alt={twoTeamPerformance.blue_ban4} />
                                <Image src={CHAMPION_URL(twoTeamPerformance.blue_ban5)} width={30} height={30} alt={twoTeamPerformance.blue_ban5} />
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', marginTop: '2px'}}>
                                <Typography variant="body1">Picks: </Typography>
                                {bluePicks.map((pick) => (<Image key={pick} src={CHAMPION_URL(pick)} width={30} height={30} alt={pick} />))}
                            </Box>
                            <Typography variant="caption" sx={{display: 'flex', alignItems: 'center', marginTop: '2px'}}>
                                KDA: {twoTeamPerformance.blue_kills}/{twoTeamPerformance.blue_deaths}/{twoTeamPerformance.blue_assists}
                            </Typography>
                            <Typography variant="caption" sx={{display: 'flex', alignItems: 'center'}}>
                                Gold: {twoTeamPerformance.blue_totalgold} {}
                                Dragons: {twoTeamPerformance.blue_dragons}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{height: '80px', width: '80px'}}>
                                <Image src={TEAM_URL(twoTeamPerformance.blue_teamname)} width={80} height={80} alt={twoTeamPerformance.blue_teamname} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography variant="body2"> {twoTeamPerformance.date} </Typography>
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
                                    {matches.map((match) => (
                                        <TeamMatch key={match.MatchID} {...match} />
                                    ))}
                                </List>
                                <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)}/>
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