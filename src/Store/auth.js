import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    userData : [],
    formValid : false,
    form : {email : true, password : true}
} 

const authSlicer = createSlice({
    name : 'authentication',
    initialState : initialAuthState,
    reducers : {
        formValidHandler(state){
            state.formValid = true;
        },
        formHandler(state, action){
            state.form.email = action.payload.email;
            state.form.password = action.payload.password;
        },
        userDataHandler(state, action){
            state.userData = action.payload.data;
        }
    }
})

export const authActions = authSlicer.actions;

export default authSlicer;