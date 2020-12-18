import React from 'react';
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EditableAvatar from "../components/profile/EditableAvatar";
import {logOut, updateUser} from "../store/actions";
import {setUpdateUser} from "../request/userRequest";
import EditableField from "../components/profile/EditableField";
import {getPostById} from "../request/postRequest";
import GridList from "@material-ui/core/GridList";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ActivityCards from "../components/profile/ActivityCards";
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CommentIcon from '@material-ui/icons/Comment';
import Container from "@material-ui/core/Container";
import CardFunctionNameProfile from "../components/cards/cardProfile/CardFunctionNameProfile";

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

    const [user, setUser] = React.useState({
        "id": "",
        "pseudo": "",
        "mail": "",
        "avatar": ""
    })
    const [myPost, setMyPost] = React.useState([])
    const [myLike, setLike] = React.useState([])
    const [myDislike, setDislike] = React.useState([])
    const [myResponse, setResponse] = React.useState([])
    const [myComment, setComment] = React.useState([])
    const [, setState] = React.useState()
    const handleChange = (field, value) => {
        const data = {
            "user": {
                [field]: value
            }
        }
        setUpdateUser(data).then((response) => {
            props.updateUser(response.success, response.token)
        })
    }
    React.useEffect(() => {
        if (props.user) {
            setUser(props.user)
            if (myPost.length === 0) {
                props.user.post.forEach((id) => {
                    getPost(id)
                })
            }
            if (myLike.length === 0) {
                props.user.activities.like.forEach((id) => {
                    getPostActivity(id, "like")
                })
            }
            if (myDislike.length === 0) {
                props.user.activities.dislike.forEach((id) => {
                    getPostActivity(id, "dislike")

                })
            }
            if (myResponse.length === 0) {
                props.user.activities.response.forEach((id) => {
                    getPostActivity(id, "response")
                    return null
                })
            }
            if (myComment.length === 0) {
                props.user.activities.commentary.forEach((id) => {
                    getPostActivity(id, "comment")
                })
            }
            setState("ready")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    async function getPost(id) {
        let response = await getPostById(id)
        response = await response
        if (response.success) {
            if (!myPost.includes(response.success)) {
                myPost.push(response.success)
                setMyPost(myPost)
                setState({})
            }
        }
    }

    async function getPostActivity(id, activity) {
        let response = await getPostById(id);
        response = await response
        if (response.success) {
            switch (activity) {
                case "like":
                    myLike.push(response.success)
                    setLike(myLike)
                    break;
                case "dislike":
                    myDislike.push(response.success)
                    setDislike(myDislike)
                    break;
                case "response":
                    myResponse.push(response.success)
                    setResponse(myResponse)
                    break;
                case "comment":
                    myComment.push(response.success)
                    setComment(myComment)
                    break;
                default:
                    console.log("activity not found");
            }
            setState({})
        }

    }

    return (
        <Container direction="column"
                   justify="space-between"
                   fixed
        >
            <Paper className={classes.paperProfile}>
                <Grid container
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
                    <GridList className={classes.gridList} cols={9}>
                        {myPost.length >= 1 &&
                        myPost.map((post, key) => {
                            return <CardFunctionNameProfile post={post} key={key}/>
                        })
                        }
                    </GridList>
                </div>
            </Paper>

            <Paper className={classes.paperProfile}>

                <h2>My activities</h2>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <h3>Likes</h3>
                        <Paper className={classes.paperProfile}
                               style={{maxHeight: 400, overflow: 'auto', minHeight: 200,}}>
                            {myLike.length >= 1 &&
                            myLike.map((post, key) => {
                                return <ActivityCards icon={<ThumbUpIcon/>} post={post} key={key}/>
                            })}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}><h3>Dislikes</h3>
                        <Paper className={classes.paperProfile}
                               style={{maxHeight: 400, overflow: 'auto', minHeight: 200,}}>
                            {myDislike.length >= 1 &&
                            myDislike.map((post, key) => {
                                return <ActivityCards icon={<ThumbDownIcon/>} post={post} key={key}/>
                            })}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}><h3>Responses</h3>
                        <Paper className={classes.paperProfile}
                               style={{maxHeight: 400, overflow: 'auto', minHeight: 200,}}>
                            {myResponse.length >= 1 &&
                            myResponse.map((post, key) => {
                                return <ActivityCards icon={<PostAddIcon/>} post={post} key={key}/>
                            })}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}><h3>Comments</h3>
                        <Paper className={classes.paperProfile}
                               style={{maxHeight: 400, overflow: 'auto', minHeight: 200,}}>
                            {myComment.length >= 1 &&
                            myComment.map((post, key) => {
                                return <ActivityCards icon={<CommentIcon/>} post={post} key={key}/>
                            })}
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>

        </Container>

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



