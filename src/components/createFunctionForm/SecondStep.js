import React from 'react';

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import DoneIcon from '@material-ui/icons/Done';
import FormHelperText from "@material-ui/core/FormHelperText";
import GenerateChipsTooltipEditable from "../../utils/generateChipsTooltipEditable";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Button} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import {useFormik} from "formik";
import * as yup from "yup";
import {regexFunctionName} from "../../utils/regex";
import {makeStyles} from "@material-ui/core/styles";


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
    width: {
        width: '100%'
    }
}));
export default function SecondStepFunction(props) {
    const classes = useStyles();
    const type = ['String', 'Number', 'Boolean', 'Array', 'Object', 'Function', 'BigInt', 'Null', 'Symbol', 'Other'];
    const [, setState] = React.useState();
    const [showParamsChips, setParamsChips] = React.useState(props.params ? props.params[0].name !== "" : false);
    const [paramsIndex, setParamsIndex] = React.useState(0);
    const [showReturnValueChips, setReturnValueChips] = React.useState(props.returnValue ? props.returnValue[0].name !== "" : false);
    const [returnValueIndex, setReturnValueIndex] = React.useState(0);


    const validationSchema = yup.object({
        params: yup.array(
            yup.object({
                name: yup.string('Enter a name').matches(regexFunctionName, 'Enter a valid name').required("A name is required"),
                type: yup.string("Enter a type").required("A type is required"),
                description: yup.string('Enter a description').required("A description is required"),
                defaultValue: yup.string('Enter a default value')
            }))
    });
    const validationSchemaReturn = yup.object({
        returnValue: yup.array(
            yup.object({
                name: yup.string('Enter a name').matches(regexFunctionName, 'Enter a valid name').required("A name is required"),
                type: yup.string("Enter a type").required("A type is required"),
                description: yup.string('Enter a description').required("A description is required"),
                defaultValue: yup.string('Enter a default value')
            }))
    });

    const formikParams = useFormik({
        initialValues: {
            params: props.params ? props.params : [{
                name: "",
                type: "String",
                description: "",
                defaultValue: ""
            }]
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            formikParams.values.params.push({
                name: "",
                type: "",
                defaultValue: "String",
                description: ""
            })
            formikParams.values.params[0] ? setParamsChips(formikParams.values.params[0].name !== "") : setParamsChips(false)
            setParamsIndex(formikParams.values.params.length - 1)
            let paramsToSave = formikParams.values.params;
            paramsToSave.pop();
            props.saveFunctionData("params",paramsToSave)
        },
    });
    const whichErrorParams = (index, field) => {
        if (formikParams.errors) {
            if (formikParams.errors.params) {
                if (formikParams.errors.params[index]) {
                    if (formikParams.errors.params[index][field]) {
                        return formikParams.errors.params[index][field];
                    }
                }
            }
        }
        return null;
    }
    const isErrorParams = (index, field) => {
        if (formikParams.errors) {
            if (formikParams.errors.params) {
                if (formikParams.errors.params[index]) {
                    if (formikParams.errors.params[index][field]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    function handleDeleteParams(index) {
        formikParams.values.params.splice(index, 1)
        setParamsIndex(formikParams.values.params.length - 1)
    }
    function reEditParams(index) {
        setParamsIndex(index)
    }

    const formikReturnValue = useFormik({
        initialValues: {
            returnValue: props.returnValue ? props.returnValue : [{
                name: "",
                type: "String",
                description: "",
                defaultValue: ""
            }]
        },
        validationSchema: validationSchemaReturn,
        onSubmit: (values) => {
            formikReturnValue.values.returnValue.push({
                name: "",
                type: "String",
                defaultValue: "",
                description: ""
            })
            formikReturnValue.values.returnValue[0] ? setReturnValueChips(formikReturnValue.values.returnValue[0].name !== "") : setReturnValueChips(false)
            setReturnValueIndex(formikReturnValue.values.returnValue.length - 1)
            let returnValueToSave =formikReturnValue.values.returnValue;
            returnValueToSave.pop();
            props.saveFunctionData("returnValue",returnValueToSave)
        },
    });
    const isErrorReturnValue = (index, field) => {
        if (formikReturnValue.errors) {
            if (formikReturnValue.errors.returnValue) {
                if (formikReturnValue.errors.returnValue[index]) {
                    if (formikReturnValue.errors.returnValue[index][field]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    const whichErrorReturnValue = (index, field) => {
        if (formikParams.errors) {
            if (formikParams.errors.returnValue) {
                if (formikParams.errors.returnValue[index]) {
                    if (formikParams.errors.returnValue[index][field]) {
                        return formikParams.errors.returnValue[index][field];
                    }
                }
            }
        }
        return null;
    }
    function handleDeleteReturnValue(index) {
        formikReturnValue.values.returnValue.splice(index, 1)
        setReturnValueIndex(formikReturnValue.values.returnValue.length - 1)
    }
    function reEditReturnValue(index) {
        setReturnValueIndex(index)
    }

    React.useEffect(() => {
        setState({})
    }, [paramsIndex,returnValueIndex]);

    return (<>
        <form onSubmit={formikParams.handleSubmit}>
            <h2>Params</h2>
            <Grid container spacing={2}>
                {showParamsChips &&
                <Grid container direction="row"
                      justify="flex-start"
                      alignItems="center" spacing={1}>
                    <GenerateChipsTooltipEditable id={"chips"} chips={formikParams.values.params}
                                                  valueToEdit={"params"}
                                                  handleDelete={handleDeleteParams}
                                                  handleClick={reEditParams}/>
                </Grid>
                }

                <Grid item xs={4}>
                    <TextField
                        name={`params[${paramsIndex}].name`}
                        variant="outlined"
                        fullWidth
                        label="Name"
                        autoFocus
                        value={formikParams.values.params[paramsIndex].name}
                        onChange={formikParams.handleChange}
                        error={formikParams.touched.params && isErrorParams(paramsIndex, "name")}
                        helperText={formikParams.touched.params && whichErrorParams(paramsIndex, "name")}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete
                        id={`params[${paramsIndex}].type`}
                        name={`params[${paramsIndex}].type`}
                        options={type}
                        getOptionLabel={option => option}
                        getOptionSelected={(option,value) => option === value}
                        value={formikParams.values.params[paramsIndex].type}
                        onChange={(e, value) => {
                            formikParams.setFieldValue(
                                `params[${paramsIndex}].type`,
                                value
                            );
                        }}
                        renderInput={params => (
                            <TextField
                                label="Type"
                                fullWidth
                                required
                                variant="outlined"

                                name={`params[${paramsIndex}].type`}
                                {...params}
                            />
                        )}
                    />

                </Grid>
                <Grid item xs={4}>
                    <TextField
                        name={`params[${paramsIndex}].defaultValue`}
                        variant="outlined"
                        fullWidth
                        label="Default value"
                        value={formikParams.values.params[paramsIndex].defaultValue}
                        onChange={formikParams.handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name={`params[${paramsIndex}].description`}
                        variant="outlined"
                        fullWidth
                        multiline
                        required
                        rows={4}
                        label="Description"
                        value={formikParams.values.params[paramsIndex].description}
                        onChange={formikParams.handleChange}
                    />
                </Grid>
                <Grid container direction="row"
                      justify="flex-end"
                      alignItems="flex-start">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={paramsIndex !== formikParams.values.params.length - 1 ? <DoneIcon/> :
                            <AddCircleIcon/>}
                        type={paramsIndex !== formikParams.values.params.length - 1 ? null : "submit"}
                        onClick={() => {
                            if (paramsIndex !== formikParams.values.params.length - 1) {
                                setParamsIndex(formikParams.values.params.length - 1)
                            }
                        }}
                    >
                        {paramsIndex !== formikParams.values.params.length - 1 ? "Save" : "Add"}
                    </Button>
                </Grid>
                <FormHelperText>
                    Don't forget to click on ADD if you want to save the params
                </FormHelperText>
            </Grid>
        </form>
    <form onSubmit={formikReturnValue.handleSubmit}>
        <h2>Params</h2>
        <Grid container spacing={2}>
            {showReturnValueChips &&
            <Grid container direction="row"
                  justify="flex-start"
                  alignItems="center" spacing={1}>
                <GenerateChipsTooltipEditable id={"chips"} chips={formikReturnValue.values.returnValue}
                                              handleDelete={handleDeleteReturnValue}
                                              handleClick={reEditReturnValue}/>
            </Grid>
            }

            <Grid item xs={4}>
                <TextField
                    name={`returnValue[${returnValueIndex}].name`}
                    variant="outlined"
                    fullWidth
                    label="Name"
                    autoFocus
                    value={formikReturnValue.values.returnValue[returnValueIndex].name}
                    onChange={formikReturnValue.handleChange}
                    error={formikReturnValue.touched.returnValue && isErrorReturnValue(returnValueIndex, "name")}
                    helperText={formikReturnValue.touched.returnValue && whichErrorReturnValue(returnValueIndex, "name")}
                />
            </Grid>
            <Grid item xs={4}>
                <Autocomplete
                    id={`returnValue[${returnValueIndex}].type`}
                    name={`returnValue[${returnValueIndex}].type`}
                    options={type}
                    getOptionLabel={option => option}
                    getOptionSelected={(option,value) => option === value}
                    value={formikReturnValue.values.returnValue[returnValueIndex].type}
                    onChange={(e, value) => {
                        formikReturnValue.setFieldValue(
                            `returnValue[${returnValueIndex}].type`,
                            value
                        );
                    }}
                    renderInput={params => (
                        <TextField
                            label="Type"
                            fullWidth
                            required
                            variant="outlined"
                            name={`returnValue[${returnValueIndex}].type`}
                            {...params}
                        />
                    )}
                />

            </Grid>
            <Grid item xs={4}>
                <TextField
                    name={`returnValue[${returnValueIndex}].defaultValue`}
                    variant="outlined"
                    fullWidth
                    label="Default value"
                    value={formikReturnValue.values.returnValue[returnValueIndex].defaultValue}
                    onChange={formikReturnValue.handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name={`returnValue[${returnValueIndex}].description`}
                    variant="outlined"
                    fullWidth
                    multiline
                    required
                    rows={4}
                    label="Description"
                    value={formikReturnValue.values.returnValue[returnValueIndex].description}
                    onChange={formikReturnValue.handleChange}
                />
            </Grid>
            <Grid container direction="row"
                  justify="flex-end"
                  alignItems="flex-start">
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={returnValueIndex !== formikReturnValue.values.returnValue.length - 1 ? <DoneIcon/> :
                        <AddCircleIcon/>}
                    type={returnValueIndex !== formikReturnValue.values.returnValue.length - 1 ? null : "submit"}
                    onClick={() => {
                        if (returnValueIndex !== formikReturnValue.values.returnValue.length - 1) {
                            setReturnValueIndex(formikReturnValue.values.returnValue.length - 1)
                        }
                    }}
                >
                    {returnValueIndex !== formikReturnValue.values.returnValue.length - 1 ? "Save" : "Add"}
                </Button>
            </Grid>
            <FormHelperText>
                Don't forget to click on ADD if you want to save the return
            </FormHelperText>
        </Grid>
        {/*const ButtonsStepper = (props) => {
        <React.Fragment>
        <div className={classes.buttons}>
            <Button onClick={props.handleBack} className={classes.button}>
                Back
            </Button>
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={props.disabled}

        >
        {activeStep === steps.length - 1 ? 'Publish my function' : 'Next'}
        </Button>
        </div>
        </React.Fragment>
    }*/}
    </form>
            {props.stepper}
        </>
    );
}


