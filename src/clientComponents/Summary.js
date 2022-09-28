import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Delivery from "./Delivery";
import Personal from "./Personal";

const Summary = () => {
    const location = useLocation();
    const data = location.state;

    //console.log(data);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dt, setDt] =  useState([]);

    useEffect(()=>{
        const abortCont =  new AbortController();

        data.map(dt =>{
            fetch('/products/'+dt.item_id, {signal: abortCont.signal})
            .then((res)=>{
            return res.json();
            })
            .then((res)=>{
                addData(res._id, res.prodName, res.price, dt.quantity);
                setProducts(current => [... current, res]);
                
            })
        })
        setLoading(false);

       return () => abortCont.abort(); 
    },[])
    
   

    const addData = (item_id, name, price, quantity) =>{
        let newData = {item_id, name, price, quantity};
        setDt(prevArray => [...prevArray, newData]);
    }

    let no = 1;
    let total = 0;
    return ( 
    <div className="summary">
        <div className="panel1">
            <div className="detailsPreview">
                <Personal />
                <br />
                <h2>Your Order</h2>
                <br />
                <hr />
                
                
                    <table>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    {loading && <div>Loading...</div>}
                    {
                        !loading && dt.reverse().map(dt =>(
                            <tr>
                                
                                <td>{ no++ }</td>
                                <td>{dt.name}</td>
                                <td>{dt.price}</td>
                                <td>{dt.quantity}</td>
                                <td>{dt.price*dt.quantity}</td>
                                
                            </tr>
                            
                        ))
                    }
                    {
                        !loading && dt.map(dt =>
                            {total = total + (dt.price*dt.quantity)}
                        )
                    }
                    </table>
                    <div className="subTotal">
                       <div className="brand">Subtotal:</div>        
                       {total}
                    </div>
                    <br />

                    <Link to={'/cart'}><button className="recart">Make Changes to Order</button></Link>
                    
            </div>
        </div>
        <div className="panel2">
            <Delivery />
        </div>
        
        
    </div>
     );
}
 
export default Summary;