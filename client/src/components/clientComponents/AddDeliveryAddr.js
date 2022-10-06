import { useEffect, useState } from "react";
import { Store } from 'react-notifications-component';
import { useHistory } from 'react-router-dom';

const AddDeliveryAdrr = () => {

    const [ type, setType ] = useState(null);
    const [ county, setCounty ] = useState('');
    const [ pickup, setPickup ] = useState('');
    const [ pickupData, setPickuupData] = useState([])
    const [specificAddr, setSpecific] = useState('');

    const [data, setData] = useState([]);

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);

    const history = useHistory();

    let uniqueData = [];

    useEffect(()=>{
        const abortController = new AbortController();

        fetch('/county',{signal: abortController.signal})
        .then((res)=>{
            if(res.ok){
                return res.json();
            }else{
                setLoading(false);
                setError(true);
            }
        })
        .then(res =>{
            setLoading(false);
            setError(false);
            let result = [];
            res.forEach( r =>{
                result.push(r.county)
            })
            uniqueData = [...new Set(result)];
            setData(uniqueData);
        })
        .catch((err)=>{
            setLoading(false);
            setError(true);
        })

        
        
        return () => abortController.abort();
    },[])


    useEffect(()=>{

        const abortController = new AbortController();

        fetch('/county/'+county ,{signal: abortController.signal})
        .then((res)=>{
            if(res.ok){
                return res.json();
            }else{
                setLoading(false);
                setError(true);
            }
        })
        .then(res =>{
            setLoading(false);
            setError(false);
            let result = [];
            res.forEach( r =>{
                result.push(r.location)
            })
            let uniqData = [...new Set(result)];
            setPickuupData(uniqData);
        })
        .catch((err)=>{
            setLoading(false);
            setError(true);
        })

        return () => abortController.abort();

    },[county])

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

    function handleSubmit(e){
        e.preventDefault();
        e.target.value = null;

        fetch('/add_address',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ type, county, pickup, specificAddr })
        })
        .then((res)=>{
            if(res.ok){
                notify("Success","Delivery Address Added","success");
                history.go(0);
            }else{
                notify("Failed","Server Error. Retry","danger");
            }
        })
        .catch(err =>{
            notify("Failed","Server Error. Retry","danger");
        })
    }

    return ( 
        <div className="deliv">
                    <div className="deliveryHeader">
                        <img src={require("../../images/fast-delivery.png")} alt="" />My Delivery Details
                    </div>
                    <div className="deliveryBody">
                        <div style={{color:'maroon'}}>* You Have not Set A Delivery Address. Fill the form Below:</div>
                        <br />
                        <form onSubmit={handleSubmit} action="">
                        Delivery Type:
                            <br />
                            <select
                                required 
                                onChange={(e) => setType(e.target.value)} >
                                <option value=""></option>
                                <option value="door">Door Delivery</option>
                                <option value="pickup">PickUp Point</option>
                            </select>
                            <br />
                        Choose County:
                        <br />
                        
                            <select onChange={(e) => setCounty(e.target.value)} required>
                                <option value=""></option>
                                { loading && <option value="">Loading ....</option> }
                                {
                                    data.map(dat=>(
                                        <option value={dat}>{dat}</option>
                                    ))
                                }   
                            </select>
                            <br />
                            {
                                type === 'pickup' && county !== null ? <div>
                                Select Pickup Location:
                                <br />
                                    <select onChange={(e) => setPickup(e.target.value)} required>
                                        <option value=""></option>
                                        { 
                                            pickupData.map(pick=>(
                                                <option value={pick}>{pick}</option>
                                            ))
                                        }
                                    </select>
                                <br />
                            </div> : ''
                                
                            }
                            
                            { type === 'door' ?
                                <div>
                                    Specify Your Location:
                                    <br />
                                    <br />
                                    <textarea name="" id="" cols="30" rows="5" onChange={(e) => setSpecific(e.target.value)} required="yes"></textarea>
                                </div> : ''
                            }
                            
                        <br />
                        <button type='submit'>Set Pickup Location</button>
                        </form>
                    </div>
                    
                </div>
    );
}
 
export default AddDeliveryAdrr;