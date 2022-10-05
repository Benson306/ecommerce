import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DeliveredOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(10);

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = orders.slice(indexOfFirstData, indexOfLastData);

    const pageNumbers = [];
    const totalData = orders.length;

    for(let i =1; i <= Math.ceil(totalData / dataPerPage);i++){
        pageNumbers.push(i);
    }

    function paginate(number){
        setCurrentPage(number);
    }

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/delivered_orders',{ signal: AbortController.signal})
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
        <input 
            type="text" 
            placeholder="Search ...." 
            style={{padding:'10px', marginLeft:'80%'}}       
            onChange={e => { setQuery(e.target.value); setDataPerPage(orders.length)} } 
        />
        <table>
            <tr>
                <th>#</th>
                <th>Order Id:</th>
                <th>No. of Items</th>
                <th>Total Cost</th>
                <th>Date Placed</th>
                <th>Delivered On</th>
                <th></th>
            </tr>
            {loading && <div><br /> Loading ....</div>}
            { !loading && <tbody>
                {
                    !loading && currentData.filter(order =>{
                        if(query === '' || query === null){
                            return order;
                        }else if(
                            order._id.toLowerCase().includes(query.toLowerCase()) ||
                            order.order_date.toLowerCase().includes(query.toLowerCase()) ||
                            order.delivery_date.toLowerCase().includes(query.toLowerCase())
                        ){
                            
                            return order;  
                        }
                    }).map( order =>
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
                                     <td><Link to={{pathname: `/admin_dashboard/order_summary`, state: {items: order.items ,user_id: order.user_id, order_id: order._id}}}>View Summary</Link></td>
                                </tr> 
                                  )
                            }
                
                )}
            </tbody>}
            
        </table>
        <br />
        <div className='pageNumbers' style={{display:'flex', marginLeft: '5%',color:'darkblue'}}>
            <br />

            {
                pageNumbers.map( number =>(
                    <div style={{border: '1px solid gray', padding:'10px'}}>
                        <a href='#' onClick={()=>paginate(number)}>
                            {number}
                        </a>
                    </div>
                ))
            }
            <br />
        </div>
    </div> );
}
 
export default DeliveredOrders;