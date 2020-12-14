import React, {useState} from 'react';

import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {Controlled as CodeMirror} from 'react-codemirror2'
import * as Showdown from "showdown";
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/theme/ambiance.css';
import Paper from "@material-ui/core/Paper";
import FormHelperText from "@material-ui/core/FormHelperText";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.secondary.dark,
    },
}));

export default function ThirdStepFunctionForm(props) {
    const defaultProps = `function ${props.name}(${props.params.map((params) => params.name).join(',')}){

      ${props.returnValue.map((returnVal) => "return "+returnVal.name+ ";").join('\n    ')}
    }`

    const classes = useStyles();
    const [functionValue, setFunctionValue] = useState(props.post.function ? props.post.function : defaultProps);
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });
    console.log(defaultProps)
    return (
        <>
            <form className={classes.form} noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h3>Description preview</h3>
                        <div dangerouslySetInnerHTML={{__html: converter.makeHtml(props.post.description)}}/>
                    </Grid>

                    <Grid item xs={12}>
                        <h3>Your function</h3>
                        <FormHelperText>
                            Don't change you params and return name here !
                        </FormHelperText>
                        <Paper style={{borderRadius: 10, overflow: 'hidden'}}>

                            <CodeMirror
                                value={functionValue}
                                options={{
                                    mode: 'javascript',
                                    theme: 'ambiance',
                                    lineWrapping: true,
                                    smartIndent: true,
                                    lineNumbers: true,
                                    foldGutter: true,
                                    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                                    autoCloseTags: true,
                                    keyMap: 'sublime',
                                    matchBrackets: true,
                                    autoCloseBrackets: true,
                                    extraKeys: {
                                        'Ctrl-Space': 'autocomplete'
                                    }
                                }}
                                onBeforeChange={(editor, data, value) => {
                                    setFunctionValue(value);
                                }}
                                onChange={(editor, data, value) => {
                                }}
                            />
                        </Paper>

                    </Grid>
                </Grid>
            </form>
        </>
    );
}

