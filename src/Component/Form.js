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
    const [title, setTitle] = useState(true);
    const [icon, setIcon] = useState(true);
    const [link, setLink] = useState(true);
    const [tag, setTag] = useState(true);
    const [description, setDescription] = useState(true);
    const [category, setCategory] = useState(true);


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
        
        if(titleRef.current.value === "" ){
            setTitle(false);
        }
        else setTitle(true);
        if(categoryRef.current.value === "" ){
            setCategory(false);
        }
        else setCategory(true);
        if(linkRef.current.value === ""  ){
            setLink(false);
        }
        else setLink(true);
        if(descriptionRef.current.value === ""  ){
            setDescription(false);
        }
        else setDescription(true);
        if(iconRef.current.value === "" ){
            setIcon(false);
        }
        else setIcon(true);
        if(tagRef.current.value === ""  ){
            setTag(false);
        }
        else setTag(true);


        if(titleRef.current.value === "" 
            || tagRef.current.value === "" 
            || categoryRef.current.value === "" 
            || linkRef.current.value === "" 
            || descriptionRef.current.value === "" 
            || iconRef.current.value === ""
         ) failToastHandler("All inputs are mandatory", toast.POSITION.BOTTOM_LEFT);
        else{

            // if(!title) setTitle(true);
            // if(!category) setCategory(true);
            // if(!tag) setTag(true);
            // if(!link) setLink(true);
            // if(!description) setDescription(true);
            // if(!icon) setIcon(true);

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

    const validHandler = (input, classtemp) => {
        if(input) return classtemp;
        return  ` ${classtemp} ${classes.invalid}`;
    }


    const titleClassName = title === true ? classes.input : classes.invalid;
    const iconClassName = title === true ? `${classes.input} ${classes.link}` : classes.invalid;
    const descriptionClassName = title === true ? `${classes.input} ${classes.description}` : classes.invalid;
    const linkClassName = title === true ? `${classes.input} ${classes.link}`: classes.invalid;
    const categoryClassName = title === true ?  `${classes.input}` : classes.invalid;
    const tagClassName = title === true ? `${classes.input} ${classes.tag}` : classes.invalid;

    return (
        <form onSubmit={onSubmitHandler} className={classes.form}>
            <h1 className={classes.title}>Item Details</h1>
            <div className={classes.input_box}>
                <label className={classes.label}>Item Title</label>
                <input type='text'className={validHandler(title, `${classes.input}`)} ref={titleRef}/>
            </div>
            <div className={classes.input_box}>
                <label className={classes.label}>Link</label>
                <input type='text'className={validHandler(title, `${classes.input} ${classes.link}`)} ref={linkRef} />
            </div>
            <div className={classes.input_box}>
                <label className={classes.label}>Icon Url</label>
                <input type='text'className={validHandler(title, `${classes.input} ${classes.link}`)} ref={iconRef} />
            </div>
            <div className={classes.input_box}>
                <label className={classes.label}>Tag Name</label>
                <select className={validHandler(title, `${classes.input} ${classes.tag}`)} ref={tagRef} >
                    <option value="">--Please choose an option--</option>
                    <option value="users">Users</option>
                    <option value="resources">Resources</option>
                    <option value="requests">Requests</option>
                </select>
            </div>
            <div className={classes.input_box}>
                <label className={classes.label}>Category</label>
                <input type='text'className={validHandler(title,  `${classes.input}`)} ref={categoryRef} />
            </div>
            <div className={classes.input_box}>
                <label className={classes.label}>Description</label>
                <input type='text'className={validHandler(title, `${classes.input} ${classes.description}`)} ref={descriptionRef}/>
            </div>
            <button className={classes.btn}>CREATE</button>
        </form>
    )
}

export default Form;