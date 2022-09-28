import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
    const location = useLocation();
    const data = location.state;
    
    useEffect(()=>{
        
    })



    return ( <div className="payment">
                <br />
            <h2>Make Payment</h2>
                <br />
            <hr /> 
            <br />
            Amount to be Paid: <b>{}</b>
            <br />
                <br />
            We accept payments through MPESA. Insert you MPESA phone number below and click Pay to initiate an MPESA STK PUSH notification.
                <br />
                <br />
            <form action="">
                <label htmlFor="">Phone Number:</label>
                    <br />
                <input type="text" name="" placeholder="254712345678" id="" />
                    <br />
                <input type="submit" value="Pay" />
            </form>
            Input your PIN on your phone to Complete Payment.
                <br /><br />
            Now wait to receive your MPESA message. Enter the Transaction Code in the form below and click on Confirm Payment.
                <br /><br />
            <form action="">
                <label htmlFor="">Transaction Code:</label>
                    <br />
                <input type="text" name="" placeholder="OCK1W5SQ8H" id="" />
                    <br />
                <input type="submit" value="Confirm Payment" />
            </form>
</div> );
}
 
export default Payment;