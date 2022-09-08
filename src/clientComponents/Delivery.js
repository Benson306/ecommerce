import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Delivery = () => {

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ data, setData ] = useState([]);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/address',{signal: abortCont.signal})
        .then(res=>{
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
            setData(res);
        })
        .catch((err)=>{
            setLoading(false);
            setError(true);
        })
        
        return ()=> abortCont.abort();
    },[])
    let prefix = '';
    if(data.type === 'pickup' ){
        prefix = 'Point';
    }else{
        prefix = 'Delivery'
    }

    return ( 
        <div className="deliv">
                    <div className="deliveryHeader">
                        <img src={require("../images/fast-delivery.png")} alt="" />My Delivery Details
                    </div>
                    <div className="deliveryBody">
                        { loading && <div>Loading ...</div>}
                        { error && <div>Failed to Fetch Data</div>}
                        { !loading && !error && 
                            <div className="ben">
                                <button style={{float:'right', marginRight:'5%', backgroundColor:'transparent'}}><Link to="/account/edit_delivery_addr" style={{textDecoration:'none', color:'maroon'}}>Change Delivery Address</Link></button>
                                <br />
                                <div className="title">Delivery Type:</div>
                                <div className="body">{data.type} {prefix}</div>
                                
                                <div className="title">County:</div>
                                <div className="body">{data.county}</div>
                                
                                
                                {
                                    data.pickup !== '' ? <div className="title">Pick-up Point:</div> : <div className="title">Delivery Location:</div>
                                }
                                {
                                    data.pickup !== '' ? <div className="body">{data.pickup}</div> : <div className="body">{data.specificAddr}</div>
                                }
                                
                            </div>
                        }
                    
                    </div>
                    
                </div>
    );
}
 
export default Delivery;