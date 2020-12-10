import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import generateChipsTooltipEditable from "../../utils/generateChipsTooltipEditable";
import GenerateChipsTooltipEditable from "../../utils/generateChipsTooltipEditable";


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
    const type = [
        'String',
        'Number',
        'Boolean',
        'Null',
        'Undefined',
        'Object',
        'BigInt',
        'Function',
        'Symbol',
        'Array',
        'Other',
    ];

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

    const [params, setParams] = React.useState([{name: "", type: "", defaultValue: "", description: ""}]);
    const [paramsName, handleParamsName, resetParamsName, setParamsName] = useInput('');
    const [paramsDescription, handleParamsDescription, resetParamsDescription, setParamsDescription] = useInput('');
    const [paramsType, setParamsType] = React.useState('');
    const [paramsDefaultValue, handleParamsDefaultValue, resetParamsDefaultValue, setParamsDefaultValue] = useInput('');

    const [returnValue, setReturnValue] = React.useState([]);
    const [paramsIndex, setParamsIndex] = React.useState(0);
    const [returnValueIndex, setReturnValueIndex] = React.useState(0);
    let [, setState] = React.useState();

    function handleDelete(index) {
        params.splice(index, 1)
        setParams(params);
        setState({});
    }

    function updateParams() {
        params.splice(paramsIndex, 1, {
            name: paramsName,
            type: paramsType,
            defaultValue: paramsDefaultValue,
            description: paramsDescription
        });
        setParams(params)
        resetParamsName()
        resetParamsDescription()
        resetParamsDefaultValue()
        setParamsType("")
        setParamsIndex(params.length)
        setState({});
    }

    function reEditParams(index) {
        setParamsIndex(index)
        setParamsName(params[index].name)
        setParamsDescription(params[index].description)
        setParamsType(params[index].type)
        setParamsDefaultValue(params[index].defaultValue)
    }

    return (
        <>
            <form className={classes.form}>
                <h2>Params</h2>

                <Grid container spacing={2}>
                    <Grid item xs={12} spacing={2}>
                        <GenerateChipsTooltipEditable id={"chips"} chips={params} handleDelete={handleDelete}
                                                      handleClick={reEditParams}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            name="params"
                            variant="outlined"
                            required
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
                            value={paramsType}
                            renderInput={(params) =>
                                <TextField {...params} label="Type *" variant="outlined"/>}
                            onChange={(event, value) => {
                                setParamsType(value)
                            }}
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
                            required
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
                            sub
                            onClick={updateParams}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <h2>Return value</h2>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        label="Name"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete
                        options={type}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} label="Type *" variant="outlined"/>}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        variant="outlined"
                        fullWidth

                        label="Default value"
                        name="dafaultValue"
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
                    />
                </Grid>
            </Grid>
        </>
    );
}
