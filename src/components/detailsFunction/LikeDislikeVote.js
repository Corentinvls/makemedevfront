import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {sendVote} from "../../request/postRequest";
import {updatePosts, updateUser} from "../../store/actions";
import {connect} from "react-redux";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import TextWithLogoButton from "../../utils/components/TextWithLogoButton";

const useStyles = makeStyles((theme) => ({
    flexCol: {
        display: "flex",
        flexDirection: "column"
    },
    flexRow: {
        display: "flex",
    },
    voteElements: {
        display: "flex",
        flexDirection: "column",
        marginRight: 10
    }
}));

function LikeDislikeVote(props){
    const classes = useStyles();

    async function userVote(vote) {
        let resultVote = await sendVote(vote, props.post._id);
        if (resultVote.success) {
            props.updateUser(resultVote.success.user, resultVote.token)
            props.updatePosts(resultVote.success.post)
        }
    }
    return(
            <div className={classes.voteElements}>
                <TextWithLogoButton text={props.post.like} icon={<ThumbUpIcon/>} onClick={() => userVote(1)}/>
                <TextWithLogoButton text={props.post.dislike} icon={<ThumbDownIcon/>} onClick={() => userVote(-1)}/>
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
