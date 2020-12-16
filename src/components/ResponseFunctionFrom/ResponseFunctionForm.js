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

console.log(props)
    const classes = useStyles();
    const [description, setDescription] = React.useState(props.description);
    const [functionValue, setFunction] = React.useState(props.function);
    const [functionError, setFunctionError] = useState(false)
    const [, setState] = React.useState()

    const checkFunctionParams = () => {
        let paramsFind = functionValue.match(regexFindParams)[0].split(',');
        let paramsToHave = props.function.match(regexFindParams)[0].split(',');
        if (JSON.stringify(paramsToHave) !== JSON.stringify([])) {
            setFunctionError(!(JSON.stringify(paramsFind) === JSON.stringify(paramsToHave)));
            return JSON.stringify(paramsFind) === JSON.stringify(paramsToHave);
        } else {
            setFunctionError(false);
            return true;
        }
    }
    React.useEffect(() => {
        setState({})
    }, [props])
    return (
        <Grid>
            <CssBaseline/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Improve {props.name}
                    </Typography>
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
                                Don't change params and return !
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
                                    if (checkFunctionParams() ) {
                                        console.log("good")
                                    } else {
                                        console.log("bad");
                                    }
                                }}
                            >
                                Submit
                            </Button>
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
