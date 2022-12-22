import { useNavigate } from 'react-router-dom';
import classes from './Navbar.module.scss';


const Navbar = (props) => {

    const navigate = useNavigate();

    const onClickHandler = () =>{
        navigate('/');
    }

    return (
        <div className={classes.nav}>
            <img src="./logo.jpg" alt='nxtWave logo' className={classes.logo}/>
            <div className={classes.right}>
                {props.addItem}
                <img src="./profilePic.jpg" alt='Profile Pic' className={classes.img}/>
                <button className={classes.btn} onClick={onClickHandler}>LogOut</button>
            </div>
        </div>
    )
}

export default Navbar;