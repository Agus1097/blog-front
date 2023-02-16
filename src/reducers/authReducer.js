import { SET_CURRENT_USER } from "../actions/types";

const inicialState = {
    loggedIn: false,
    user: {}
};

export default function auth(state = inicialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                loggedIn: payload.loggedIn,
                user: payload.user
            }
        default:
            return state;
    }
}