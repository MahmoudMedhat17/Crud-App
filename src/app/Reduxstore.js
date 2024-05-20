import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "../Components/User/UserSlice";

export const Reduxstore = configureStore({
    reducer:{
        users: UserSlice
    }
})