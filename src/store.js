import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducers';

const store = configureStore({
    reducer: {
        auth: rootReducer,
    }
});

export default store;
