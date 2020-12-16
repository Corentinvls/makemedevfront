import React, {useEffect, useRef} from 'react';

import CreateFunction from "../components/createFunctionForm/CreateFunction";
import {useParams} from "react-router-dom";
import {getPostById} from "../request/postRequest";
import ResponseFunctionForm from "../components/ResponseFunctionFrom/ResponseFunctionForm";

export default function ResponseFunctionView(props) {
    let {mainId, postId} = useParams();
    const [post, setPost] = React.useState({})
    const isInitialMount = useRef(true);
    const [, setState] = React.useState()


    async function getPost(id) {
        let response = await getPostById(id)
        response = await response
        if (response.success) {
            console.log(response)
            setPost(response.success)
            setState({})
        } else {
            setPost({})
        }
    }

    useEffect(() => {
        if (isInitialMount.current) {
            console.log("mount")
            isInitialMount.current = false;
            getPost(mainId)
        } else {
            console.log("update")
            setPost(props.posts)
        }
    }, [props])


    return (
        <div>
            <ResponseFunctionForm postId={postId} {...post}/>
        </div>
    );
}



