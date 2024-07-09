import { configureStore } from "@reduxjs/toolkit"
import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/es/persistStore"
import storage from "redux-persist/lib/storage"
import menuReducers from "./features/menuSlice"

// persist Config
const persistConfig = {
    key: "menu",
    storage
}

// persistReducer
const menuReducer = persistReducer(persistConfig, menuReducers)

const store = configureStore({
    reducer: {
        menuReducer
    }
})

// persist Store
const persistor = persistStore(store)

export {store, persistor }