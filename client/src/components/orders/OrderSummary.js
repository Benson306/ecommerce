import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Store } from 'react-notifications-component';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const OrderSummary = () => {
    const location = useLocation();
    const data = location.state;
    const history = useHistory();

    const [userData, setUserData] = useState([]);
    const [userLoading, setUserLoading] = useState(true);

    const [deliveryData, setDeliveryData ] = useState([]);
    const [delivLoading, setDelivLoading] = useState(true);

    const [payment, setPayment] = useState([]);
    const [payLoading, setPayLoading] = useState(true);


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [order, setOrder] = useState([]);

    const [dt, setDt] =  useState([]);

    useEffect(()=>{
        const abortCont =  new AbortController();

        data.items.map(dt =>{
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

        fetch('/user_data/'+data.user_id, {signal: abortCont.signal})
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setUserData(res);
            setUserLoading(false);
        })

        fetch('/address/'+data.user_id, {signal: abortCont.signal})
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setDeliveryData(res);
            setDelivLoading(false);
        })

        fetch('/payment/'+data.order_id, {signal: abortCont.signal})
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setPayment(res);
            setPayLoading(false);
        })

        fetch('/get_order/'+data.order_id, {signal: abortCont.signal})
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setOrder(res);
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

    const generatePDF = () => {

        const input = document.querySelector('.makeDelivery');
        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new JsPDF('landscape','px','a4');
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
        })
        ;
    }

    const handleClick = (e)=>{
        e.preventDefault();

      fetch('/set_delivery/'+data.order_id)
      .then((res)=>{
          return res.json();
      })
      .then(res =>{
            history.push({
                pathname: '/admin_dashboard/pending_orders',
                state: res
            })
            notify("Information","Order has been marked as delivered today.","success");
      })
      
    }
    

    const addData = (item_id, name, price, quantity) =>{
        let newData = {item_id, name, price, quantity};
        setDt(prevArray => [...prevArray, newData]);
    }

    let no = 1;
    let total = 200;

    let prefix = '';

    if(deliveryData !== null){
        if(deliveryData.type === 'pickup' ){
            prefix = 'Point';
        }else{
            prefix = 'Delivery'
        }
    }
    
    return ( 
        <div className="pdf">
    <div className="makeDelivery">
            <div className="detailsPreview">
            <h2>User's Personal Information</h2>
        <hr />
        <br />

        { loading && <div>Loading ...</div>}
        {   !userLoading && 
        <div className="details">
                <div className='dtlTabs'>
                <div className="tabs">
                    <div className="title">Full Name:</div>
                    <div className="body">{userData.name}</div>
                </div>
                <div className="tabs">
                    <div className="title">Email:</div>
                    <div className="body">{userData.email}</div> 
                </div>
                <div className="tabs">
                    <div className="title">Phone Number:</div>
                    <div className="body">{userData.phone}</div>
                </div>
            </div>
            
        </div>
        }
        <br />
        <h2>Delivery Details:</h2>
        <hr />
        <br />
        { loading && <div>Loading ...</div>}
        { !delivLoading &&
            <div className="details">
                <div className="dtlTabs"> 


                <div className="tabs">
                    <div className="title">Delivery Type:</div>
                    <div className="body">{deliveryData.type} {prefix}</div>
                </div>
                
                <div className="tabs">
                    <div className="title">County:</div>
                    <div className="body">{deliveryData.county}</div>
                </div>


                <div className="tabs">
                    {
                        deliveryData.pickup !== '' ? <div className="title">Pick-up Point:</div> : <div className="title">Delivery Location:</div>
                    }
                    {
                        deliveryData.pickup !== '' ? <div className="body">{deliveryData.pickup}</div> : <div className="body">{deliveryData.specificAddr}</div>
                    }
                </div>

                <div className="tabs">
                    <div className="title">Delivery Date:</div>
                    <div className="body">{order.delivery_date}</div>
                </div>
                
                
                </div>
            </div>
        }
        <br />
        <h2>Items on Order</h2>
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
            <h2>Payment</h2>
            <hr />
            <br />
            { !payLoading && payment.length  !== 0 ? 
            <div className="details">
                <div className="dtlTabs"> 
                    <div className="tabs">
                        <div className="title">Transaction Code:</div>
                        <div className="body">{payment[0].TransactionId}</div>
                    </div>
                    
                    <div className="tabs">
                        <div className="title">Amount:</div>
                        <div className="body">{payment[0].Amount}</div>
                    </div>
                    <div className="tabs">
                        <div className="title">Phone Number:</div>
                        <div className="body">{payment[0].PhoneNumber}</div>
                    </div>
                </div>
            </div> : <div>No payment Recieved</div>
            }
            <br />



            </div>
    </div>
        <button onClick={(e)=> generatePDF()} className='btn' type="button">Print Summary</button>
        <br /><br />
    </div>
     );
}
 
export default OrderSummary;