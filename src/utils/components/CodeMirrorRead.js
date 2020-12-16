import Paper from "@material-ui/core/Paper";
import {Controlled as CodeMirror} from "react-codemirror2";
import React from "react";

export default function CodeMirrorRead(props) {
    return <Paper style={{
        borderRadius: 10,
        overflow: "hidden",
        fontSize: "1.1rem",
        height: "auto"
    }}>
        <CodeMirror
            value={props.function}
            options={{
                mode: "javascript",
                theme: "ambiance",
                lineWrapping: true,
                smartIndent: true,
                lineNumbers: true,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                autoCloseTags: true,
                keyMap: "sublime",
                matchBrackets: true,
                autoCloseBrackets: true,
                readOnly: true,
                extraKeys: {
                    "Ctrl-Space": "autocomplete"
                }
            }}
        />
    </Paper>;
}
