import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import LikeDislikeVote from "./LikeDislikeVote";
import DisplayFunction from "./DisplayFunction";
import ParamsReturn from "./ParamsReturn";
import CreationBar from "./CreationBar";
import ShowComments from "../comments/ShowComments";
import {convertToRaw, EditorState} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import Button from "@material-ui/core/Button";
import {sendCommentary} from "../../request/postRequest";
import {updatePosts, updateUser} from "../../store/actions";
import {connect} from "react-redux";


const useStyles = makeStyles((theme) => ({
    flexRow: {
        display: "flex",
        justifyContent: "center"
    },
    editor: {
        minHeight: 140,
        boxSizing: "border-box",
        border: "1 solid #ddd",
        cursor: "text",
        borderRadius: 2,
        boxShadow: "inset 0px 1px 8px -3px #ABABAB",
        background: "#fefefe",
    }
}));


function DetailsFunction(props) {

    const classes = useStyles();
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createWithText("Add Comments"),
    );
    const staticToolbarPlugin = createToolbarPlugin();
    const {Toolbar} = staticToolbarPlugin;
    const plugins = [staticToolbarPlugin];

    async function handleCommentary() {
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        let resultCommentary = await sendCommentary(value, props.post._id);
        if (resultCommentary.success) {
            props.updateUser(resultCommentary.success.user, resultCommentary.token)
            props.updatePosts(resultCommentary.success.post)
        }
    }
    return (
        <Grid container className={classes.flexRow}>
            <Grid item xs={8} className={classes.flexRow}>
                <LikeDislikeVote {...props}/>
                <div style={{width: '100%'}}>
                    <DisplayFunction function={props.post.function} description={props.post.description}/>
                    <CreationBar {...props} />
                </div>
            </Grid>
            <Grid item xs={2}>
                <ParamsReturn {...props}/>
            </Grid>
            <Grid item xs={10}>
                <div className={classes.editor}>
                    <Toolbar/>
                    <Editor editorState={editorState} onChange={setEditorState} plugins={plugins}/>
                </div>
                <Button onClick={handleCommentary}>
                    Add a comment !
                </Button>
            </Grid>
            <Grid item xs={10}>
                    <ShowComments commentary={props.post.commentary}/>
            </Grid>
        </Grid>


    );
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (user, token) => dispatch(updateUser(user, token)),
        updatePosts: (posts) => dispatch(updatePosts(posts))
    };
};

export default connect(null, mapDispatchToProps)(DetailsFunction)


