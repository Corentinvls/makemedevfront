import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import React from "react";

export default function LikeDislikePostInfo(props) {
    return <>
        <Typography className={props.classes.marginElementR}>
            {props.post.post.length}
        </Typography>
        <Icon aria-label="Comments" className={props.classes.marginElementR}>
            <CommentIcon/>
        </Icon>
        <Typography className={props.classes.marginElementR}>
            {props.post.post[0].like}
        </Typography>
        <Icon aria-label="UpVote" className={props.classes.marginElementR}>
            <ThumbUpIcon/>
        </Icon>
        <Typography className={props.classes.marginElementR}>
            {props.post.post[0].dislike}
        </Typography>
        <Icon aria-label="DownVote">
            <ThumbDownIcon/>
        </Icon>
    </>;
}
