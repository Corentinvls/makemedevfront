import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GenerateChipsTooltipEditable from "../../utils/generateChipsTooltipEditable";
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
    width: {
        width: '100%'
    }
}));
export default function SecondStepFunctionForm(props) {
    const classes = useStyles();
    const type = ['', 'String', 'Number', 'Boolean', 'Array', 'Object', 'Function', 'BigInt', 'Null', 'Symbol', 'Other', 'Undefined'];

    function useInput(initialValue) {
        const [value, setValue] = React.useState(initialValue);

        function handleChange(e) {
            setValue(e.target.value);
        }

        function resetValue() {
            setValue("");
        }

        return [value, handleChange, resetValue, setValue];
    }

    const [params, setParams] = React.useState(props.params ? props.params : [{
        name: "",
        type: "",
        defaultValue: "",
        description: ""
    }]);
    const [paramsName, handleParamsName, resetParamsName, setParamsName] = useInput('');
    const [paramsDescription, handleParamsDescription, resetParamsDescription, setParamsDescription] = useInput('');
    const [paramsType, setParamsType] = React.useState('');
    const [paramsDefaultValue, handleParamsDefaultValue, resetParamsDefaultValue, setParamsDefaultValue] = useInput('');
    const [paramsIndex, setParamsIndex] = React.useState(0);
    const [showParamsChips, setShowParamsChips] = React.useState(!!props.params);

    const [returnValue, setReturnValue] = React.useState(props.returnValue ? props.returnValue : [{
        name: "",
        type: "",
        defaultValue: "",
        description: ""
    }]);
    const [returnValueName, handleReturnValueName, resetReturnValueName, setReturnValueName] = useInput('');
    const [returnValueDescription, handleReturnValueDescription, resetReturnValueDescription, setReturnValueDescription] = useInput('')
    const [returnValueType, setReturnValueType] = React.useState('');
    const [returnValueDefaultValue, handleReturnValueDefaultValue, resetReturnValueDefaultValue, setReturnValueDefaultValue] = useInput('');
    const [returnValueIndex, setReturnValueIndex] = React.useState(0);
    const [showReturnValueChips, setShowReturnValueChips] = React.useState(!!props.returnValue);

    let [, setState] = React.useState();

    function handleDelete(valueToDelete, index) {
        if (valueToDelete === "params") {
            params.splice(index, 1)
            setParams(params);
            setState({});
        }
        if (valueToDelete === "returnValue") {
            returnValue.splice(index, 1)
            setReturnValue(returnValue);
            setState({});
        }

    }

    function resetValues(value) {
        if (value === "params") {
            resetParamsName();
            setParamsType("");
            resetParamsDefaultValue();
            resetParamsDescription();
        }
        if (value === "returnValue") {
            resetReturnValueName();
            setReturnValueType('');
            resetReturnValueDefaultValue();
            resetReturnValueDescription();

        }

    }

    function updateParams() {
        params.splice(paramsIndex, 1, {
            name: paramsName,
            type: paramsType,
            defaultValue: paramsDefaultValue,
            description: paramsDescription
        });
        setParams(params)
        resetValues("params")
        setParamsIndex(params.length)
        setShowParamsChips(true)
        setState({});
    }

    function updateReturnValue() {
        returnValue.splice(returnValueIndex, 1, {
            name: returnValueName,
            type: returnValueType,
            defaultValue: returnValueDefaultValue,
            description: returnValueDescription
        });
        setReturnValue(returnValue)
        resetValues("returnValue")
        setReturnValueIndex(returnValue.length)
        setShowReturnValueChips(true)
        setState({});
    }

    function reEdit(valueToEdit, index) {
        if (valueToEdit === "params") {
            setParamsIndex(index)
            setParamsName(params[index].name)
            setParamsDescription(params[index].description)
            setParamsType(params[index].type)
            setParamsDefaultValue(params[index].defaultValue)
        }
        if (valueToEdit === "returnValue") {
            setReturnValueIndex(index)
            setReturnValueName(returnValue[index].name)
            setReturnValueDescription(returnValue[index].description)
            setReturnValueType(returnValue[index].type)
            setReturnValueDefaultValue(returnValue[index].defaultValue)
        }

    }

    React.useEffect(() => {
        props.saveData({params: params, returnValue: returnValue})
        /* props.isSecondStepDone({params: params, returnValue: returnValue})*/
    }, [params, returnValue]);
    return (
        <>
            <form className={classes.form}>
                <h2>Params</h2>

                <Grid container spacing={2}>

                    {showParamsChips &&
                    <Grid container direction="row"
                          justify="flex-start"
                          alignItems="center" spacing={1}>
                        <GenerateChipsTooltipEditable id={"chips"} chips={params} valueToEdit={"params"} handleDelete={handleDelete}
                                                      handleClick={reEdit}/>
                    </Grid>
                    }

                    <Grid item xs={4}>
                        <TextField
                            name="params"
                            variant="outlined"
                            fullWidth
                            label="Name"
                            autoFocus
                            value={paramsName}
                            onChange={handleParamsName}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            options={type}
                            getOptionLabel={(option) => option}
                            getOptionSelected={(option, value) => option === value}
                            renderInput={(params) =>
                                <TextField {...params} label="Type *" variant="outlined"/>}
                            onChange={(event, value) => {
                                setParamsType(value)
                            }}
                            value={paramsType}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Default value"
                            name="defaultValue"
                            value={paramsDefaultValue}
                            onChange={handleParamsDefaultValue}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            name="description"
                            value={paramsDescription}
                            onChange={handleParamsDescription}
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
                            onClick={()=>updateParams()}
                        >
                            Add
                        </Button>
                    </Grid>
                    <FormHelperText>
                        Don't forget to click on ADD if you want to save the params
                    </FormHelperText>
                </Grid>
            </form>
            <h2>Return</h2>
            <Grid container spacing={2}>
                {showReturnValueChips &&
                <Grid container direction="row"
                      justify="flex-start"
                      alignItems="center" spacing={1}>
                    <GenerateChipsTooltipEditable id={"chips"} chips={returnValue} valueToEdit={"returnValue"} handleDelete={handleDelete}
                                                  handleClick={reEdit}/>
                </Grid>
                }
                <Grid item xs={4}>
                    <TextField
                        name="name"
                        variant="outlined"
                        fullWidth
                        label="Name"
                        value={returnValueName}
                        onChange={handleReturnValueName}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete
                        options={type}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} label="Type *" variant="outlined"/>}
                        onChange={(event, value) => {
                            setReturnValueType(value)
                        }}
                        value={returnValueType}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Default value"
                        name="defaultValue"
                        value={returnValueDefaultValue}
                        onChange={handleReturnValueDefaultValue}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        multiline
                        rows={4}
                        label="Description"
                        name="description"
                        value={returnValueDescription}
                        onChange={handleReturnValueDescription}
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
                        onClick={()=>updateReturnValue()}
                    >
                        Add
                    </Button>
                </Grid>
                <FormHelperText>
                    Don't forget to click on ADD if you want to save the return value
                </FormHelperText>
            </Grid>
        </>
    );
}
