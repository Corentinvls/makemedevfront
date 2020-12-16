import React, {useEffect, useRef, useState} from 'react';
import DetailsFunction from "../components/detailsFunction/DetailsFunction";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {getPostById} from "../request/postRequest";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CardHeader} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import generateChipsTooltip from "../utils/generateChipsTooltip";
import generateChipsLink from "../utils/generateChipsLink";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import {Add} from "@material-ui/icons";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import {Controlled as CodeMirror} from "react-codemirror2";
import Paper from "@material-ui/core/Paper";
import "../assets/codeMirror/codemirror.css";
import {Converter} from "showdown";
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import {EditorState} from "draft-js";
import Moment from 'react-moment';
import 'moment-timezone';
import {formatTime} from "../utils/format";
import TitleDetails from "../components/detailsFunction/TitleDetails";


function DetailsFunctionView(props) {
    const classes = useStyles();
    const {id} = useParams();
    const [posts, setPosts] = React.useState({})
    const isInitialMount = useRef(true);



    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            getPosts(id)
        } else {
            setPosts(props.posts)
        }
    }, [props])


    async function getPosts(id) {
        let response = await getPostById(id)
        response = await response
        if (response.success) {
            setPosts(response.success)
        } else {
            setPosts({})
        }
    }


    return (
        <>
            {posts.name ? (<div>
                <Card className={classes.root}>
                    <TitleDetails
                        pseudo={posts.author.pseudo}
                        avatar={posts.author.avatar}
                        title={"Post By "}
                        date={posts.author.creationDate}
                        action={generateChipsLink(posts.tag)}
                    />
                    <CardContent className={classes.containerTitle}>
                        <div className={classes.titleElements}>
                            <Typography variant="h4" component="h2">
                                {posts.name}
                            </Typography>
                        </div>
                        <div className={classes.titleElements}>
                            ({generateChipsTooltip(posts.params)})
                            {"{"}{generateChipsTooltip(posts.returns)}{"}"}
                        </div>
                    </CardContent>
                    <CardContent>
                        <DetailsFunction posts={posts}/>
                    </CardContent>
                </Card>
            </div>) : null}
        </>

    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275
    },
    title: {
        fontSize: 14,
    },
    containerTitle: {
        display: "flex",
        flexGrow: 1,
        alignItems: "center"
    },
    titleElements: {
        fontSize: 30,
    }
}));

const mapStateToProps = state => {
    return {
        posts: state.posts,
    };
};

export default connect(mapStateToProps)(DetailsFunctionView)
