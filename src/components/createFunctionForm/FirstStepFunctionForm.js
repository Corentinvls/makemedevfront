import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import CustomDraft from "../../utils/components/CustomDraft";
import ChipInput from 'material-ui-chip-input'

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
}));

export default function FirstStepFunctionForm(props) {
    const classes = useStyles();
    const [tags,setTags]=React.useState([]);

    return (
        <>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="Your Title"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ChipInput
                            value={tags}
                            name="tags"
                            required
                            variant="outlined"
                            fullWidth
                            id="tags"
                            label="Tags"
                            newChipKeyCodes={[13,32,10]}
                            newChipKeys={[",",";"]}
                            onChange={(chips)=> {
                                setTags(chips)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                       <CustomDraft/>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
