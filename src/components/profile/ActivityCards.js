import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

import VisibilityIcon from '@material-ui/icons/Visibility';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: 10,
    },

}));

export default function ActivityCards(props) {
    const classes = useStyles();
    const history = useHistory()
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2} alignItems="center" justify="space-around">
                    <Grid item>
                        {props.icon}
                    </Grid>
                    <Grid item sm container>
                        <Typography gutterBottom variant="subtitle1">
                            {props.post.name}
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Button
                            variant="contained"
                            size="small"
                            className={classes.button}
                            onClick={() => history.push("/details/" + props.post._id)}
                        ><VisibilityIcon/>
                        </Button>
                    </Grid>
                </Grid>

            </Paper>
        </div>
    );
}
