import React, {Component} from 'react';

import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg"


class CustomDraft extends Component{
    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange(editorState){
        this.setState({
            editorState:editorState
        });
    };

    render(){
        return <div><Editor
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
                inline: {inDropdown: true},
                list: {inDropdown: true},
                textAlign: {inDropdown: true},
                link: {inDropdown: true},
                history: {inDropdown: true},
            }}
        /></div>;

    }
}
export default CustomDraft;




