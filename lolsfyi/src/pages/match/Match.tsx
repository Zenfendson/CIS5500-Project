import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const mockMatchProps = [{}];

const Match = () => {
    const router = useRouter();
    const [match, setMatch] = useState<string | null>(null);

    useEffect(() => {
        const { match } = router.query;
        setMatch(match as string);
    }, [router.query]);

    return (
        <Grid container xs={12}>

        </Grid>
    )
}

export default Match;