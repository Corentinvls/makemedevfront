import * as ActionType from "./actions";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

const initialState = {
    posts: [],
    user: {},
    token: ""
};

export default function reducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case ActionType.GET_POST: {
            nextState = {...state, posts: action.posts};
            return nextState || state;
        }
        case ActionType.UPDATE_POSTS: {
            nextState = {...state, posts: action.posts};
            return nextState || state;
        }
        case ActionType.GET_USER: {
            const cookies = new Cookies();
            cookies.set('token', action.token, { path: '/' });
            nextState = {...state, user: action.user, token: action.token};
            return nextState || state;
        }
        case ActionType.UPDATE_USER: {
            const cookies = new Cookies();
            cookies.remove('token');
            cookies.set('token', action.token, { path: '/' });
            nextState = {...state, user: action.user};
            return nextState || state;
        }
        case ActionType.SET_USER: {
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
        case ActionType.LOG_OUT: {
            const cookies = new Cookies();
            cookies.remove('token');
            nextState = {...state, user: {}, token: ""};
            return nextState || state;
        }
        default:
            return state;
    }
};
