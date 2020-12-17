import React from 'react';
import {connect} from "react-redux/";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EditableAvatar from "../components/profile/EditableAvatar";
import {logOut, updateUser} from "../store/actions";
import {setUpdateUser} from "../request/userRequest";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14),
    },
}));

function ProfileView(props) {
    const classes = useStyles();
    const [user,setUser]=React.useState({"id": "",
        "pseudo" : "",
        "mail": "",
        "avatar" : ""})
    const [,setState]=React.useState()
    const handleChange = (field, value) => {
        const data = {
            "user": {
                [field]: value
            }
        }

        setUpdateUser(data).then((response) => {
            console.log(response)
            props.updateUser(response.success, response.token)
        })
    }
    React.useEffect(() => {
        if (props.user) {
            setUser(props.user)
            setState("ready")
        }
    }, [props])
    return (

        <Paper style={{backgroundColor: '#f4f5f7'}}>
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
            >
                <Grid item>
                <EditableAvatar pseudo={user.pseudo} avatar={user.avatar}
                                handleChangeAvatar={(value) => handleChange("avatar",value)}/>
                </Grid>
                <Grid  container
                       direction="row"
                       justify="space-evenly"
                       alignItems="center">
                  <h2>{user.pseudo}</h2>   <h2>{user.mail}</h2>
                </Grid>
            </Grid>
        </Paper>

    );
}

const mapStateToProps = state => {
    return {
        user: state.user,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(logOut()),
        updateUser: (user, token) => dispatch(updateUser(user, token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView)



