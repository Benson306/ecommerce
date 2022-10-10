import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Store } from 'react-notifications-component';

import Delivery from "./Delivery";
import Personal from "./Personal";

const Summary = () => {
    const location = useLocation();
    const data = location.state;
    const history = useHistory();


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
                setLoading(false)
            })
        })

       return () => abortCont.abort(); 
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
            duration: 3000,
            onScreen: true
            }
        }) 
    };

    const handleClick = (e)=>{
        e.preventDefault();

      fetch('/add_order',{
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data)
      })
      .then((res)=>{
          return res.json();
      })
      .then(res =>{
            history.push({
                pathname: '/payment',
                state: res
            })
            notify("Infromation","Cart has been cleared. Your order Has Been Saved under your Orders on your profile","info");
      })
      
    }
    

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
                <div className="inside">
                    <Delivery />
                </div>
                <br />
                <h2>Your Order</h2>
                <br />
                <hr />
                
                {loading && <div>Loading...</div>}
                    <table>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    
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
                    <div className="btns">
                        <div className="recart">
                            <Link to={'/cart'}><button>Make Changes to Order</button></Link>
                        </div>
                        <div className="recart2">
                            <button onClick={(e)=>handleClick(e)}>Complete Order</button>
                        </div>
                            
                    </div>
                    
                   <br />


            </div>

        </div>
        <br />
        <div className="panel2">
            <Delivery />
        </div>
        
        
    </div>
     );
}
 
export default Summary;