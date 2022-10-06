import { useState, useEffect } from 'react'
import '../../index.css'
import { Store } from 'react-notifications-component';

const AddDelivery = () => {

    const [location, setLocation] = useState('');
    const [county, setCounty] = useState('');

    const [counties, setCounties] = useState([]);
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const AbortCont = new AbortController();
        fetch('https://counties-kenya.herokuapp.com/api/v1?order=name&dir=asc', {signal: AbortCont.signal})
        .then(res=>{
            if(res.ok){
                return res.json();
            }else{
                setError(true)
            }
            
        })
        .then(res=>{
            setPending(false);
            setCounties(res);
        })
        .catch(err =>{
            setPending(false);
            setError(true)
        })

        
        return ()=> AbortCont.abort();

    },[])

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

    const data = { location, county };
    function handleSubmit(e){
        e.preventDefault();
        e.target.value = null;

        fetch('/delivery',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }).then(()=>{
            e.target.reset()
           notify("Success","Delivery Station Added","success")
        }).catch( (err)=>{
            console.log(err)
            notify("Failed","Server Error. Try Again.","danger")
        })

    }



    
    return ( <div className="categories">
    <br />
    Add Delivery Point:
    <br />
    <form onSubmit={handleSubmit} className="add_delivery">
        Select County:
        <br /><br />
        {
                error && <div style={{color:'red'}}>Failed to fetch Counties</div>
        }
        <select name="" id="" required onChange={(e) => setCounty(e.target.value)} >
            
            <option value=""></option>
            {
                isPending && <option>Loading ....</option>
            }
            
            {
                !isPending && !error && counties.map(county =>(
                        <option key={county.code} value={county.name}>{county.name}</option>
                ))
            } 
        </select>
        <br /><br />
        Specify Pickup Point:
        <br /><br />
        <input 
        type="text"
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Pickup Point"
        required
        />
        <br />
        <br />
        <input type="submit" value="Add" />
    </form>
    <br />
</div> );
}
 
export default AddDelivery;