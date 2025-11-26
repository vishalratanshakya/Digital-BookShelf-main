import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth";

const store = configureStore({
    reducer: {
        auth: authReducer,
    }, //tells if the user is logged in or not


})

export default store;