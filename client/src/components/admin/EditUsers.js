import { useState, useEffect } from 'react'
import '../../index.css'
import { Store } from 'react-notifications-component';
import { useHistory ,useParams } from 'react-router-dom';

const EditUsers = () => {

    const { id } = useParams();


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

    const history = useHistory();


    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(`${process.env.REACT_APP_API_URL}/admin/`+id,{signal: abortCont.signal})
        .then((data)=>{
            return data.json()
        })
        .then((data)=>{
            setData(data);
            setEmail(data.email);
            setPassword(data.password);
        })

        return () => abortCont.abort()
    },[])

    const newData = { email, password };

    const handleSubmit = (e) =>{
        e.preventDefault();
        e.target.value = null;

        fetch(`${process.env.REACT_APP_API_URL}/edit_admin/`+id,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newData)
        }).then(()=>{
           notify("Success","User Credentials Edited","success")
           history.push('/admin_dashboard/users')

        }).catch( ()=>{
            notify("Failed","Server Error. Try Again.","danger")
        })

    }

    return ( 
        <div className="categories" style={{backgroundColor: '#030c3b', color: 'white'}}>
                <br />
                Edit Admin:  <div style={{color:'orange', fontSize:'20px', marginLeft:'10%'}}></div> 
                <div style={{color:'orange', fontSize:'20px', marginLeft:'10%'}}>{!data && <span>Loading...</span> }</div> 
                <br />
                <br />
                <form onSubmit={handleSubmit} style={{display: 'block'}} className="add_category">
                <label htmlFor="">Email:</label>
                    <br />
                    <input 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        defaultValue={ email }
                        style={{width:'60%', padding:'10px'}}
                        required
                    />
                    <br /><br />
                    <label htmlFor="">Password:</label>
                    <br />
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        defaultValue={ password }
                        style={{width:'60%', padding:'10px'}}
                        required
                    />
                    <br />
                    <br />
                    <input type="submit" value="Save" style={{backgroundColor: 'maroon'}}/>
                </form>
                <br />
            </div>
     );
}
 
export default EditUsers;

