import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import Box from "@material-ui/core/Box";


const useStyles = makeStyles((theme) => ({
    divComm: {
        padding:'1% 2% 1% 2%'
    }
}));


export default function ShowComments(props) {
    const classes = useStyles();


    function showCommentaries() {
        return props.commentary.map(comment => (
            <div key={comment._id}>
                <hr>
                </hr>
                    <div className={classes.divComm}>
                        <p> Pseudo : {comment.pseudo} , answered
                            : {comment.date * 1000}</p>
                        <Box component="p" p={2} ml={6}
                             bgcolor={'lightgrey'}>{comment.commentary}
                        </Box>
                    </div>
            </div>
        ));
    }

    return (
        <Grid>
            <div className={classes.contain}>
                <div>{showCommentaries()}</div>
            </div>
        </Grid>
    )
}
