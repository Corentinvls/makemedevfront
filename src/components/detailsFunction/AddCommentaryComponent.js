import React from "react";
import {convertToRaw, EditorState} from "draft-js";
import createToolbarPlugin from "draft-js-static-toolbar-plugin";
import {sendCommentary} from "../../request/postRequest";
import Editor from "draft-js-plugins-editor";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {updatePosts, updateUser} from "../../store/actions";
import {connect} from "react-redux";

function AddCommentaryComponent(props) {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createWithText("Add Comments"),
    );
    const staticToolbarPlugin = createToolbarPlugin();
    const {Toolbar} = staticToolbarPlugin;
    const plugins = [staticToolbarPlugin];
    const classes = useStyles();

    async function handleCommentary() {
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        let resultCommentary = await sendCommentary(value, props.id);
        if (resultCommentary.success) {
            props.updateUser(resultCommentary.success.user, resultCommentary.token)
            props.updatePosts(resultCommentary.success.post)
        }
    }

    return (
        <>
            <div className={classes.editor}>
                <Toolbar/>
                <Editor editorState={editorState} onChange={setEditorState}
                        plugins={plugins}/>
            </div>
            <Button color="primary" variant="contained" size="small" onClick={handleCommentary}>
                Add comment !
            </Button>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    pos: {
        marginBottom: 12,
    },
    editor: {
        minHeight: 140,
        boxSizing: "border-box",
        border: "1 solid #ddd",
        cursor: "text",
        borderRadius: 2,
        boxShadow: "inset 0px 1px 8px -3px #ABABAB",
        background: "#ffffff",
    },
}));

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (user, token) => dispatch(updateUser(user, token)),
        updatePosts: (posts) => dispatch(updatePosts(posts))
    };
};

export default connect(null, mapDispatchToProps)(AddCommentaryComponent)
