import React, {useState} from 'react';

import Typography from '@material-ui/core/Typography';
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {updateUser} from "../../store/actions";
import CustomDraft from "../../utils/components/CustomDraft";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Controlled as CodeMirror} from "react-codemirror2";
import {regexFindParams} from "../../utils/regex";
import generateChipsTooltip from "../../utils/generateChipsTooltip";
import {sendResponseFunction} from "../../request/postRequest";
import {useHistory} from "react-router-dom";
import ValidationModal from "../../utils/components/ValidationModal";


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: "70%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
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

function ResponseFunctionForm(props) {

    const classes = useStyles();
    const [description, setDescription] = React.useState();
    const [functionValue, setFunction] = React.useState();
    const [paramsError, setParamsError] = useState(false)
    const [returnsError, setReturnsError] = useState(false)
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [state, setState] = React.useState()
    const history = useHistory();

    const handleOk = () => {
        sendResponseFunction({"function": functionValue, description: description}, props._id).then((response) => {
            props.updateUser(response.success.user, response.token)
            history.push("/details/" + props._id)
        })
    }
    const checkFunctionParams = () => {
        let paramsFind = functionValue.match(regexFindParams)[0].split(',');
        let paramsToHave = props.params.map((param) => param.name);
        if (JSON.stringify(paramsToHave) !== JSON.stringify([])) {
            setParamsError(!(JSON.stringify(paramsFind) === JSON.stringify(paramsToHave)));
            return JSON.stringify(paramsFind) === JSON.stringify(paramsToHave);
        } else {
            setParamsError(false);
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
        setReturnsError(regexReturn.includes(false))
        return !regexReturn.includes(false)
    }

    React.useEffect(() => {
        if (props.post) {
            let defineCurrentPost = props.post.find((post) => post._id === props.postId)
            setDescription(defineCurrentPost.description)
            setFunction(defineCurrentPost["function"])
            setState("ready")
        }
    }, [props])
    return (
        <Grid>
            <CssBaseline/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Improve {props.name}
                    </Typography>
                    {state === "ready" &&
                    <Grid container direction="row" justify={'space-around'} spacing={3}>
                        <Grid item xs={6}>
                            <FormHelperText error={paramsError} variant="h4" align="center">Needed
                                params</FormHelperText>
                            {generateChipsTooltip(props.params)}
                        </Grid>
                        <Grid item xs={6}>
                            <FormHelperText error={returnsError} variant="h4" align="center">Needed
                                returns</FormHelperText>
                            {generateChipsTooltip(props.returns)}
                        </Grid>
                    </Grid>
                    }

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <CustomDraft
                                value={description}
                                onChange={(value) => {
                                    setDescription(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Your function</h3>
                            <FormHelperText>
                                Don't change params and return ! You can put return in comment if you don't want to create a variable
                            </FormHelperText>
                            <Paper style={{borderRadius: 10, overflow: 'hidden',fontSize: "1.2rem"}}>
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
                                        setFunction(value);
                                    }}
                                    onChange={(editor, data, value) => {
                                    }}
                                />
                            </Paper>

                        </Grid>
                        <Grid container direction="row" justify="flex-end">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    if (checkFunctionParams() && checkFunctionReturn()) {
                                        handleClickOpen()
                                    }
                                }}
                            >
                                Submit
                            </Button>
                            <ValidationModal open={open} handleClose={() => handleClose()} handleOk={() => handleOk()}/>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </Grid>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (user, token) => dispatch(updateUser(user, token)),
    };
};

export default connect(null, mapDispatchToProps)(ResponseFunctionForm)
