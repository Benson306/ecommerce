import {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../index.css'
import { Store } from 'react-notifications-component';


const Login = () => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const data = { email, phone, password };

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
    }


    const handleSubmit = (e) =>{
        e.preventDefault();
        e.target.value = null;

        fetch('/register',{
            method: 'POST',
            headers: {'content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then(()=>{
            e.target.reset();
           notify("Success","You have been registered Succesfully","success");
           history.push('/login')
        }).catch( (err)=>{
            notify("Failed","Server Error. Try Again.","danger")
        })
    }

    


    return ( <div className="login">
        <form onSubmit={handleSubmit} action="">
            <div style={{justifyContent:'center', textAlign:'center'}}>REGISTER</div>
            <label htmlFor="">Email:</label> 
            <br />
            <input type="email" placeholder="Email" onChange={e =>setEmail(e.target.value)} required/>
            <br />
            <br />
            <label htmlFor="">Phone Number:</label> 
            <br />
            <input type="text" name="" id="" onChange={e =>setPhone(e.target.value)} required placeholder='+254712345678' />
            <br /><br />
            <label htmlFor="">Password:</label> 
            <br />
            <input type="password" placeholder="Password" onChange={e =>setPassword(e.target.value)} required/>
            <br /><br />
            <input type="submit" value="Register" style={{backgroundColor:'darkgoldenorange'}}/>
            <br />
            <div className="btn">
                <Link to="/login" style={{textDecoration:'none', color:'white'}}>Already Have an account? Login Here</Link>
            </div>
            
        </form>
    </div> );
}
 
export default Login;