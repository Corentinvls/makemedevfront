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
import generateChipsTooltip from "../../utils/generateChipsTooltip";
import {Button} from "@material-ui/core";
import {regexFindParams} from "../../utils/regex";
import "../../assets/codeMirror/codemirror.css";
import ValidationModal from "../../utils/components/ValidationModal";



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
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default function ThirdStepFunctionForm(props) {
    const defaultProps = `function ${props.name}(${props.params.map((params) => params.name).join(',')}){

${props.returns.map((returnVal) => "return " + returnVal.name + ";").join('\n    ')}
    }`

    const classes = useStyles();
    const [functionValue, setFunctionValue] = useState(props.post.function ? props.post.function : defaultProps);
    const [functionError, setFunctionError] = useState(false)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOk = () => {
        props.saveFunctionData("post")
        props.handleNext()
    }

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });
    const checkFunctionParams = () => {
        let paramsFind = functionValue.match(regexFindParams)[0].split(',');
        let paramsToHave = props.params.map((param) => param.name);
        if (JSON.stringify(paramsToHave) !== JSON.stringify([])) {
            setFunctionError(!(JSON.stringify(paramsFind) === JSON.stringify(paramsToHave)));
            return JSON.stringify(paramsFind) === JSON.stringify(paramsToHave);
        } else {
            setFunctionError(false);
            return true;
        }

    }
    const checkFunctionReturn = () => {
        function findWord(word, str) {
            return new RegExp("\\b" + word + "\\b").test(str)
        }

        let regexReturn = props.returns.map(ret => {
            return findWord(ret.name, functionValue)
        })
        setFunctionError(regexReturn.includes(false))
        return !functionError
    }
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h3>Description preview</h3>
                    <div dangerouslySetInnerHTML={{__html: converter.makeHtml(props.post.description)}}/>
                </Grid>
                {props.params.length > 0 &&
                <Grid item xs={12}>
                    <h3>Your Params </h3>
                    {generateChipsTooltip(props.params)}
                </Grid>}
                {props.returns.length > 0 &&
                <Grid item xs={12}>
                    <h3>Your returns </h3>
                    {generateChipsTooltip(props.returns)}
                </Grid>}
                <Grid item xs={12}>
                    <h3>Your function</h3>
                    <FormHelperText error={functionError}>
                        Don't change you params and return name here ! You can put return in comment if you don't want to create a variable
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
            <Grid item xs={12}>
                <div className={classes.buttons}>
                    <Button onClick={() => {
                        let paramsToSave = props.params;
                        paramsToSave.push({
                            name: "",
                            type: "String",
                            description: "",
                            defaultValue: ""
                        });
                        props.saveFunctionData("params", paramsToSave)
                        let returnsToSave = props.returns;
                        returnsToSave.push({
                            name: "",
                            type: "String",
                            description: "",
                            defaultValue: ""
                        });
                        props.saveFunctionData("returns", returnsToSave)
                        props.handleBack()
                    }} className={classes.button}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                            if (checkFunctionParams() && checkFunctionReturn()) {
                                props.saveFunctionData("function", functionValue)
                                handleClickOpen()
                            }
                        }}
                    >
                        Publish my function
                    </Button>
                </div>
                <ValidationModal open={open} handleClose={() => handleClose()} handleOk={() => handleOk()} />
            </Grid>
        </>
    );
}

