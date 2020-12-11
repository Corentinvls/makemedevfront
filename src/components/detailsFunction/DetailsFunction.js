import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import generateChipsLink from "../../utils/generateChipsLink";
import generateChipsTooltip from "../../utils/generateChipsTooltip";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Button from "@material-ui/core/Button";
import LikeDislikeVote from "./LikeDislikeVote";
import DisplayFunction from "./DisplayFunction";
import ParamsReturn from "./ParamsReturn";
import CreationBar from "./CreationBar";


const useStyles = makeStyles((theme) => ({
    flexRow: {
        display: "flex",
    }
}));


export default function DetailsFunction(props) {

    const classes = useStyles();

    return (
        <Grid container className={classes.flexRow}>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8} className={classes.flexRow}>
                <LikeDislikeVote {...props}/>
                <div style={{width:'100%'}}>
                    <DisplayFunction />
                    <CreationBar {...props} />
                </div>
            </Grid>
            <Grid item xs={2}>
                <ParamsReturn {...props}/>
            </Grid>
        </Grid>


    );
}
