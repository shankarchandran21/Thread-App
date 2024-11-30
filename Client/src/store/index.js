import {configureStore} from "@reduxjs/toolkit"
import themeReducer from "../utils/themeSlice"

export const store = configureStore({
    reducer:{
        theme:themeReducer
    }
})