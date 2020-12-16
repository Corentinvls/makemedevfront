import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    inline: {
        display: "flex",
        flexDirection:"column",
        margin: 12

    },
    block: {
        width: '100%',
        height: 500,
        backgroundColor: '#343538',
    }
}));


export default function DisplayFunction(props){
    const classes = useStyles();
    return(
        <Grid className={classes.inline}>
            <span>Description:</span>
            <Grid className={classes.block}>
            </Grid>
        </Grid>
    )
}
