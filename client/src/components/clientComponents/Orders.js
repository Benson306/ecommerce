import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrinitySpinner } from 'loading-animations-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch(`${process.env.REACT_APP_API_URL}/my_order`,{
            credentials: 'include', 
            proxy: true, 
            withCredentials: true, 
            signal: abortCont.signal
        })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setOrders(res);
            setLoading(false);
        })

        return ()=> abortCont.abort();
    },[])

    let count = 1;
    return ( <div className="orders">
        <br />
        <center>
            <h2>My Orders</h2>
        </center>
        <br /><hr /><br />
        <table>
            <tr>
                <th>#</th>
                <th>Order Id:</th>
                <th>No. of Items</th>
                <th>Total Cost</th>
                <th>Date Placed</th>
                <th>Completion Status</th>
                <th>Delivery Status</th>
                <th>Delivery Date</th>
                <th></th>
                <th></th>
            </tr>
            <tbody>
                { loading && <div id="spinner" style={{width:'20px',justifyContent:'center', marginLeft:'20px', visibility:'visible'}}><TrinitySpinner text="" color="blue" /></div>}
                {
                    !loading && orders.map( order =>
                            {
                                let cost = 200;
                                let number =  order.items.length;
                                order.items.map(item =>{
                                    cost += (item.price * item.quantity)
                                })                                

                                return (
                                    <tr>
                                    <td>{count++}</td>
                                    <td style={{maxWidth:'20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{order._id}</td>
                                    <td>{number}</td>
                                    <td>{cost}</td>
                                    <td>{order.order_date}</td>
                                    {order.completion_status === 'completed' ? <td style={{color:'green', fontWeight:'bold'}}>{order.completion_status}</td> : <td style={{color:'red'}}>{order.completion_status}</td>}
                                    <td>{order.delivery_status}</td>
                                    <td>{order.delivery_date}</td>
                                    <td><Link to={{pathname:'/view_summary', state: order.items }} style={{color:"blue"}}>View</Link></td>
                                    {order.completion_status !== 'completed' ? <td><Link to={{pathname:'/payment', state: order._id }} style={{color:'green'}}>Complete Order</Link></td>  : <td></td>}
                                    
                                </tr> 
                                  )
                            }
                
                )}
            </tbody>
            
        </table>
        <br />
        <br />
    </div> );
}
 
export default Orders;