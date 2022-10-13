import { useEffect, useState } from "react";
import { Store } from 'react-notifications-component';
import { useHistory } from 'react-router-dom';

const EditDeliveryAdrr = () => {

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

        fetch(`${process.env.REACT_APP_API_URL}/county`,{signal: abortController.signal})
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

        fetch(`${process.env.REACT_APP_API_URL}/county/`+county ,{signal: abortController.signal})
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

    },[county]);

    const [ initial, setInitial ] = useState('');
    const [ load, setLoad ] = useState(true);
    const [ hitch, setHitch] = useState(false);
    const [id, setId] = useState('');

    useEffect(()=>{
        const abortController = new AbortController();

        fetch(`${process.env.REACT_APP_API_URL}/address`,{
            credentials: 'include', 
            proxy: true, 
            withCredentials: true,
            signal: abortController.signal
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }else{
                setLoad(false);
                setHitch(true);
            }
        })
        .then(res =>{
            setLoad(false);
            setHitch(false);
            setType(res.type)
            setCounty(res.county)
            setPickup(res.pickup)
            setSpecific(res.specificAddr)
            setId(res._id);
            setInitial(res);
        })
        .catch((err)=>{
            setLoad(false);
            setHitch(true);
        })

        
        
        return () => abortController.abort();
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

    function handleSubmit(e){
        e.preventDefault();
        e.target.value = null;
        let body = {};
        if(type === 'door'){
            body = { type,county,pickup: '', specificAddr}
            setPickup('');
        }else if(type === 'pickup'){
            body = { type,county,pickup, specificAddr:''}
        }


        fetch(`${process.env.REACT_APP_API_URL}/edit_address/`+id,{
            credentials: 'include', 
            proxy: true, 
            withCredentials: true,
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(body)
        })
        .then((res)=>{
            if(res.ok){
                notify("Success","Delivery Address Edited","success");
                history.push('/account/delivery');
            }else{
                notify("Failed","Server Error. Retry","danger");
            }
        })
        .catch(err =>{
            notify("Failed","Server Error. Retry","danger");
        })
    }
    let prefix = '';

    if(initial !== null){
        if(initial.type === 'pickup' ){
            prefix = 'Point';
        }else if(initial.type === 'door'){
            prefix = 'Delivery'
        }
    }

    return ( 
        <div className="deliv">
                    <div className="deliveryHeader">
                        <img src={require("../../images/fast-delivery.png")} alt="" />My Delivery Details
                    </div>
                    <div className="deliveryBody">
                        <div style={{color:'maroon'}}>* Edit Delivery Address. <br /> Make changes where necessary and Submit the form:</div>
                        <br />
                        { load && <div>Loading ...</div>}
                        { hitch && <div>Failed to fetch. Check Your internet connection</div>}
                        { !load && !hitch && 
                        <form onSubmit={handleSubmit} action="">
                        Delivery Type:
                            <br />
                            <select
                                required 
                                onChange={(e) => setType(e.target.value)} >
                                <option value={initial.type} style={{textTransform:'capitalize'}}>{initial.type} {prefix}</option>
                                <option value="door">Door Delivery</option>
                                <option value="pickup">PickUp Point</option>
                            </select>
                            <br />
                        Choose County:
                        <br />
                            
                            <select onChange={(e) => setCounty(e.target.value)} required>
                                <option value={initial.county}>{initial.county}</option>
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
                                        <option value={initial.pickup}>{initial.pickup}</option>
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
                                    <textarea name="" id="" cols="30" rows="5" onChange={(e) => setSpecific(e.target.value)} defaultValue={initial.specificAddr} required="yes"></textarea>
                                </div> : ''
                            }
                            
                        <br />
                        <button type='submit'>Set Pickup Location</button>
                        </form> }
                    </div>
                    
                </div>
    );
}
 
export default EditDeliveryAdrr;