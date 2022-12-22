import classes from './Login.module.css';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { authActions } from '../Store/auth';


const passwordValidation = (str) => {
    if(str.length>=8) return true;
    return false;
}
const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.userData);
    const [invalidAuth, setInvalidAuth] = useState(false);
    const form = useSelector(state => state.auth.form);

    const submitHandler = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
        const isValidPassword = passwordValidation(password);
        const isValidEmail = email.includes('@');

        setInvalidAuth(false);

        if(isValidEmail&&isValidPassword){
            console.log("isValid")
            console.log("userData: ", userData);
            for(const key in userData){  
                console.log("email", email, "password", password, "userData[key].email", userData[key].email, "userData[key].password", userData[key].password)
                if(email === userData[key].email && password === userData[key].password){
                    navigate('/home');
                    return;
                }
            }
            setInvalidAuth(true);
        }

        dispatch(authActions.formHandler({email : isValidEmail, password : isValidPassword}));
    }



    return (
        <div className={classes.loginPage}>
            <div className={classes.form}>
                <h1>Log In</h1>
                {invalidAuth && <p className='invalid'>Invalid email or password</p>}
                <form className={classes.loginForm} onSubmit={submitHandler}>
                    <input type="text" ref={emailRef} placeholder="email"/>
                    {!form.email && <p className='invalid'>email is invalid</p>}
                    <input type="password" ref={passwordRef} placeholder="password"/>
                    {!form.password && <p className='invalid'>password must contain atleast 8 character</p>}
                    <button>login</button>
                    <p className={classes.message}>Not registered?<Link to='/sign-in'>Create an account</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;
