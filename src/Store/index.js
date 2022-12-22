import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./auth";
import clientSlice from "./clientSlice";

const store = configureStore({
    reducer : {client : clientSlice.reducer, auth : authSlicer.reducer}
})

export default store;