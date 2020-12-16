import React, {useEffect, useRef} from 'react';

import CreateFunction from "../components/createFunctionForm/CreateFunction";
import {useParams} from "react-router-dom";
import {getPostById} from "../request/postRequest";
import ResponseFunctionForm from "../components/ResponseFunctionFrom/ResponseFunctionForm";

export default function ResponseFunctionView(props) {
    let {mainId,postId} = useParams();
    const [post, setPost] = React.useState({})
    const isInitialMount = useRef(true);
    const [, setState] = React.useState()


    async function getPost(id,postId) {
        let response = await getPostById(id)
        response = await response
        if (response.success) {
            console.log(response)
            let posts=response.success.post
            setPost(posts.find((post)=>post._id===postId))
          setState({})
        } else {
            setPost({})
        }
    }

    useEffect(() => {
        if (isInitialMount.current) {
            console.log("mount")
            isInitialMount.current = false;
            getPost(mainId,postId)
        } else {
            console.log("update")
            setPost(props.posts)
        }
    }, [props])



    return (
        <div >
           <ResponseFunctionForm {...post}/>
        </div>
    );
}



