import {GET_POST} from "./actions";

const initialState = {
    post: {}
};

export default function reducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case GET_POST: {
            nextState = {...state, post: action.post};
            return nextState || state;
        }
        default:
            return state;
    }
};
