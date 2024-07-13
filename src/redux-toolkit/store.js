import { configureStore } from "@reduxjs/toolkit"
import menuReducers from "./features/menuSlice"

const store = configureStore({
    reducer: {
        menuReducers
    }
})



export default store  