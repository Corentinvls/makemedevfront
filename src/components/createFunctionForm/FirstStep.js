import React from 'react';

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";
import CustomDraft from "../../utils/components/CustomDraft";
import FormHelperText from "@material-ui/core/FormHelperText";
import makeStyles from "@material-ui/core/styles/makeStyles";




export default function FirstStepFunction(props) {

const{formik} = props;
    const [,setState]=React.useState();
    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant={"outlined"}
                        required
                        autoFocus
                        id="name"
                        name="name"
                        label="Your function name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ChipInput
                        name="tag"
                        variant="outlined"
                        fullWidth
                        id="tag"
                        label="Tag"
                        defaultValue={formik.values.tag}
                        newChipKeyCodes={[13, 32, 10]}
                        newChipKeys={[",", ";"]}
                        onChange={(chip)=>formik.values.tag=chip}
                        error={formik.touched.tag && Boolean(formik.errors.tag)}
                        helperText={formik.touched.tag && formik.errors.tag} />
                </Grid>
                <Grid item xs={12}>
                    <CustomDraft
                        value={formik.values.post.description}
                        onChange={(value) => {
                            formik.values.post.description  = value
                            setState({})
                        }}
                    />
                    {Boolean(formik.errors.post) &&
                    <FormHelperText  error={formik.touched.post && Boolean(formik.errors.post)}>
                        {formik.errors.post.description}
                    </FormHelperText>}
                </Grid>
                {props.stepper}
            </Grid>

        </form>
    );
}


