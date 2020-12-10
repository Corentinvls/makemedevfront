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
    const type = [
        '',
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

    function useInput(initialValue,stateSaver) {
        const [value, setValue] = React.useState(initialValue);

        function handleChange(e) {
            setValue(e.target.value);
            if(stateSaver){
                 stateSaver()
            }

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
    const [paramsIndex, setParamsIndex] = React.useState(0);
    const [showParamsChips, setShowParamsChips] = React.useState(false);

    const [returnValue, setReturnValue] = React.useState({name: "", type: "", defaultValue: "", description: ""});
    const [returnValueName, handleReturnValueName] = useInput('',()=>updateReturnValue());
    const [returnValueDescription, handleReturnValueDescription] = useInput('',()=>updateReturnValue());
    const [returnValueType, setReturnValueType] = React.useState('');
    const [returnValueDefaultValue, handleReturnValueDefaultValue] = useInput('',()=>updateReturnValue());

    let [, setState] = React.useState();

    function handleDelete(index) {
        params.splice(index, 1)
        setParams(params);
        setState({});
    }

    function resetParams() {
        resetParamsName()
        resetParamsDescription()
        resetParamsDefaultValue()
        setParamsType("")
    }

    function updateParams() {
        params.splice(paramsIndex, 1, {
            name: paramsName,
            type: paramsType,
            defaultValue: paramsDefaultValue,
            description: paramsDescription
        });
        setParams(params)
        resetParams()
        setParamsIndex(params.length)
        setShowParamsChips(true)
        setState({});
    }

     function updateReturnValue() {
        let returnValue = {
            name:returnValueName,
            description:returnValueDescription,
            type:returnValueType,
            defaultValue:returnValueDefaultValue

        };
        setReturnValue(returnValue);
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

                    {showParamsChips &&
                    <Grid container direction="row"
                          justify="flex-start"
                          alignItems="center" spacing={1} >
                        <GenerateChipsTooltipEditable id={"chips"} chips={params} handleDelete={handleDelete}
                                                      handleClick={reEditParams}/>
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
                            onClick={updateParams}
                        >
                            Add
                        </Button>
                    </Grid>
                    <FormHelperText>
                    Don't forget to click on ADD if you want to save the params
                </FormHelperText>
                </Grid>
            </form>
            <h2>Return value</h2>
            <Grid container spacing={2}>
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
                            updateReturnValue()
                        }}
                        value={returnValueType}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Default value"
                        name="dafaultValue"
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
                <FormHelperText>
                    Only one RETURN value if your return is ok click NEXT
                </FormHelperText>
            </Grid>
        </>
    );
}
