import React, {useEffect, useRef} from 'react';
import DetailsFunction from "../components/detailsFunction/DetailsFunction";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {getPostById} from "../request/postRequest";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import generateChipsTooltip from "../utils/generateChipsTooltip";
import generateChipsLink from "../utils/generateChipsLink";
import "../assets/codeMirror/codemirror.css";
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import 'moment-timezone';
import TitleDetails from "../components/detailsFunction/TitleDetails";


function DetailsFunctionView(props) {
    const classes = useStyles();
    const {id} = useParams();
    const [posts, setPosts] = React.useState({})
    const isInitialMount = useRef(true);



    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            getPosts(id)
        } else {
            setPosts(props.posts)
        }
    }, [props])


    async function getPosts(id) {
        let response = await getPostById(id)
        response = await response
        if (response.success) {
            setPosts(response.success)
        } else {
            setPosts({})
        }
    }


    return (
        <>
            {posts.name ? (<div>
                <Card className={classes.root}>
                    <TitleDetails
                        pseudo={posts.author.pseudo}
                        avatar={posts.author.avatar}
                        title={"Post By "}
                        date={posts.author.creationDate}
                        action={generateChipsLink(posts.tag)}
                    />
                    <CardContent className={classes.containerTitle}>
                        <div className={classes.titleElements}>
                            <Typography variant="h4" component="h2">
                                {posts.name}
                            </Typography>
                        </div>
                        <div className={classes.titleElements}>
                            ({generateChipsTooltip(posts.params)})
                            {"{"}{generateChipsTooltip(posts.returns)}{"}"}
                        </div>
                    </CardContent>
                    <CardContent>
                        <DetailsFunction mainId={posts._id} posts={posts}/>
                    </CardContent>
                </Card>
            </div>) : null}
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275
    },
    title: {
        fontSize: 14,
    },
    containerTitle: {
        display: "flex",
        flexGrow: 1,
        alignItems: "center"
    },
    titleElements: {
        fontSize: 30,
    }
}));

const mapStateToProps = state => {
    return {
        posts: state.posts,
    };
};

export default connect(mapStateToProps)(DetailsFunctionView)
