import { toast } from "react-toastify";
import { failToastHandler, successToastHandler } from "../Pages/CreateItem";
import { authActions } from "./auth";
import { clientSliceAction } from "./clientSlice";

export const getClient = (props) => {
    return async (dispatch) => {
        
        const getClientData = async () => {
            
            const response = await fetch('https://media-content.ccbp.in/website/react-assignment/resources.json');
            if(!response.ok) throw new Error('cannot get clients!!!');
            const data = await response.json();
            // console.log("data", data);
            successToastHandler("Successfully loaded all Resources", toast.POSITION.BOTTOM_LEFT);
            dispatch(clientSliceAction.setClientList({data}));
            props();
        }

        try {
            await getClientData();
        } catch (error) {
            failToastHandler("Error occured while fetching resources", toast.POSITION.BOTTOM_LEFT);
            console.log(error.message);
        }
    }
}

export const signIn =  (props) => {
    return async (dispatch) => {
        const signinData = async () => {
            const response =  await fetch('https://nxt-wave-default-rtdb.firebaseio.com/auth.json',{
                method : 'POST',
                body : JSON.stringify({
                    username : props.username,
                    email : props.email,
                    password : props.password
                })
            })

            if(!response.ok){
                throw new Error('impossible signin')
            }
            successToastHandler("Successfully signed in", toast.POSITION.BOTTOM_LEFT);
        }
        try {
            await signinData();
        } catch (error) {
            failToastHandler("Error occured while signing in", toast.POSITION.BOTTOM_LEFT);
        }
        
    }
}

export const logIn = () => {

    return async (dispatch) => {
        
        const  fetchUserData = async () => {
            const response = await fetch('https://nxt-wave-default-rtdb.firebaseio.com/auth.json');

            if(!response.ok){
                throw new Error('something went wrong while fetching data');
            }

            
            const temp = await response.json();
            
            const data = [];
            for(const key in temp){
                data.push({
                    username : temp[key].username,
                    email: temp[key].email,
                    password : temp[key].password
                });
            }
            
            dispatch(authActions.userDataHandler({data}));
            successToastHandler("Successfully logged in", toast.POSITION.BOTTOM_LEFT);
        }
        try {
            await fetchUserData();
        } catch (error) {
            failToastHandler("Error occured while logging in", toast.POSITION.BOTTOM_LEFT);
        }
        
    }
}