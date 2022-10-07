import {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Store } from 'react-notifications-component';

const Login = () => {
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ pending, setPending ] = useState(false);

    const history = useHistory();

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
        const abortCont = new AbortController();
        setPending(true);
        e.preventDefault();
        e.target.value = null;

        fetch('/login',{
            method:'POST',
            headers: {'content-Type':'application/json'},
            body: JSON.stringify(data)
        },{signal: abortCont.signal})
        .then((data)=>{
            return data.json();
        })
        .then((data)=>{
            if(data==='failed'){
                notify("Failed","Wrong Credentials. Try Again","danger");
            }else{
                notify("Success","Logged In","success");
                e.target.reset()
                history.push('/');
                window.location.reload();
            }
            setPending(false);
        })
        .catch((err)=>{
            notify("Failed","Server Error","danger");
            setPending(false);
        })

        return () => abortCont.abort();
    }

    

    return ( <div className="login">
        <form onSubmit={handleSubmit} action="">
            <div style={{justifyContent:'center', textAlign:'center'}}>LOGIN</div>
            <label htmlFor="">Email:</label> 
            <br />
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
            <br />
            <br />
            <label htmlFor="">Password:</label>
            <br />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
            <br /><br />
            { !pending && <input type="submit" value="Login" /> }
            { pending && <input type="submit" value="Loading ...." style={{backgroundColor:'maroon', color:'white'}}/> }
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