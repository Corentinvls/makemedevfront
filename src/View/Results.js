import React, {useEffect} from "react";
import {
    useParams
} from "react-router-dom";
import RecipeReviewCard from "../components/cards/cardFunction/cardFunction";
import {makeStyles} from "@material-ui/core/styles";
import {searchPosts} from "../request/postRequest";

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

    useEffect(() => {
        async function getSearchPosts(id) {
            let response = await searchPosts(id)
            response = await response
            if (response.success) {
                setPosts(response.success)
            } else {
                setPosts([])
            }
        }
        getSearchPosts(id)
    }, [])



    return(
        <div className={classes.root}>
            {posts.map(post => <RecipeReviewCard post={post}/>)}
        </div>
    )
}

export default Results
