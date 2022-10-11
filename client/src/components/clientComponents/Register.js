import {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../index.css'
import { Store } from 'react-notifications-component';


const Login = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [pending, setPending]= useState(false);

    const history = useHistory();

    const data = { name, email, phone, password };

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
        setPending(true);
        e.preventDefault();
        e.target.value = null;

        fetch('/register',{
            method: 'POST',
            headers: {'content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then((response)=>{
            return response.json();
        })
        .then(response=>{
            if(response === 'registered'){
                e.target.reset();
                notify("Success","You have been registered Succesfully","success");
                history.push('/login')
            }else if(response === 'exists'){
                notify("Failed","Credentials Have Been Used","danger");
            }
            setPending(false);
            
        }).catch( (err)=>{
            setPending(false);
            notify("Failed","Server Error. Try Again.","danger");
        })
    }

    


    return ( <div className="login">
        <form onSubmit={handleSubmit} action="">
            <div style={{justifyContent:'center', textAlign:'center'}}>REGISTER</div>
            <label htmlFor="">Full Name:</label> 
            <br />
            <input type="text" placeholder="Full Name" onChange={e =>setName(e.target.value)} required/>
            <br />
            <br />
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
            { !pending && <input type="submit" value="Register" style={{backgroundColor:'darkgoldenorange'}}/> }
            { pending && <input type="submit" value="Loading ..." style={{backgroundColor:'maroon', color:'white'}}/> }
            <br />
            <div className="btn">
                <Link to="/login" style={{textDecoration:'none', color:'white', display:'flex'}}>Already Have an account? <div style={{color:'yellow'}}> Login Here</div></Link>
            </div>
            
        </form>
    </div> );
}
 
export default Login;