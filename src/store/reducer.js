import {GET_POST, GET_USER, LOG_OUT, SET_USER} from "./actions";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

const initialState = {
    post: {},
    user: {},
    token: ""
};

export default function reducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case GET_POST: {
            nextState = {...state, post: action.post};
            return nextState || state;
        }
        case GET_USER: {
            const cookies = new Cookies();
            cookies.set('token', action.token, { path: '/' });
            nextState = {...state, user: action.user};
            return nextState || state;
        }
        case SET_USER: {
            const cookies = new Cookies();
            const token = cookies.get('token')
            let decoded
            if (token && typeof token !== "undefined") {
                decoded = jwt_decode(token);
            } else {
                decoded = {}
            }
            nextState = {...state, user: decoded.success};
            return nextState || state;
        }
        case LOG_OUT: {
            const cookies = new Cookies();
            cookies.remove('token');
            nextState = {...state, user: {}};
            return nextState || state;
        }
        default:
            return state;
    }
};
