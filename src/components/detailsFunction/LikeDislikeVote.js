import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import EditIcon from '@material-ui/icons/Edit';
import {sendVote} from "../../request/postRequest";
import {setUser, updatePosts, updateUser} from "../../store/actions";
import {connect} from "react-redux";
import {useHistory} from "react-router";

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


function LikeDislikeVote(props){
    const classes = useStyles();
    const {post} = props;
    const history = useHistory()



    async function userVote(vote) {
        let resultVote = await sendVote(vote, props.post._id);
        if (resultVote.success) {
            props.updateUser(resultVote.success.user, resultVote.token)
            props.updatePosts(resultVote.success.post)
            history.push(history.push("/details/" + resultVote.success.post._id))
        }
    }

    return(
        <div>
            <Grid className={classes.flexCol}>
                <div className={classes.flexRow}>
                    <IconButton size="small" aria-label={'up vote'} onClick={() => userVote(1)}>
                        <ThumbUpIcon/>
                    </IconButton>
                    <p className={classes.p}>{post.like}</p>
                </div>
                <div className={classes.flexRow}>
                    <IconButton size="small" aria-label={'down vote'} onClick={() => userVote(-1)}>
                        <ThumbDownIcon/>
                    </IconButton>
                    <p className={classes.p}>{post.dislike}</p>
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

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (user, token) => dispatch(updateUser(user, token)),
        updatePosts: (posts) => dispatch(updatePosts(posts))
    };
};

export default connect(null, mapDispatchToProps)(LikeDislikeVote)
