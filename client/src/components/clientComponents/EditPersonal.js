import { useState, useEffect } from "react";
import { Store } from 'react-notifications-component';
import { useHistory } from 'react-router-dom';

const EditPersonal = () => {
        const [ loading, setLoading ] = useState(true);
        const [ btnLoading, setBtnLoading ] = useState(false);
        const [ error, setError ] = useState(false);

        const history = useHistory();

        const [name, setName] = useState('');
        const [ email, setEmail ] = useState('');
        const [ phone, setPhone ] = useState('');
        const [ password, setPassword ] = useState('');

        const [ show , setShow ] = useState(false);

        const togglePassword = (e) => {
            e.preventDefault()
            setShow(!show);
          };

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
    
        useEffect(()=>{
            const abortCont = new AbortController();
            fetch(`${process.env.REACT_APP_API_URL}/profile`,{
                credentials: 'include', 
                proxy: true, 
                withCredentials: true,
                signal: abortCont.signal
            })
            .then(res=>{
                if(res.ok){
                    return res.json();
                }else{
                    setError(true);
                    setLoading(false);
                }
            })
            .then((res)=>{
                setError(false);
                setLoading(false);
                setName(res.name);
                setEmail(res.email);
                setPhone(res.phone);
                setPassword(res.password);
            })
            .catch((err)=>{
                setError(true);
                setLoading(false);
            })
    
    
            return ()=> abortCont.abort();
        },[])

        const handleSubmit = (e) =>{
            setBtnLoading(true);
            e.target.value = null;
            e.preventDefault();

            fetch(`${process.env.REACT_APP_API_URL}/edit_profile`,{
                credentials: 'include', 
                proxy: true, 
                withCredentials: true,
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ name, email, phone, password })
            })
            .then((res)=>{
                if(res.ok){
                    notify("Success","Personal Details Edited","success")
                    history.push('/account/personal')
                }else{
                    setBtnLoading(false)
                    notify("Failed","Server Error, Retry","danger");
                }
            })
            .catch(err =>{
                setBtnLoading(false)
                notify("Failed","Server Error, Retry","danger");
            })
        }
    return ( 
        <div className="personal">

        <h1>Edit Personal Information</h1>
        <hr />
        <br />
        <br />
        { loading && <div>Loading ...</div>}

        { error && <div>Failed to Fetch</div>}

        {
            !loading && !error &&
            <form onSubmit={handleSubmit} action="">
            <label htmlFor="">Full Name:</label>
            <br />
            <input 
                type="text" 
                onChange={(e) => setName(e.target.value) }
                style={{color: 'black'}}
                defaultValue={ name }
                required />
            <br />
            <label htmlFor="">Email:</label>
            <br />
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value) }
                style={{color: 'black'}}
                defaultValue={ email }
                required />
            <br />
            <label htmlFor="">Phone Number:</label>
            <br />
            <input 
                type="text" 
                onChange={(e) => setPhone(e.target.value) }
                style={{color: 'black'}}
                defaultValue={ phone }
                required />
            <br />
            <label htmlFor="">Password:</label>
            <br />
            <input 
                type={show ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value) }
                style={{color: 'black'}}
                defaultValue={ password }
                required />
            <br />
            <button onClick={togglePassword} style={{border:'none', color:'blue'}}>Show Password</button>
            <br />
            <br />
            {
                btnLoading && <input type="submit" value="Loading ..." style={{backgroundColor:'maroon', color:'white'}}/>
            }
            { !btnLoading && <input type="submit" value="Save Details" /> }
        </form>
        }
        

        </div>
     );
}
 
export default EditPersonal;