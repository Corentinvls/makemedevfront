import axios from "axios";

async function postUser(data, url) {
    return await axios.post(url, data).then(result => {
        return result.data
    }).catch(
        err => {
            return err.response.data;
        }
    );
}

export async function setSignUp(data) {
    let urlRoutePostSignUp = "http://185.163.126.173:4021/api/users";
    return await postUser(data, urlRoutePostSignUp);
}

export async function setSignIn(data) {
    let urlRoutePostSignUp = "http://185.163.126.173:4021/api/user-signin";
    return await postUser(data, urlRoutePostSignUp);
}

