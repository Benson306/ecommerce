import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Store } from 'react-notifications-component';
import { Checkmark } from 'react-checkmark';

import { TrinitySpinner } from 'loading-animations-react';
import useCart from "../../context/CartContext";

const Payment = () => {

    const { location } = useHistory();

    
    const [price, setPrice] = useState([]);
    const [loading, setLoading] = useState(false);

    const [phone, setPhone] = useState(true);
    const [show, setShow] = useState(false);


    const { products, total, updateCounty, updatePickup }  = useCart();

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch(`${process.env.REACT_APP_API_URL}/get_order/${location.state}`, {signal: abortCont.signal})
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setPrice(res.total)
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

    function showSpinner(){
        document.querySelector('#spinner').style.visibility='visible';
        document.querySelector('#spinner').style.width='20px';
        document.querySelector('#spinner').style.marginLeft='20px';
    }
    function hideSpinner(){
        document.querySelector('#spinner').style.visibility='hidden';
        document.querySelector('#spinner').style.width='0px';
        document.querySelector('#spinner').style.marginLeft='0px';
    }

    function showSpinner1(){
        document.querySelector('#spinner2').style.visibility='visible';
        document.querySelector('#spinner2').style.width='20px';
        document.querySelector('#spinner2').style.marginLeft='20px';
    }
    function hideSpinner1(){
        document.querySelector('#spinner2').style.visibility='hidden';
        document.querySelector('#spinner2').style.width='0px';
        document.querySelector('#spinner2').style.marginLeft='0px';
    }
    const [clickable, setClickable] = useState(false);
    const handleStk =  (e) =>{
        e.preventDefault();
        
        showSpinner();

        //  fetch(`${process.env.REACT_APP_API_URL}/stk_push/`+data,{
        //      credentials: 'include',
        //      proxy: true, 
        //      withCredentials: true,
        //      method: 'POST',
        //      headers: {'Content-Type':'application/json'},
        //      body: JSON.stringify({ phone })
        //  })
        // .then((res)=>{
        //     return res.json();
        // })
        // .then((res)=>{
        //     hideSpinner();
        //     notify("Information","MPESA payment request has been sent to your number. Enter PIN to proceed","info");
        // })

        hideSpinner();
    }

    const [code, setCode]= useState('');

    const checkNumber = (num) =>{
        if(num.length === 12 && num.startsWith("254")){
            setClickable(true);
        }else{
            setClickable(false);
        }
    }

    const handleConfirm = (e) =>{

        e.preventDefault();

        showSpinner1();

        //  fetch(`${process.env.REACT_APP_API_URL}/confirm_payment/`,{
        //      method: 'POST',
        //      headers: {'Content-Type':'application/json'},
        //      body: JSON.stringify({ code, data })
        //  })
        // .then((res)=>{
        //     return res.json();
        // })
        // .then((res)=>{
        //     hideSpinner1();
        //     if(res === 'confirmed'){
        //         setShow(true);
        //         //document.querySelector('.animation').style.visibility = "visible";
        //         //notify("Success","Payment Has Been Confirmed. Our agents will make delivery in 2 Days. Thank you For shopping with US","Success");
        //     }else if(res === 'pending'){
        //         notify("Pending","Payment Has Not been received. Try Again in A few minutes","Danger");
        //     }else if(res === 'existing'){
        //         notify("Failed","MPESA code has already been used to confirm another payment","Danger");
        //     }
            
        // })
    }

    let deliveryFee = 100;

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
                    <Link to={'/account/orders'}><button>OK!</button></Link>
                </center>
                
            </div> }
            
            <br />
            {loading && <div>Loading ....</div>}
            {!loading && <div>
                Amount to be Paid:
                    <br />
                   <h3>{price + deliveryFee }</h3>
                    <br />
                We accept payments through MPESA. Insert you MPESA phone number below and click Pay to initiate an MPESA STK PUSH notification.
                    <br />
                    <br />
                <form onSubmit={handleStk}>
                    <label htmlFor="">Phone Number:</label>
                        <br />
                    <input type="text" name="" onChange={e =>{ setPhone(e.target.value) ;checkNumber(e.target.value) }} placeholder="254712345678" required />
                        { !clickable && <p style={{color:'red'}}>Number should start with 254 and have 12 digits.</p> }
                        {!clickable && <br />}
                    { clickable && <div style={{display: 'flex'}}>
                        
                        <input type="submit" value="Pay" />
                        <div id="spinner" style={{width:'20px',justifyContent:'center', marginLeft:'20px', visibility:'hidden'}}><TrinitySpinner text="" color="blue" /></div>
                    </div> }
                    
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
                    <div style={{display:'flex'}}>
                        <input type="submit" value="Confirm Payment" />
                        <div id="spinner2" style={{width:'20px',justifyContent:'center', marginLeft:'20px', visibility:'hidden'}}><TrinitySpinner text="" color="blue" /></div>
                    </div>
                </form>
            </div> }
           
</div> );
}
 
export default Payment;