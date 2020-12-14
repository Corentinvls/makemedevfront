export const GET_POST = "GET_POST"

export const getPost = post => {
    return {
        type: GET_POST,
        post,
    };
};
