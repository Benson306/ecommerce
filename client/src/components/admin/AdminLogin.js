import {useState} from 'react';
import { useHistory } from 'react-router-dom'
import { Store } from 'react-notifications-component';

import '../../index.css'

const AdminLogin = () => {
    const [ email, setEmail ] = useState(null)
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
        setPending(true);
        e.preventDefault();
        e.target.value = null;

        fetch(`${process.env.REACT_APP_API_URL}/admin_login`,{
            credentials: 'include', 
            proxy: true, 
            withCredentials: true,
            method:'POST',
            headers: {'content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then((data)=>{
            return data.json();
        })
        .then((data)=>{
            if(data==='failed'){
                notify("Failed","Wrong Credentials. Try Again","danger");
            }else{
                notify("Success","Logged In","success");
                e.target.reset()
                history.push('/admin_dashboard');
                window.location.reload();
            }
            setPending(false);
        })
        .catch((err)=>{
            notify("Failed","Server Error","danger");
            setPending(false);
        })

    }

    return ( 
        <div className="loginadmin">
            <br />
            <br />
            <form onSubmit={handleSubmit} className="adminLogin">
                <center>
                    <h2>ADMIN LOGIN</h2>
                </center>
            
            <br />
            <label htmlFor="">Email:</label>
            <br /><br />
                <input type="email" onChange={e => setEmail(e.target.value)} placeholder='Email' required/>
                <br />
                <br />
            <label htmlFor="">Password:</label>
            <br /><br />
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
                <br />
                <br />
                { !pending && <input type="submit" value="Login" /> }
                { pending && <input type="submit" value="Loading ...." style={{backgroundColor:'maroon', color:'white'}}/> }
            </form>
        </div>
     );
}

export default AdminLogin;