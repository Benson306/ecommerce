import { useState, useEffect } from 'react'
import '../index.css'
import { Store } from 'react-notifications-component';

const AddDelivery = () => {

    const [categ, setCateg] = useState('');
    const categs = {categ}

    const [counties, setCounties] = useState([]);
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const AbortCont = new AbortController();
        fetch('https://counties-kenya.herokuapp.com/api/v1', {signal: AbortCont.signal})
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

    console.log(counties);

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



    
    return ( <div className="categories">
    <br />
    Add Delivery Point:
    <br />
    <br />
    <form className="add_delivery">
        Select County:
        <br /><br />
        {
                error && <div style={{color:'red'}}>Failed to fetch Counties</div>
        }
        <select name="" id="" required>
            
            <option value=""></option>
            {
                isPending && <option>Loading ....</option>
            }
            
            {
                !isPending && !error && counties.map(county =>(
                        <option key={county.code} value={county.code}>{county.name}</option>
                ))
            }
        </select>
        <br /><br />
        Specify Pickup Point:
        <br /><br />
        <input 
        type="text"
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