import Navbar from "../Component/Navbar";
import Theme from "../Layout/Theme";
import classes from './Home.module.scss';
import {AiOutlineSearch} from 'react-icons/ai';
import Card from "../Component/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getClient } from "../Store/redux-thunk";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

const Home = () =>{

    const dispatch = useDispatch();
    const [clientType, setClientType] = useState("resource");
    const searchRef = useRef();
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currPage, setCurrpage] = useState(1);
    const navigate = useNavigate();

    function loadingHandler(){
        setIsLoading(false);
    }

    useEffect(()=>{
        dispatch(getClient(loadingHandler));
    },[dispatch])

    if(isLoading) toast("resources are being loading", {position : toast.POSITION.BOTTOM_LEFT});

    const clients = useSelector(state => state.client.clientList);

    const clientData = clients.reduce((acc, client) => {
        const name = client.title.toUpperCase();
        const search = searchInput.toUpperCase()
        if((clientType === "resource" || clientType === client.tag) 
            && (searchInput === "" || (searchInput !== "" && name.includes(search)))) {
            acc.push(client);
        }
        return acc;
    },[]);

    const initialPosition = (currPage - 1) * 6;
    const finalPosition = currPage * 6;
    const showData =  clientData.slice(initialPosition, finalPosition);

    const cardData = showData.map(client => <Card 
                                                key={client.id}
                                                title={client.title}
                                                description={client.description}
                                                icon_url={client.icon_url}
                                                category={client.category}
                                                link={client.link}
                                            />
    )

    const onSearchHandler = () => {
        setSearchInput(searchRef.current.value);
    }

    const onClickHandler = () => {
        navigate('/create-item');
    }

    const addItem = <button className={classes.addItemBtn} onClick={onClickHandler}>ADD ITEMS</button>;

    return (
        <>
            <ToastContainer />
            <Navbar addItem={addItem} />
            <Theme className={classes.theme}>
                <div className={classes.buttons}>
                <button className={classes.btn} onClick={()=>setClientType("resource")} style={clientType === "resource" ? {backgroundColor : "#1051ca", color : "white"} : {}}>Resources</button>
                    <button className={classes.btn} onClick={()=>setClientType("request")} style={clientType === "request" ? {backgroundColor : "#1051ca", color : "white"} : {}}>Requests</button>
                    <button className={classes.btn} onClick={()=>setClientType("user")} style={clientType === "user" ? {backgroundColor : "#1051ca", color : "white"} : {}}>Users</button>
                </div>
                <div className={classes.search}>
                    <AiOutlineSearch className={classes.search_icon}/>
                    <input type="text" placeholder="search"  className={classes.search_input} ref={searchRef} onChange={onSearchHandler}/>
                </div>
                <div className={classes.cards}>
                    {isLoading && <div style={{fontSize : "2rem"}}>loading...</div>}
                    {!isLoading && cardData}
                </div>
                <div className={classes.pagination}>
                    <button className={classes.paginationBtn} onClick={()=>{setCurrpage(prev => prev-1)}} disabled={currPage === 1}><IoIosArrowBack /></button>
                    <button className={classes.paginationBtn} onClick={()=>{setCurrpage(prev => prev+1)}} disabled={finalPosition >= clientData.length-1}><IoIosArrowForward /></button>
                </div>
            </Theme>
        </>
    )
}
export default Home;