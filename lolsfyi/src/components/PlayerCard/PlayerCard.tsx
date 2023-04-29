import { Paper, Typography, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import { PlayerInfo, PlayerStats } from "@/pages/player/Player";
import { PLACEHOLDER_PLAYER } from "@/constants";

interface PlayerCardProps {
    playerProps: {
      playerInfo: PlayerInfo | null;
      playerStats: PlayerStats | null;
    };
  }


const PlayerCard = ({ playerProps }: PlayerCardProps) => {
    const { playerInfo, playerStats } = playerProps;
  return (
    <Grid container xs={12}>
        <Grid item xs={2} sx={{paddingLeft: '1rem'}}>
            <Image src={playerInfo?.avatar ? playerInfo?.avatar : PLACEHOLDER_PLAYER} alt={playerInfo?.name} width={120} height={120} />
        </Grid>
        <Grid item xs={10}>
            <Paper sx={{height: '120px', paddingLeft: '1rem', paddingTop: '0.5rem'}}>
                <Grid xs={12} sx={{display: 'flex', alignItems: 'center', marginTop: '5px'}}>
                    <Typography variant="h5"> <b>{playerInfo?.name}</b> </Typography>
                </Grid>
                <Grid xs={12} container sx={{display: 'flex', alignItems: 'center'}}>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b>League: </b> </Typography>
                        <Typography variant="body2"> {playerInfo?.league} </Typography>
                    </Grid>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b>Team: </b> </Typography>
                        <Typography variant="body2"> {playerInfo?.team} </Typography>
                    </Grid>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b>Position: </b> </Typography>
                        <Typography variant="body2"> {playerInfo?.position} </Typography>
                    </Grid>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b>Win Rate: </b> </Typography>
                        <Typography variant="body2"> {Math.round((playerStats?.winrate) * 100) / 100} </Typography>
                    </Grid>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b># of Wins: </b> </Typography>
                        <Typography variant="body2"> {Math.round((playerStats?.numberofwins) * 100) / 100} </Typography>
                    </Grid>
                </Grid>
                <Grid xs={12} container sx={{display: 'flex', alignItems: 'center'}}>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b># of Loses: </b> </Typography>
                        <Typography variant="body2"> {Math.round((playerStats?.numberofloses) * 100) / 100} </Typography>
                    </Grid>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b>AVG Kills: </b> </Typography>
                        <Typography variant="body2"> {Math.round((playerStats?.kills) * 100) / 100} </Typography>
                    </Grid>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b>AVG Death: </b> </Typography>
                        <Typography variant="body2"> {Math.round((playerStats?.deaths) * 100) / 100} </Typography>
                    </Grid>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b>AVG Assists: </b> </Typography>
                        <Typography variant="body2"> {Math.round((playerStats?.assists) * 100) / 100} </Typography>
                    </Grid>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b>KDA: </b> </Typography>
                        <Typography variant="body2"> {Math.round((playerStats?.KDA) * 100) / 100} </Typography>
                    </Grid>
                </Grid>
                <Grid xs={12} container sx={{display: 'flex', alignItems: 'center'}}>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b>Penta Kills Rate: </b> </Typography>
                        <Typography variant="body2"> {Math.round((playerStats?.pentakillsrate) * 100) / 100} </Typography>
                    </Grid>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b>DPM: </b> </Typography>
                        <Typography variant="body2"> {Math.round((playerStats?.dpm) * 100) / 100} </Typography>
                    </Grid>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b>GPM: </b> </Typography>
                        <Typography variant="body2"> {Math.round((playerStats?.gpm) * 100) / 100} </Typography>
                    </Grid>
                    <Grid xs={2.4} container>
                        <Typography variant="body2"> <b>CSPM: </b> </Typography>
                        <Typography variant="body2"> {Math.round((playerStats?.cspm) * 100) / 100} </Typography>
                    </Grid>
                    <Grid xs={2.4} container />
                </Grid>
            </Paper>
        </Grid>
    </Grid>
  );
};

export default PlayerCard;