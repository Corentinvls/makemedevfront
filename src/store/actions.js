export const GET_POST = "GET_POST"
export const GET_USER = "GET_USER"
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_POSTS = "UPDATE_POSTS"
export const SET_USER = "SET_USER"
export const LOG_OUT = "LOG_OUT"

export const getPost = posts => {return {type: GET_POST, posts,};};

export const getUser = (user, token) => {return {type: GET_USER, user, token};};

export const updateUser = (user, token) => {return {type: UPDATE_USER, user, token};};

export const updatePosts = (posts) => {return {type: UPDATE_POSTS, posts};};

export const setUser = () => {return {type: SET_USER};};

export const logOut = () => {return {type: LOG_OUT};};
