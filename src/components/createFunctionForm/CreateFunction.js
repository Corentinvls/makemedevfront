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
import {useFormik} from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {sendPost} from "../../request/postRequest";
import {updateUser} from "../../store/actions";
import {useHistory} from "react-router-dom";



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

function MultiStepFunctionForm(props) {

    const validationSchema = yup.object({
        name: yup
            .string('Enter a function name')
            .matches(regexFunctionName, 'Enter a valid function name')
            .required('Function name is required'),
        tag: yup
            .array(yup.string().matches(regexTags, 'Enter a valid Tag name').max(50, "max 50 character"))
            .min(1, "One tags required")
            .max(5, "5 tags max")
            .required('tags is required'),
        post: yup
            .object()
            .shape({
                description: yup.string('Enter a description').required("A description is required"),
            }),
    });

    const formik = useFormik({
        initialValues: {
            name: props.name ? props.name : "",
            tag: props.tag ? props.tag : [],
            post: props.post ? props.post : {
                description: "",
            }
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            functionData.name = values.name;
            functionData.tag = values.tag;
            functionData.post = values.post

            if (!functionData.params) {
                functionData.params = [{
                    name: "",
                    type: "String",
                    description: "",
                    defaultValue: ""
                }]
            }
            if (!functionData.returns) {
                functionData.returns = [{
                    name: "",
                    type: "String",
                    description: "",
                    defaultValue: ""
                }]
            }
            setFunctionData(functionData)
            setTimeout(() => handleNext(), 500)
        },
    });
    const classes = useStyles();
    const history = useHistory();
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
        return <Grid container direction="row"
                     justify="flex-end"
        >
            {activeStep !== 0 && (
                <Button onClick={handleBack}>
                    Back
                </Button>
            )}
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                {activeStep === steps.length - 1 ? 'Publish my function' : 'Next'}
            </Button>
        </Grid>
    }

    const saveFunctionData = (field, value) => {
        if (field === "function") {
            functionData.post[field] = value;
            setFunctionData(functionData)
        } else if (field === "post") {
            functionData.post = [functionData.post]
            setFunctionData(functionData)
        } else {
            functionData[field] = value;
            setFunctionData(functionData)
        }


    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <FirstStepFunctionForm {...functionData} formik={formik} stepper={<ButtonsStepper/>}/>;
            case 1:
                return <SecondStepFunctionForm  {...functionData} handleBack={handleBack} handleNext={handleNext}
                                                saveFunctionData={(field, value) => saveFunctionData(field, value)}/>;
            case 2:
                return <ThirdStepFunctionForm {...functionData} handleBack={handleBack} handleNext={handleNext}
                                              saveFunctionData={(field, value) => saveFunctionData(field, value)}/>
            default:
                throw new Error('Unknown step');
        }
    }

    React.useEffect(() => {
        if (activeStep === steps.length) {
            sendPost(functionData).then((response) => {
                console.log(response);
                props.updateUser(response.success.user, response.token)
                setTimeout(() => {
                    history.push("/details/" + response.success.post._id)
                }, 3000)
            })

        }
    }, [activeStep]);
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
                                    Your function will be visible in a minute
                                </Typography>
                            </React.Fragment>
                        ) : getStepContent(activeStep)}

                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (user, token) => dispatch(updateUser(user, token)),
    };
};

export default connect(null, mapDispatchToProps)(MultiStepFunctionForm)
