import classes from './Form.module.scss'
import { useRef } from 'react';
import { useState } from 'react';
import {clientSliceAction} from '../Store/clientSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect  } from "react";
import { toast } from 'react-toastify';
import { failToastHandler, successToastHandler } from '../Pages/CreateItem';


const Form = (props) =>{
    //-----dispatch-----
    const dispatch = useDispatch();

    //-----useSelector-----
    const change = useSelector(state => state.client.change);

    //-----useRef-----
    const titleRef = useRef();
    const iconRef = useRef();
    const linkRef = useRef();
    const tagRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    //-----useState-----
    const [clientId, setClientId] = useState(0);
    // const [isDisable, setIsDisable] = useState(false);

    //-----posting item-----
    const addClient = async () => {
        const addClientData = async () => {
            const response = await fetch('https://media-content.ccbp.in/website/react-assignment/add_resource.json')
            if(!response.ok){
                throw new Error("cannot set client data");
                return;
            }
            console.log('response', response);
            successToastHandler("Your response is successfully added", toast.POSITION.BOTTOM_LEFT);
        }

        try {
            await addClientData();
        } catch (error) {
            failToastHandler("error occured while adding resource", toast.POSITION.BOTTOM_LEFT);
            console.log(error.message);
        }
    }

    useEffect(()=>{
        
        if(change){
            addClient();
        }
        
    },[change, addClient, dispatch]);
    
    

    //-----submit handler-----
    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        if(titleRef.current.value === "" 
            || tagRef.current.value === "" 
            || categoryRef.current.value === "" 
            || linkRef.current.value === "" 
            || descriptionRef.current.value === "" 
            || iconRef.current.value === ""
         ) failToastHandler("All inputs are mandatory", toast.POSITION.BOTTOM_LEFT);
        else{
            setClientId(prev => prev+1);
            // console.log("submit1")
            const client = {
                id: `r${clientId}`,
                title : titleRef.current.value,
                description : descriptionRef.current.value,
                icon_url : iconRef.current.value,
                link : linkRef.current.value,
                category : categoryRef.current.value,
                tag : tagRef.current.value,
            }

            dispatch(clientSliceAction.addNewResourceHandler({client}));
            // console.log("submit2")
            titleRef.current.value = "";
            iconRef.current.value = "";
            descriptionRef.current.value = "";
            linkRef.current.value = "";
            categoryRef.current.value = "";
            tagRef.current.value = "";
            
        }
        
    }

    return (
        <form onSubmit={onSubmitHandler} className={classes.form}>
            <h1 className={classes.title}>Item Details</h1>
            <div className={classes.input_box}>
                <label className={classes.label}>Item Title</label>
                <input type='text'className={classes.input} ref={titleRef}/>
            </div>
            <div className={classes.input_box}>
                <label className={classes.label}>Link</label>
                <input type='text'className={`${classes.input} ${classes.link}`} ref={linkRef} />
            </div>
            <div className={classes.input_box}>
                <label className={classes.label}>Icon Url</label>
                <input type='text'className={`${classes.input} ${classes.link}`} ref={iconRef} />
            </div>
            <div className={classes.input_box}>
                <label className={classes.label}>Tag Name</label>
                <select className={`${classes.input} ${classes.tag}`} ref={tagRef} >
                    <option value="">--Please choose an option--</option>
                    <option value="users">Users</option>
                    <option value="resources">Resources</option>
                    <option value="requests">Requests</option>
                </select>
            </div>
            <div className={classes.input_box}>
                <label className={classes.label}>Category</label>
                <input type='text'className={classes.input} ref={categoryRef} />
            </div>
            <div className={classes.input_box}>
                <label className={classes.label}>Description</label>
                <input type='text'className={`${classes.input} ${classes.description}`} ref={descriptionRef}/>
            </div>
            <button className={classes.btn}>CREATE</button>
        </form>
    )
}

export default Form;