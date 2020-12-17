import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import LikeDislikeVote from "./LikeDislikeVote";
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import Button from "@material-ui/core/Button";
import {updatePosts, updateUser} from "../../store/actions";
import {connect} from "react-redux";
import {Add} from "@material-ui/icons";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import TitleDetails from "./TitleDetails";
import DescriptionComponent from "../../utils/components/DescriptionComponent";
import CodeMirrorRead from "../../utils/components/CodeMirrorRead";
import CommentaryComponent from "./CommentaryComponent";
import AddCommentaryComponent from "./AddCommentaryComponent";
import {useHistory} from "react-router";


function DetailsFunction(props) {
    const classes = useStyles();
    const history = useHistory()

    return (
        <>
            {props.posts.post.map((post, key) => {
                return (
                    <Card style={{
                        backgroundColor: "#f4f5f7",
                        marginBottom: 15
                    }}
                          key={key}>
                        <TitleDetails
                            pseudo={post.author.pseudo}
                            avatar={post.author.avatar}
                            title={"Solution by "}
                            variant={"h5"}
                            date={post.creationDate}
                            action={
                                <LikeDislikeVote post={post}/>
                            }
                        />
                        <CardContent>
                            <div className={classes.containerSolution}>
                                <div className={classes.containerFunction}>
                                    <DescriptionComponent description={post.description}/>
                                    <CodeMirrorRead function={post.function}/>
                                    <Button
                                        style={{marginTop: 5}}
                                        variant="contained"
                                        color="primary"
                                        startIcon={<Add/>}
                                        disabled={(!props.token.length > 0)}
                                        onClick={() => history.push("/improve/" + props.mainId + "/" + post._id)}>
                                        Improve
                                    </Button>
                                    <CommentaryComponent commentary={post.commentary}/>
                                    <AddCommentaryComponent id={post._id}/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </>

    );
}

const useStyles = makeStyles((theme) => ({
    flexRow: {
        display: "flex",
        justifyContent: "center"
    },
    containerSolution: {
        display: "flex",
        flexGrow: 1
    },
    containerFunction: {
        marginLeft: 10,
        width: "100%"
    },
    functionCard: {
        width: "100%",
        marginBottom: 5
    },
    pos: {
        marginBottom: 12,
    },
    editor: {
        minHeight: 140,
        boxSizing: "border-box",
        border: "1 solid #ddd",
        cursor: "text",
        borderRadius: 2,
        boxShadow: "inset 0px 1px 8px -3px #ABABAB",
        background: "#ffffff",
    },
    containerTitle: {
        display: "flex",
        flexGrow: 1,
        alignItems: "center"
    },
    titleElements: {
        fontSize: 30,
    },
}));

const mapStateToProps = state => {
    return {

        token: state.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (user, token) => dispatch(updateUser(user, token)),
        updatePosts: (posts) => dispatch(updatePosts(posts))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsFunction)


