import React, {useState} from 'react';

import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import ChipInput from 'material-ui-chip-input'
import CustomDraft from "../../utils/components/CustomDraft";

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

    const [name, setName] = useState(props.name ? props.name : "");
    const [tags, setTags] = useState(props.tags ? props.tags : []);
    const [description, setDescription] = useState(props.post ? props.post.description : "");

    React.useEffect(() => {
        props.saveData({name: name, tags: tags, description: description})
        props.isFirstStepDone({name: name, tags: tags, description: description})
    }, [name, tags, description]);

    return (
        <>
            <form className={classes.form} noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Your function Name"
                            autoFocus
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ChipInput
                            defaultValue={tags}
                            name="tags"
                            required
                            variant="outlined"
                            fullWidth
                            id="tags"
                            label="Tags"
                            newChipKeyCodes={[13, 32, 10]}
                            newChipKeys={[",", ";"]}
                            onChange={(chips) => {
                                setTags(chips)
                            }}
                            helperText={"One required | Max five tags | Only AlphaNumeric and '.' '-' "}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomDraft
                            value={description}
                            onChange={(value) => {
                                setDescription(value);
                            }}
                        />
                        <FormHelperText>
                            Explain your function here, you will write your function in the third step
                        </FormHelperText>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
