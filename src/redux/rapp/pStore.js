import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "../slice/ProjectSlice";

export const Pstore = configureStore({
    reducer:{
        proData : projectSlice.reducer,
    }
})



