import axios from "axios";
import Cookies from 'universal-cookie';


async function postPost(data, url, config = {}) {
    return await axios.post(url, data, config).then(result => {
        return result.data
    }).catch(
        err => {
            if(err.response){
                return err.response.data;
            }else{
                return err
            }

        }
    )
}
async function getPosts(data, url) {
    return await axios.get( url + data).then(result => {
        return result.data
    }).catch(
        err => {
            if(err.response){
                return err.response.data;
            }else{
                return err
            }

        }
    )
}

export async function searchPosts(search){
    let urlSearch = "http://185.163.126.173:4021/api/post?search="
    return await getPosts(search, urlSearch)
}

export async function getPostById(id){
    let urlSearch = "http://185.163.126.173:4021/api/post?postId="
    return await getPosts(id, urlSearch)
}

export async function sendVote(vote, id){
    const config = {headers: {'Authorization': 'Bearer ' + new Cookies().get('token')}}
    const data = {"vote": vote, "idPost": id}
    const urlSendVote = "http://185.163.126.173:4021/api/post-vote"
    return await postPost(data, urlSendVote, config)
}

export async function sendCommentary(commentary, id){
    const config = {headers: {'Authorization': 'Bearer ' + new Cookies().get('token')}}
    const data = {"commentaryPost": {"commentary": commentary}, "idPost": id}
    const urlSendCommentary = "http://185.163.126.173:4021/api/post-add-commentary"
    return await postPost(data, urlSendCommentary, config)
}

export async function sendPost(post){
    const config = {headers: {'Authorization': 'Bearer ' + new Cookies().get('token')}}
    const data = {"post": post}
    const urlSendPost = "http://185.163.126.173:4021/api/post"
    return await postPost(data, urlSendPost, config)
}
export async function sendResponseFunction(response, postId){
    const config = {headers: {'Authorization': 'Bearer ' + new Cookies().get('token')}}
    const data ={
        "responsePost":response,
        "idPost": postId
    }
    const urlSendPost = "http://185.163.126.173:4021/api/post-add-response"
    return await postPost(data, urlSendPost, config)
}

