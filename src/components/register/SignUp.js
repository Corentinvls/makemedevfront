import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import {Formik} from "formik";
import {SignUpSchema} from "../../utils/validationForm";
import DialogActions from "@material-ui/core/DialogActions";
import {getUser} from "../../store/actions";
import {connect} from "react-redux";
import {setSignUp} from "../../request/userRequest";



function SignUp(props) {
    const classes = useStyles();
    const {open, onClose, toggleSignDialogs} = props;

    async function submitValidation(values, action) {
        const data = {user: {pseudo: values.pseudo, mail: values.mail, password: values.password}}
        let response = await setSignUp(data)

        if (response.error) {
            action.setErrors({
                pseudo: response.error.pseudo ? "Pseudo is already used" : null,
                mail: response.error.mail ? "E-mail is already used" : null
            });
        } else if (response.success) {
            props.sendUser(response.success, response.token)
            onClose()
        }
    }

    return (
        <Dialog
            style={{textAlign: 'center'}}
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="simple-dialog-title" col={12}>
                <Typography variant={"h2"}>Sign up</Typography>
            </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{pseudo: '', mail: '',  password: ''}}
                    onSubmit={async (values, action) => {
                        await submitValidation(values, action);
                    }}

                    validationSchema={SignUpSchema}
                >
                    {(props) => {
                        const {
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        } = props;
                        return (
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoFocus
                                            className={classes.textField}
                                            variant="outlined"
                                            label="Pseudo"
                                            name="pseudo"
                                            value={values.pseudo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.pseudo && touched.pseudo}
                                            helperText={(errors.pseudo && touched.pseudo) && errors.pseudo}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.textField}
                                            variant="outlined"
                                            label="E-mail"
                                            name="mail"
                                            value={values.mail}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.mail && touched.mail}
                                            helperText={(errors.mail && touched.mail) && errors.mail}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.textField}
                                            variant="outlined"
                                            label="Password"
                                            name="password"
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.password && touched.password}
                                            helperText={(errors.password && touched.password) && errors.password}
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>

                                <DialogActions>
                                    <Button type="submit" disabled={(errors.password && touched.password) && errors.password}>
                                        Submit
                                    </Button>
                                </DialogActions>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link onClick={toggleSignDialogs} variant="body2">
                                            No account? Sign Up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        );
                    }}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}


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
    textField: {
        width: '100%'
    }
}));

const mapDispatchToProps = dispatch => {
    return {
        sendUser: (user, token) => dispatch(getUser(user, token)),
    };
};

export default connect(null, mapDispatchToProps)(SignUp)
