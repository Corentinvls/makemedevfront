import axios from "axios";
import Cookies from "universal-cookie";

async function postUser(data, url) {
    return await axios.post(url, data).then(result => {
        return result.data
    }).catch(
        err => {
            return err.response.data;
        }
    );
}

async function updateUser(data, url, config = {}) {
    return await axios.post(url, data, config).then(result => {
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

export async function setUpdateUser(data) {
    const config = {headers: {'Authorization': 'Bearer ' + new Cookies().get('token')}}
    let urlRoutePostSignUp = "http://185.163.126.173:4021/api/update-users";
    console.log(data, urlRoutePostSignUp,config)
    return await updateUser(data, urlRoutePostSignUp,config);
}

