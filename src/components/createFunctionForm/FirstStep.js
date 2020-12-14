import React from 'react';

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import ChipInput from "material-ui-chip-input";
import CustomDraft from "../../utils/components/CustomDraft";
import FormHelperText from "@material-ui/core/FormHelperText";




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
                        name="tags"
                        variant="outlined"
                        fullWidth
                        id="tags"
                        label="Tags"
                        defaultValue={formik.values.tags}
                        newChipKeyCodes={[13, 32, 10]}
                        newChipKeys={[",", ";"]}
                        onChange={(chip)=>formik.values.tags=chip}
                        error={formik.touched.tags && Boolean(formik.errors.tags)}
                        helperText={formik.touched.tags && formik.errors.tags} />
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


