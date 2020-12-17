import React from "react";
import {makeStyles} from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: "center",
    }
}));
const bigTitle = "We <3 people who share code";


export default function HeaderHome () {

    const classes = useStyles();
    return(
        <Grid className={classes.header}>
            <h1>{bigTitle}</h1>
            <h3>We build for you a solution to share optimized code <br/>
                and connect with a community of passionate developers<br/>
                help them, and be help.<br/>
            </h3>
        </Grid>
        )


}
