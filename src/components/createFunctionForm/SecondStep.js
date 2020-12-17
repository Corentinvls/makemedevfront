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
export default function SecondStepFunction(props) {
    const classes = useStyles();
    const type = ['String', 'Number', 'Boolean', 'Array', 'Object', 'Function', 'BigInt', 'Null', 'Symbol', 'Other'];
    const [, setState] = React.useState();
    const [showParamsChips, setParamsChips] = React.useState(props.params.length > 1);
    const [paramsIndex, setParamsIndex] = React.useState(props.params.length-1);
    const [showReturnsChips, setReturnsChips] = React.useState(props.returns.length > 1);
    const [returnsIndex, setReturnsIndex] = React.useState(props.returns.length-1);

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
        returns: yup.array(
            yup.object({
                name: yup.string('Enter a name').matches(regexFunctionName, 'Enter a valid name').required("A name is required"),
                type: yup.string("Enter a type").required("A type is required"),
                description: yup.string('Enter a description').required("A description is required"),
                defaultValue: yup.string('Enter a default value')
            }))
    });

    const formikParams = useFormik({
        initialValues: {
            params:  props.params
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            formikParams.values.params.push({
                name: "",
                type: "String",
                defaultValue: "",
                description: ""
            })
            let paramsToSave = formikParams.values.params;
            props.saveFunctionData("params", paramsToSave)
            formikParams.values.params[0] ? setParamsChips(formikParams.values.params[0].name !== "") : setParamsChips(false)
            setParamsIndex(formikParams.values.params.length - 1)
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

    const formikReturns = useFormik({
        initialValues: {
            returns:  props.returns
        },
        validationSchema: validationSchemaReturn,
        onSubmit: (values) => {
            formikReturns.values.returns.push({
                name: "",
                type: "String",
                defaultValue: "",
                description: ""
            })
            let returnsToSave = formikReturns.values.returns;
            props.saveFunctionData("returns", returnsToSave)
            formikReturns.values.returns[0] ? setReturnsChips(formikReturns.values.returns[0].name !== "") : setReturnsChips(false)
            setReturnsIndex(formikReturns.values.returns.length - 1)
        },
    });
    const isErrorReturns = (index, field) => {
        if (formikReturns.errors) {
            if (formikReturns.errors.returns) {
                if (formikReturns.errors.returns[index]) {
                    if (formikReturns.errors.returns[index][field]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    const whichErrorReturns = (index, field) => {
        if (formikReturns.errors) {
            if (formikReturns.errors.returns) {
                if (formikReturns.errors.returns[index]) {
                    if (formikReturns.errors.returns[index][field]) {
                        return formikReturns.errors.returns[index][field];
                    }
                }
            }
        }
        return null;
    }
    function handleDeleteReturns(index) {
        formikReturns.values.returns.splice(index, 1)
        setReturnsIndex(formikReturns.values.returns.length - 1)
    }
    function reEditReturns(index) {
        setReturnsIndex(index)
    }

    React.useEffect(() => {
        setState({})
    }, [paramsIndex, returnsIndex]);


    function isError(formik,field) {
        if (JSON.stringify(formik.errors) !== "{}") {
            let errors = (formik.errors[field].map((error) => {
                return typeof error
            }));
            errors.pop()
            return errors.includes("object");
        }
    }

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
                            error={ isErrorParams(paramsIndex, "name")}
                            helperText={ whichErrorParams(paramsIndex, "name")}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            id={`params[${paramsIndex}].type`}
                            name={`params[${paramsIndex}].type`}
                            options={type}
                            getOptionLabel={option => option}
                            disableClearable={true}
                            getOptionSelected={(option, value) => option === value}
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
            <form onSubmit={formikReturns.handleSubmit}>
                <h2>Returns</h2>
                <Grid container spacing={2}>
                    {showReturnsChips &&
                    <Grid container direction="row"
                          justify="flex-start"
                          alignItems="center" spacing={1}>
                        <GenerateChipsTooltipEditable id={"chips"} chips={formikReturns.values.returns}
                                                      handleDelete={handleDeleteReturns}
                                                      handleClick={reEditReturns}/>
                    </Grid>
                    }

                    <Grid item xs={4}>
                        <TextField
                            name={`returns[${returnsIndex}].name`}
                            variant="outlined"
                            fullWidth
                            label="Name"
                            autoFocus
                            value={formikReturns.values.returns[returnsIndex].name}
                            onChange={formikReturns.handleChange}
                            error={isErrorReturns(returnsIndex, "name")}
                            helperText={whichErrorReturns(returnsIndex, "name")}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            id={`returns[${returnsIndex}].type`}
                            name={`returns[${returnsIndex}].type`}
                            options={type}
                            disableClearable={true}
                            getOptionLabel={option => option}
                            getOptionSelected={(option, value) => option === value}
                            value={formikReturns.values.returns[returnsIndex].type}
                            onChange={(e, value) => {
                                formikReturns.setFieldValue(
                                    `returns[${returnsIndex}].type`,
                                    value
                                );
                            }}
                            renderInput={params => (
                                <TextField
                                    label="Type"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    name={`returns[${returnsIndex}].type`}
                                    {...params}
                                />
                            )}
                        />

                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            name={`returns[${returnsIndex}].defaultValue`}
                            variant="outlined"
                            fullWidth
                            label="Default value"
                            value={formikReturns.values.returns[returnsIndex].defaultValue}
                            onChange={formikReturns.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name={`returns[${returnsIndex}].description`}
                            variant="outlined"
                            fullWidth
                            multiline
                            required
                            rows={4}
                            label="Description"
                            value={formikReturns.values.returns[returnsIndex].description}
                            onChange={formikReturns.handleChange}
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
                            startIcon={returnsIndex !== formikReturns.values.returns.length - 1 ?
                                <DoneIcon/> :
                                <AddCircleIcon/>}
                            type={returnsIndex !== formikReturns.values.returns.length - 1 ? null : "submit"}
                            onClick={() => {
                                if (returnsIndex !== formikReturns.values.returns.length - 1) {
                                    setReturnsIndex(formikReturns.values.returns.length - 1)
                                }
                            }}
                        >
                            {returnsIndex !== formikReturns.values.returns.length - 1 ? "Save" : "Add"}
                        </Button>
                    </Grid>
                    <FormHelperText>
                        Don't forget to click on ADD if you want to save the return
                    </FormHelperText>
                </Grid>

            </form>
            <div className={classes.buttons}>
                <Button onClick={props.handleBack} className={classes.button}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                        let paramsToSave = formikParams.values.params;
                        paramsToSave.pop();
                        props.saveFunctionData("params", paramsToSave)
                        let returnsToSave = formikReturns.values.returns;
                        returnsToSave.pop();
                        props.saveFunctionData("returns", returnsToSave)
                        props.handleNext()
                    }}
                    disabled={isError(formikParams,"params")||isError(formikReturns,"returns")}
                >
                    Next
                </Button>
            </div>
        </>
    );
}


