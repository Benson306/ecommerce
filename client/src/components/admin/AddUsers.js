import { useState, useEffect } from 'react'
import '../../index.css'
import { Store } from 'react-notifications-component';

const AddUsers = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const data = { email, password };

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

        if(password === confirmPass){
            fetch('/admins',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(data=>{
                return data.json();
            })
            .then((data)=>{
                if(data === 'saved'){
                    e.target.reset()
                    notify("Success","Admin Added","success")
                }else{
                    notify("Failed","Another user exists with the same email.","danger")
                }
                
            }).catch( (err)=>{
                console.log(err)
                notify("Failed","Server Error. Try Again.","danger")
            })
        }else{
            notify("Failed","Password Does not Match. Try Again.","danger")
        }

        

    }

    return ( 
        <div className="addUsers">
                <br />
                Add Users:
                <br />
                <form onSubmit={handleSubmit} style={{display:'block'}}className="add_category">
                    <label htmlFor="">Email:</label>
                    <br />
                    <input 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Username"
                        required
                    />
                    <br /><br />
                    <label htmlFor="">Password:</label>
                    <br />
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Username"
                        required
                    />
                    <br /><br />
                    <label htmlFor="">Confirm Password:</label>
                    <br />
                    <input 
                        type="password" 
                        onChange={(e) => setConfirmPass(e.target.value)} 
                        placeholder="Username"
                        required
                    />
                    <br /><br />
                    <input type="submit" value="Save" />
                    <br />
                </form>
                <br />
            </div>
     );
}
 
export default AddUsers;