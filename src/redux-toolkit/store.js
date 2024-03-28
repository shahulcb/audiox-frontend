import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./userAuth";

const store = configureStore({
    reducer: {
        user: userAuth,
    }
})

export default store