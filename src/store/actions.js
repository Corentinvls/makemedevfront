export const GET_POST = "GET_POST"
export const GET_USER = "GET_USER"
export const SET_USER = "SET_USER"
export const LOG_OUT = "LOG_OUT"

export const getPost = post => {
    return {
        type: GET_POST,
        post,
    };
};

export const getUser = (user, token) => {
    return {
        type: GET_USER,
        user,
        token
    };
};

export const setUser = () => {
    return {
        type: SET_USER
    };
};

export const logOut = () => {
    return {
        type: LOG_OUT
    };
};
