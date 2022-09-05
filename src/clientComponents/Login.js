import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { Store } from 'react-notifications-component';

const Login = () => {
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);

    const data = {email, password};

    function notify(title, message, type){
        Store.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
            duration: 1000,
            onScreen: true
            }
        }) 
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        e.target.value = null;

        fetch('/login',{
            method:'POST',
            headers: {'content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then((data)=>{
            return data.json();
        })
        .then((data)=>{
            e.target.reset()
            if(data==='failed'){
                notify("Failed","Wrong Credentials. Try Again","danger");
            }else{
                notify("Success","Logged In","success");
            }
        })
        .catch((err)=>{
            notify("Failed","Server Error","danger");
        })
    }

    

    return ( <div className="login">
        <form onSubmit={handleSubmit} action="">
            <div style={{justifyContent:'center', textAlign:'center'}}>LOGIN</div>
            <label htmlFor="">Email:</label> 
            <br />
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <br />
            <br />
            <label htmlFor="">Password:</label>
            <br />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <br /><br />
            <input type="submit" value="Login" />
            <br />
            <div className="btn">
                <Link to="">Forgot Password?</Link>
                <br />
                <Link to="/register">Register?</Link>
            </div>
            
        </form>
    </div> );
}
 
export default Login;