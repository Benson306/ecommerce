import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Store } from 'react-notifications-component';

import Delivery from "./Delivery";
import Personal from "./Personal";

const CompleteSummary = () => {
    const location = useLocation();
    const id = location.state;


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal ] = useState(0);

    const [data, setData] = useState();

    useEffect(()=>{
        const abortCont =  new AbortController();

        fetch(`${process.env.REACT_APP_API_URL}/get_order/${id}`, {signal: abortCont.signal})
            .then((res)=>{
                return res.json();
            })
            .then((res)=>{
                setProducts(res.items)

                setTotal(res.total);
                setLoading(false)
                setData(res)
            })

       return () => abortCont.abort(); 
    },[]);

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
            duration: 3000,
            onScreen: true
            }
        }) 
    };


    let no = 1;
    let deliveryCost = 100;
    return ( 
    <div className="summary">
        <div className="panel1">
            <div className="detailsPreview">
                <Personal />
                <br />
                <h2>Delivery</h2>
                <br />
                <hr />
                <div style={{display:'flex', gap:120, marginLeft: 10, marginTop:10}}>
                    <div>
                        <h3 style={{color:'maroon'}}>County:</h3>
                        <p>{data.deliveryCounty}</p>
                    </div>
                    <div>
                        <h3 style={{color:'maroon'}}>Pickup Point:</h3>
                        <p>{data.pickupPoint}</p>
                    </div>
                </div>
                
                <br />
                <h2>Your Order</h2>
                <br />
                <hr />
            
                {loading && <div>Loading...</div>}
                    <table>
                        <th>#</th>
                        <th>Items</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    
                    {
                        !loading && products.reverse().map(dt =>(
                            <tr>
                                
                                <td>{ no++ }</td>
                                <td>{dt.prodName}</td>
                                <td>{dt.price}</td>
                                <td>{dt.quantity}</td>
                                <td>{dt.price*dt.quantity}</td>
                                
                            </tr>
                            
                        ))
                    }
                    </table>
                    <div className="subttl">
                       <div className="brand">Delivery Amount:</div>        
                       100
                    </div>
                    <br />
                    <div className="subTotal">
                       <div className="brand">Subtotal:</div>        
                       {deliveryCost + total}
                    </div>
                    <br />
                    <div className="btns">
                        <div className="recart">
                            <Link to={'/account/orders'}><button style={{backgroundColor:'green', color:'white', border:'none'}}>Go Back</button></Link>
                        </div>                            
                    </div>
                   <br />
            </div>

        </div>
        
        
    </div>
     );
}
 
export default CompleteSummary;