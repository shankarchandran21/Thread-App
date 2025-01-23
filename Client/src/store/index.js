import {configureStore} from "@reduxjs/toolkit"
import themeReducer from "../utils/themeSlice"
import authReducer from "../features/authPage/authSlice"
export const store = configureStore({
    reducer:{
        theme:themeReducer,
        auth:authReducer
    }
})