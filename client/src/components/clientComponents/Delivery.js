import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddDeliveryAdrr from "./AddDeliveryAddr";

const Delivery = () => {

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ data, setData ] = useState([]);
    const [found, setFound] = useState(true);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/address',{signal: abortCont.signal})
        .then((res)=>{
            if(res.status === 200){
                return res.json();
            }else{
                setLoading(false);
                setError(false);
            }
        })
        .then(res =>{

            setLoading(false);
            setError(false);

            if(res==='failed'){
                setFound(false);
            }else{
                setFound(true);
                setData(res);
            }
        })
        .catch((err)=>{
            setLoading(false);
            setError(true);
        })
        
        return ()=> abortCont.abort();
    },[])
    let prefix = '';

    if(data !== null){
        if(data.type === 'pickup' ){
            prefix = 'Point';
        }else{
            prefix = 'Delivery'
        }
    }
    

    return ( 
        <div className="deliv">
                    
                        { loading && <div>Loading ...</div>}
                        { error && <div>Failed to Fetch Data</div>}
                        { !loading && !error && !found && <AddDeliveryAdrr/>}
                        { !loading && !error && found &&
                        <div>
                            <div className="deliveryHeader">
                                <img src={require("../../images/fast-delivery.png")} alt="" />My Delivery Details
                            </div>
                            <div className="deliveryBody">
                            <div className="ben">
                            
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
                                
                                <Link to="/account/edit_delivery_addr" style={{textDecoration:'none'}}><button style={{float:'center', marginRight:'5%', backgroundColor:'transparent', color:'maroon', width:'60%'}}>Change Delivery Address</button></Link>
                                
                            </div>
                        </div>
                        </div> 
                        }
                    
                    
                </div>
    );
}
 
export default Delivery;