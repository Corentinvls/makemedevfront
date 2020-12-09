import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button} from "@material-ui/core";


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
    width:{
        width: '100%'
    }
}));

export default function SecondStepFunctionForm(props) {
    const classes = useStyles();
    const type = [
        { type: 'String'},
        { type: 'Number' },
        { type: 'Boolean' },
        { type: 'Null' },
        { type: 'Undefined' },
        { type: 'Object' },
        { type: 'BigInt' },
        { type: 'Function' },
        { type: 'Symbol' },
        { type: 'Array' },
        { type: 'Other' },
    ];

    return (
        <>
            <form className={classes.form} noValidate>
                <h2>Params</h2>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={type}
                            getOptionLabel={(option) => option.type}
                            renderInput={(params) => <TextField {...params} label="Type *" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="defaultValue"
                            label="Default value"
                            name="dafaultValue"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="description"
                            label="Description"
                            name="description"
                        />
                    </Grid>
                    <Button variant="contained" color="primary">
                        Primary
                    </Button>
                </Grid>
                <h2>Return value</h2>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={type}
                            getOptionLabel={(option) => option.type}
                            renderInput={(params) => <TextField {...params} label="Type *" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="defaultValue"
                            label="Default value"
                            name="dafaultValue"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="description"
                            label="Description"
                            name="description"
                        />
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
