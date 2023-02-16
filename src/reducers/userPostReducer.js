import { SET_USER_POSTS } from "../actions/types";

const inicialState = {
    post: [],
    fetched: false,
};

export default function userPost(state = inicialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case SET_USER_POSTS:
            return {
                ...state,
                fetched: payload.fetched,
                post: payload.posts
            }
        default:
            return state;
    }
}