import classes from './Login.module.css';
import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../Store/auth';
import { signIn, logIn } from '../Store/redux-thunk';

const passwordValidation = (str) => {
    if(str.length>=8) return true;
    return false;
}


const Signin = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form = useSelector(state => state.auth.form);
    const formValid = useSelector(state => state.auth.formValid);
    

    useEffect(()=>{
        dispatch(logIn());
    },[formValid, dispatch]);
    
    const signinHandler = (event) => {
        event.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const email = emailRef.current.value;

        const isValidPassword = passwordValidation(password);
        const isValidEmail = email.includes('@');

        dispatch(authActions.formHandler({email : isValidEmail, password : isValidPassword}));

        
        if(isValidEmail&&isValidPassword) {
            dispatch(authActions.formValidHandler());
            dispatch(signIn({username, email, password}))
        }

    }

    if(formValid){
        dispatch(authActions.formHandler({email : true, password : true}));
        navigate('/log-in');

    }

    return (
        <div className={classes.loginPage}>
            <div className={classes.form}>
                <h1>Sign Up</h1>
                <form className={classes.registerForm} onSubmit={signinHandler}>
                    <input type="text" ref={usernameRef} placeholder="username"/>
                    
                    <div ><input type="text" ref={emailRef} placeholder="email address"/></div>
                    {!form.email && <p className='invalid'>email is invalid</p>}
                    <div ><input type="password" ref={passwordRef} placeholder="password"/></div>
                    {!form.password && <p className='invalid'>password must contain atleast 8 character</p>}
                    <button >create</button>
                    <p className={classes.message}>Already registered? <Link to='/log-in'>LogIn</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signin;
