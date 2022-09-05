import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'


const Login = () => {
    return ( <div className="login">
        <form action="">
            <div style={{justifyContent:'center', textAlign:'center'}}>REGISTER</div>
            <label htmlFor="">Email:</label> 
            <br />
            <input type="email" placeholder="Email" />
            <br />
            <br />
            <label htmlFor="">Phone Number:</label> 
            <br />
            <input type="text" name="" id="" placeholder='+254712345678' />
            <br /><br />
            <label htmlFor="">Password:</label> 
            <br />
            <input type="password" placeholder="Password" />
            <br /><br />
            <input type="submit" value="Register" style={{backgroundColor:'darkgoldenorange'}}/>
            <br />
            <div className="btn">
                <Link to="/register" style={{textDecoration:'none', color:'white'}}>Already Have an account? Login Here</Link>
            </div>
            
        </form>
    </div> );
}
 
export default Login;