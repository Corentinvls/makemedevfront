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
import {Formik} from 'formik';
import DialogActions from "@material-ui/core/DialogActions";
import {getUser} from "../../store/actions";
import {connect} from "react-redux";
import {SignInSchema} from "../../utils/validationForm";
import {setSignIn} from "../../request/userRequest";


function SignIn(props) {
    const classes = useStyles();
    const {open, onClose, toggleSignDialogs} = props;

    async function submitValidation(values, action) {
        const data = {user: {login: values.login, password: values.password}}
        let response = await setSignIn(data)
        if (response.error === "login incorrect") {
            action.setErrors({
                login: "Pseudo or E-mail is incorrect !"
            });
        } else if (response.error === "mot de passe incorrect"){
            action.setErrors({
                password: "Password is incorrect !"
            });
        } else if (response.success) {
            props.sendUser(response.success, response.token)
            onClose()
        } else {
            action.setErrors({
                login: "Pseudo or E-mail is incorrect !",
                password: "Password is incorrect !"
            });
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
                <Typography variant={"h2"}>Sign In</Typography>
            </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{login: '', password: ''}}
                    onSubmit={async (values, action) => {
                        await submitValidation(values, action);
                    }}

                    validationSchema={SignInSchema}
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
                                            label="Login or E-mail"
                                            name="login"
                                            value={values.login}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.login && touched.login}
                                            helperText={(errors.login && touched.login) && errors.login}
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

export default connect(null, mapDispatchToProps)(SignIn)


