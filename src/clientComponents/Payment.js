import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Store } from 'react-notifications-component';
import { Checkmark } from 'react-checkmark'

const Payment = () => {
    const location = useLocation();
    const data = location.state;
    
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [phone, setPhone] = useState(true);
    const [show, setShow] = useState(false);

    let cost = 200;

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/get_order/'+data, {signal: abortCont.signal})
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            res.items.map( items => {
                setPrices(current => [... current, items.price*items.quantity])
            })
            setLoading(false);
        })
        
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

    const handleStk =  (e) =>{
        e.preventDefault();
         fetch('/stk_push/'+data,{
             method: 'POST',
             headers: {'Content-Type':'application/json'},
             body: JSON.stringify({ phone })
         })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            notify("Infromation","MPESA payment request has been sent to your number. Enter PIN to proceed","info");
        })
    }
    const [code, setCode]= useState('');

    const handleConfirm = (e) =>{

        e.preventDefault();
         fetch('/confirm_payment/',{
             method: 'POST',
             headers: {'Content-Type':'application/json'},
             body: JSON.stringify({ code, data })
         })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            
            if(res === 'confirmed'){
                setShow(true);
                //document.querySelector('.animation').style.visibility = "visible";
                //notify("Success","Payment Has Been Confirmed. Our agents will make delivery in 2 Days. Thank you For shopping with US","Success");
            }else if(res === 'pending'){
                notify("Pending","Payment Has Not been received. Try Again in A few minutes","Danger");
            }else if(res === 'existing'){
                notify("Failed","MPESA code has already been used to confirm another payment","Danger");
            }
            
        })
    }

    return ( <div className="payment">
                <br />
            <h2>Make Payment</h2>
                <br />
            <hr /> 
            { show && <div className="animation">
                <br />
                <center>
                    <Checkmark size='xxLarge' />
                    <br />
                    <h2>Success</h2>
                    <br />
                    Payment Has Been Confirmed. Our agents will make delivery in 2 Days. 
                    <br />
                    <br />
                    Thank you For shopping with Us.
                    <br />
                    <br />
                    <Link to={'/account/personal'}><button>OK!</button></Link>
                </center>
                
            </div> }
            
            <br />
            {loading && <div>Loading ....</div>}
            {!loading && <div>
                Amount to be Paid:
                    {
                        prices.map( prc =>{
                                cost += Number(prc)
                        })
                    }
                    <br />
                   <h3>{cost}</h3>
                    <br />
                We accept payments through MPESA. Insert you MPESA phone number below and click Pay to initiate an MPESA STK PUSH notification.
                    <br />
                    <br />
                <form onSubmit={handleStk}>
                    <label htmlFor="">Phone Number:</label>
                        <br />
                    <input type="text" name="" onChange={e => setPhone(e.target.value) } placeholder="254712345678" required />
                        <br />
                    <input type="submit" value="Pay" />
                </form>
                Input your PIN on your phone to Complete Payment.
                    <br /><br />
                Now wait to receive your MPESA message. Enter the Transaction Code in the form below and click on Confirm Payment.
                    <br /><br />
                <form onSubmit={handleConfirm}>
                    <label htmlFor="">Transaction Code:</label>
                        <br />
                    <input type="text" name="" onChange={e => setCode(e.target.value) } placeholder="OCK1W5SQ8H" required />
                        <br />
                    <input type="submit" value="Confirm Payment" />
                </form>
            </div> }
           
</div> );
}
 
export default Payment;