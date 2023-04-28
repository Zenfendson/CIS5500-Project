import { Paper, Typography, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import { PlayerProps } from "@/pages/player/Player";


const PlayerCard = (playerProps: PlayerProps) => {
  return (
    <Grid container xs={12}>
        <Grid item xs={2} sx={{paddingLeft: '1rem'}}>
            <Image src={playerProps.avatar} alt={playerProps.name} width={120} height={120} />
        </Grid>
        <Grid item xs={10}>
            <Paper sx={{height: '120px', paddingLeft: '1rem', paddingTop: '0.5rem'}}>
                <Grid xs={12} sx={{display: 'flex', alignItems: 'center', marginTop: '5px'}}>
                    <Typography variant="h5"> <b>{playerProps.name}</b> </Typography>
                </Grid>
                <Grid xs={12} sx={{display: 'flex', alignItems: 'center', marginTop: '5px'}}>
                    <Typography variant="body1"> {playerProps.realname} </Typography>
                </Grid>
                <Grid xs={12} container sx={{display: 'flex', alignItems: 'center', marginTop: '5px'}}>
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
            </Paper>
        </Grid>
    </Grid>
  );
};

export default PlayerCard;