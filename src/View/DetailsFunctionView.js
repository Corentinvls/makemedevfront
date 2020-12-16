import React, {useEffect, useRef} from 'react';

import DetailsFunction from "../components/detailsFunction/DetailsFunction";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {getPostById} from "../request/postRequest";

function DetailsFunctionView(props) {
    let {id} = useParams();
    const [posts, setPosts] = React.useState({})
    const isInitialMount = useRef(true);


    useEffect(() => {
        if (isInitialMount.current) {
            console.log("mount")

            isInitialMount.current = false;
            getPosts(id)
        } else {
            console.log("update")
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
        <div>
            {Array.isArray(posts.post) ? posts.post.map(post => <DetailsFunction mainId={posts._id}
                                                                                 post={post}
                                                                                 tag={posts.tag}
                                                                                 params={posts.params}
                                                                                 returns={posts.returns}
                                                                                 name={posts.name}/>) : null}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
    };
};

export default connect(mapStateToProps)(DetailsFunctionView)
