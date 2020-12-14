import React from "react";
import axios from 'axios'
import {
    useParams
} from "react-router-dom";
import RecipeReviewCard from "../components/cards/cardFunction/cardFunction";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

function Results() {
    const classes = useStyles();
    let { id } = useParams();
    const [posts, setPosts] = React.useState([])

    function getSearchPost (search) {
        axios.get("http://185.163.126.173:4021/api/post?search=" + search).then( result => {
            setPosts(result.data.success)
        }).catch(
            err => {
                setPosts(err);
            }
        )
    }
    return(
        <div className={classes.root}>
            {posts.length > 0 ? posts.map(post => <RecipeReviewCard post={post}/>) : getSearchPost(id)}
        </div>
    )
}

export default Results
