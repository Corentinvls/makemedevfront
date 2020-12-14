import React from 'react';

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import ChipInput from "material-ui-chip-input";
import CustomDraft from "../../utils/components/CustomDraft";
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


    const validationSchemaParams = yup.object({
            params: yup.array(
                yup.object({
                    name: yup.string('Enter a name').matches(regexFunctionName, 'Enter a valid parameter name').required("A name is required"),
                    type: yup.string("Enter a type").required("A type is required"),
                    description: yup.string('Enter a description').required("A description is required"),
                    defaultValue: yup.string('Enter a default value')
                }))
        })
    ;

    const formikParams = useFormik({
        initialValues: {
            params: props.params ? props.params : [{
                name: "",
                type: "String",
                description: "",
                defaultValue: ""
            }]
        },
        validationSchema: validationSchemaParams,
        onSubmit: (values) => {
            formikParams.values.params.push({
                name: "",
                type: "",
                defaultValue: "",
                description: ""
            })
            formikParams.values.params[0] ? setParamsChips(formikParams.values.params[0].name !== "") : setParamsChips(false)
            setParamsIndex(formikParams.values.params.length - 1)
            setState({});
        },
    });

    function handleDelete(valueToDelete, index) {
        if (valueToDelete === "params") {
            formikParams.values.params(index, 1)
            setState({});
        }
        if (valueToDelete === "returnValue") {
            formikParams.values.returnValue(index, 1)
            setState({});
        }

    }

    function reEdit(valueToEdit, index) {
        if (valueToEdit === "params") {
            setParamsIndex(index)
        }
        /* if (valueToEdit === "returnValue") {
             setReturnValueIndex(index)
             setState({});
         }*/
    }
    React.useEffect(() => {
       setState({})
        console.log(formikParams.touched.params);
        console.log(Boolean(formikParams.errors.params));

        console.log(paramsIndex);
    }, [paramsIndex]);

    return (
        <form onSubmit={formikParams.handleSubmit}>
            <h2>Params</h2>
            <Grid container spacing={2}>
                {showParamsChips &&
                <Grid container direction="row"
                      justify="flex-start"
                      alignItems="center" spacing={1}>
                    <GenerateChipsTooltipEditable id={"chips"} chips={formikParams.values.params} valueToEdit={"params"}
                                                  handleDelete={handleDelete}
                                                  handleClick={reEdit}/>
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
                        error={(formikParams.touched.params && Boolean(formikParams.errors.params)) }
                        helperText={(formikParams.touched.params && Boolean(formikParams.errors.params)) && 'Enter a valid parameter name'}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete
                        id={`params[${paramsIndex}].type`}
                        name={`params[${paramsIndex}].type`}
                        options={type}
                        getOptionLabel={option => option}
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
                        error={(formikParams.touched.params && Boolean(formikParams.errors.params)) }
                        helperText={(formikParams.touched.params && Boolean(formikParams.errors.params)) }

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
                        startIcon={<AddCircleIcon/>}
                        type={"submit"}
                    >
                        Add
                    </Button>
                </Grid>
                <FormHelperText>
                    Don't forget to click on ADD if you want to save the params
                </FormHelperText>
            </Grid>
        </form>
    );
}


