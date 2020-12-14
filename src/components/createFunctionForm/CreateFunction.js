import React from 'react';

import Typography from '@material-ui/core/Typography';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FirstStepFunctionForm from "./FirstStep";
import SecondStepFunctionForm from "./SecondStep";
import {regexFunctionName, regexTags} from "../../utils/regex";

import ThirdStepFunctionForm from "./ThirdStepFunctionForm";
import {Formik, useFormik} from "formik";
import * as yup from "yup";

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
const defaultProps = {
    "name": "testName",
    "author": {
        "pseudo": "",
        "avatar": ""
    },
    "params": [
        {
            "name": "",
            "type": "",
            "description": "",
            "defaultValue": ""
        }
    ],
    "return":
        {
            "name": "",
            "type": "",
            "description": "",
            "defaultValue": ""
        },
    "tag": ["test", "tags"],
    "post":
        {
            "description": "tstDesc",
            "author": {
                "pseudo": "",
                "avatar": ""
            },
            "function": ""
        }
}

export default function MultiStepFunctionForm(props) {

    const validationSchema = yup.object({
        name: yup
            .string('Enter a function name')
            .matches(regexFunctionName, 'Enter a valid function name')
            .required('Function name is required'),
        tags: yup
            .array(yup.string().matches(regexTags, 'Enter a valid Tag name'))
            .min(1, "One tags required")
            .max(5, "5 tags max")
            .required('tags is required'),
        post: yup
            .object()
            .shape({
                description: yup.string('Enter a description').required("A description is required"),

            }),
        params: yup.array()
    });

    const formik = useFormik({
        initialValues: {
            name: props.name ? props.name : "",
            tags: props.tags ? props.tags : [],
            post: props.post ? props.post : {
                description: "",
                author: {
                    pseudo: "",
                    avatar: ""
                },
                "function": ""
            },
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setFunctionData(values)
            handleNext()
        },
    });
    const classes = useStyles();

    const [activeStep, setActiveStep] = React.useState(0);
    const [functionData, setFunctionData] = React.useState({});


    const steps = ['What is your function', 'What are your params and return value', 'Your function'];
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const ButtonsStepper = () => {
        return <React.Fragment>
            <div className={classes.buttons}>
                {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                        Back
                    </Button>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                >
                    {activeStep === steps.length - 1 ? 'Publish my function' : 'Next'}
                </Button>
            </div>
        </React.Fragment>
    }


    const saveData = (step, data) => {
        switch (step) {
            case 0:
                functionData.name = data.name;
                functionData.tags = data.tags;
                if (functionData.post) {
                    functionData.post.description = data.description;
                } else {
                    functionData.post = {
                        "description": data.description,
                        "author": {
                            "pseudo": "",
                            "avatar": ""
                        },
                        "function": ""
                    };
                }
                setFunctionData(functionData)
                break;
            case 1:
                functionData.params = data.params;
                functionData.returnValue = data.returnValue;
                setFunctionData(functionData)
                break;

        }
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <FirstStepFunctionForm {...functionData} formik={formik} stepper={<ButtonsStepper/>}/>;
            case 1:
                return <SecondStepFunctionForm  {...functionData} formik={formik} stepper={<ButtonsStepper/>} />;
            case 2:
                return <ThirdStepFunctionForm {...functionData} saveData={(value) => saveData(step, value)}/>
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Create your function
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        {steps[activeStep]}
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thanks for your contribution
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your function will be visible in a minutes, you can find it in your profile
                                    (TODO
                                    put a link).
                                </Typography>
                            </React.Fragment>
                        ) : getStepContent(activeStep)}

                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}
