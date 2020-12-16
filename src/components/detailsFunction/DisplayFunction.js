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
        minHeight: 200
        // backgroundColor: '#c2c2c2',
    }
}));


export default function DisplayFunction(props){
    const classes = useStyles();
    console.log(props.function)
    return(
        <Grid className={classes.inline}>
            <span>Description:</span>
            <div>{props.description}</div>
            <Grid className={classes.block}>
                <div>
                    {props.function}
                </div>
            </Grid>
        </Grid>
    )
}
