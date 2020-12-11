import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    flexCol: {
        display: "flex",
        flexDirection: "column"
    },
    flexRow: {
        display: "flex",
    },
    p: {
        alignSelf: "center",
        width: 50,
        backgroundColor: 'grey',
        textAlign: "center",
        color: "whitesmoke",
        borderRadius: 2,
        margin: 0
    },
}));


export default function LikeDislikeVote(props){
    const classes = useStyles();
    const {post} = props;
    const [vote, setVote] = useState(0);


    function userVote(value) {
        let newVote = value
        if (vote === value) {
            newVote = 0
        }
        setVote(newVote);
    }

    return(
        <div>
            <Grid className={classes.flexCol}>
                <div className={classes.flexRow}>
                    <IconButton size="small" aria-label={'up vote'} onClick={() => userVote(1)}>
                        <ThumbUpIcon/>
                    </IconButton>
                    <p className={classes.p}>{post[0].like + vote === (post[0].like + 1) ? (post[0].like + 1) : post[0].like}</p>
                </div>
                <div className={classes.flexRow}>
                    <IconButton size="small" aria-label={'down vote'} onClick={() => userVote(-1)}>
                        <ThumbDownIcon/>
                    </IconButton>
                    <p className={classes.p}>{post[0].dislike + vote === (post[0].dislike - 1) ? (post[0].dislike + 1) : post[0].dislike}</p>
                </div>
                <div>
                    <IconButton size="small">
                        <FavoriteBorderIcon/>
                    </IconButton>
                </div>
                <div>
                    <IconButton size="small">
                        <EditIcon/>
                    </IconButton>
                </div>
            </Grid>
        </div>
    )
}
