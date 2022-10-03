import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PendingOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/pending_orders',{ signal: AbortController.signal})
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


    return ( <div className="pendingOrders">
        <br />
        <table>
            <tr>
                <th>#</th>
                <th>Order Id:</th>
                <th>No. of Items</th>
                <th>Total Cost</th>
                <th>Date Placed</th>
                <th>Expected Delivery Date</th>
                <th></th>
            </tr>
            <tbody>
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
                                    <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{order._id}</td>
                                    <td>{number}</td>
                                    <td>{cost}</td>
                                    <td>{order.order_date}</td>
                                    <td>{order.delivery_date}</td>
                                     <td><Link to={{pathname: `/admin_dashboard/make_delivery`, state: {items: order.items ,user_id: order.user_id, order_id: order._id}}}>Make Delivery</Link></td>
                                </tr> 
                                  )
                            }
                
                )}
            </tbody>
            
        </table>
    </div> );
}
 
export default PendingOrders;