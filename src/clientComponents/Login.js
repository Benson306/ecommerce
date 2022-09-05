import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'


const Login = () => {
    return ( <div className="login">
        <form action="">
            <label htmlFor="">Email:</label> 
            <br />
            <input type="email" placeholder="Email" />
            <br />
            <br />
            <label htmlFor="">Password:</label> 
            <br />
            <input type="password" placeholder="Password" />
            <br /><br />
            <input type="submit" value="Login" />
            <br />
            <div className="btn">
                <Link to="">Forgot Password?</Link>
                <br />
                <Link to="">Register?</Link>
            </div>
            
        </form>
    </div> );
}
 
export default Login;