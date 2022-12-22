import Form from "../Component/Form";
import Navbar from "../Component/Navbar";
import Theme from "../Layout/Theme";
import classes from './CreateItem.module.scss';
import { IoIosArrowBack  } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successToastHandler = (text, pos) => {
    toast.success(text,{
        position : pos
    });
}

export const failToastHandler = (text, pos) => {
    toast.error(text, {
        position : pos
    });
}

const CreateItem = () => {

    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate('/home');
    }

    return (
        <>
            <Navbar />
            <div className={classes.createItem}>
                <ToastContainer/>
                <Theme className={classes.theme}>
                    <button className={classes.userButton} onClick={onClickHandler} ><IoIosArrowBack className={classes.arrow}/> <div className={classes.text}>Users</div></button>
                    <Form />
                </Theme>
                <img src="./createItemImg.jpg" alt="create-item-img" className={classes.img} />
            </div>
        </>
    )
}

export default CreateItem;