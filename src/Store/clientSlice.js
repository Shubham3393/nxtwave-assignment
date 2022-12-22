import { createSlice } from "@reduxjs/toolkit";


const initialClientSlice = {clientList : [], addNewResource : {}, change : false};

const clientSlice = createSlice({
    name : 'client',
    initialState : initialClientSlice,
    reducers : {
        setClientList(state, action){

            state.clientList = action.payload.data;
            // console.log("action.payload", state.clientList);
        },

        addNewResourceHandler(state, action){
            // console.log("addnewResource");
            state.change = true;
            state.addNewResource = action.payload.client;
        }

    }
})



export const clientSliceAction = clientSlice.actions;

export default clientSlice;