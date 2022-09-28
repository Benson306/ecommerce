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
    let total = 200;
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
                    <div className="subttl">
                       <div className="brand">Delivery Amount:</div>        
                       200
                    </div>
                    <br />
                    <div className="subTotal">
                       <div className="brand">Subtotal:</div>        
                       {total}
                    </div>
                    <br />

                    <Link to={'/cart'}><button className="recart">Make Changes to Order</button></Link>
                    <br /><br />
                   <h2>Make Payment</h2>
                   <hr /> 
                   <div className="payment">
                        We accept payments through MPESA. Insert you MPESA phone number below and click on Pay to inititate an MPESA STK PUSH notification.
                        <br />
                        <br />
                        <form action="">
                            <label htmlFor="">Phone Number:</label>
                            <br />
                            <input type="text" name="" placeholder="+254712345678" id="" />
                            <br />
                            <input type="submit" value="Pay" />
                        </form>
                        Input your PIN on your phone to Complete Payment.
                        <br /><br />
                        Now wait to receive your MPESA message. Enter the Transaction Code in the form below and click on Confirm Payment.
                        <br />
                        <br />
                        <form action="">
                            <label htmlFor="">Transaction Code:</label>
                            <br />
                            <input type="text" name="" placeholder="OCK1W5SQ8H" id="" />
                            <br />
                            <input type="submit" value="Confirm Payment" />
                        </form>
                   </div>
                   

                   <br /><br /><br />


            </div>

        </div>
        <div className="panel2">
            <Delivery />
        </div>
        
        
    </div>
     );
}
 
export default Summary;