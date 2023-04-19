import { Paper, Typography, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";

export type PlayerProps = {
    name: string;
    realname: string;
    team: string;
    avatar: string;
    age: number;
    league: string;
    birthdate: string;
    position: string;
};

const PlayerCard = (playerProps: PlayerProps) => {
  return (
    <Grid container xs={12}>
        <Grid item xs={2} sx={{paddingLeft: '1rem'}}>
            <Image src={playerProps.avatar} alt={playerProps.name} width={120} height={120} />
        </Grid>
        <Grid item xs={10}>
            <Paper sx={{height: '120px', paddingLeft: '1rem', paddingTop: '0.5rem'}}>
                <Grid xs={12}>
                    <Typography variant="h5"> <b>{playerProps.name}</b> </Typography>
                </Grid>
                <Grid xs={12}>
                    <Typography variant="body1"> {playerProps.realname} </Typography>
                </Grid>
                <Grid xs={12} container>
                    <Grid xs={4} container>
                        <Typography variant="body2"> <b>League: </b> </Typography>
                        <Typography variant="body2"> {playerProps.league} </Typography>
                    </Grid>
                    <Grid xs={4} container>
                        <Typography variant="body2"> <b>Team: </b> </Typography>
                        <Typography variant="body2"> {playerProps.team} </Typography>
                    </Grid>
                    <Grid xs={4} container>
                        <Typography variant="body2"> <b>Position: </b> </Typography>
                        <Typography variant="body2"> {playerProps.position} </Typography>
                    </Grid>
                </Grid>
                <Grid xs={12} container>
                    <Grid xs={4} container>
                        <Typography variant="body2"> <b>Age: </b> </Typography>
                        <Typography variant="body2"> {playerProps.age} </Typography>
                    </Grid>
                    <Grid xs={4} container>
                        <Typography variant="body2"> <b>Birthdate: </b> </Typography>
                        <Typography variant="body2"> {playerProps.birthdate} </Typography>
                    </Grid>
                    <Grid xs={4} container>
                        {/* <Typography variant="body2"> {playerProps.position} </Typography> */}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
  );
};

export default PlayerCard;