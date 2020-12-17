import React from 'react';
import {connect} from "react-redux/";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EditableAvatar from "../components/profile/EditableAvatar";
import {logOut, updateUser} from "../store/actions";
import {setUpdateUser} from "../request/userRequest";
import EditableField from "../components/profile/EditableField";
import {getPostById, searchPosts} from "../request/postRequest";
import RecipeReviewCard from "../components/cards/cardFunction/cardFunction";
import GridList from "@material-ui/core/GridList";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14),
    },
    paperProfile: {
        width: '90%',
        margin: 10
        , padding: 10
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

function ProfileView(props) {
    const classes = useStyles();
    console.log(props)

    const [user, setUser] = React.useState({
        "id": "",
        "pseudo": "",
        "mail": "",
        "avatar": ""
    })
    const [myPost, setMyPost] = React.useState([])
    const [, setState] = React.useState()
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
            if(myPost.length===0){
                props.user.post.map((id) => {getPost(id)})
            }

            setState("ready")
        }
    }, [props])

    async function getPost(id) {
        let response = await getPostById(id)
        response = await response
        if (response.success) {
            if(!myPost.includes(response.success)) {
                myPost.push(response.success)
                setMyPost(myPost)
                setState({})
            }
        }
    }

    return (
        <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
        >
            <Paper className={classes.paperProfile}>
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item>
                        <EditableAvatar pseudo={user.pseudo} avatar={user.avatar}
                                        handleChangeAvatar={(value) => handleChange("avatar", value)}/>
                    </Grid>
                    <Grid container
                          direction="row"
                          justify="space-evenly">
                        <EditableField field={user.pseudo}
                                       handleChangeField={(value) => handleChange("pseudo", value)}/>
                        <EditableField field={user.mail} handleChangeField={(value) => handleChange("mail", value)}/>
                    </Grid>
                </Grid>
            </Paper>
            <Paper className={classes.paperProfile}>
                <h2>My posts</h2>
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={6}>
                    {myPost.length >= 1 &&
                    myPost.map((post, key) => {
                        return <RecipeReviewCard post={post} key={key} />
                    })
                    }
                </GridList>
            </div>
            </Paper>

        </Grid>

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



