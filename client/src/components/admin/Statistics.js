import { useEffect, useState } from 'react';
const Statictics = () => {

    const [custCount, setCust] = useState('');
    const [pendingCount, setPending] = useState('');
    const [delivCount, setDelivered] = useState('');

    useEffect(()=>{
        const AbortCont = new AbortController();

        fetch('/count_users',{signal: AbortCont.signal})
        .then((res)=>{
            return res.json()
        })
        .then(res=>{
            setCust(res);
        })

        fetch('/order_count/'+'pending',{signal: AbortCont.signal})
        .then((res)=>{
            return res.json()
        })
        .then(res=>{
            setPending(res);
        })

        fetch('/order_count/'+'delivered',{signal: AbortCont.signal})
        .then((res)=>{
            return res.json()
        })
        .then(res=>{
            setDelivered(res);
        })

        return ()=>AbortCont.abort();
    },[])
 


    return ( <div className="statViews">
        <div className="statistics">
                    <img src={require('../../images/customer.png')} />
                    <div>
                        <h2>Customers</h2>
                        <h1>{ custCount < 10 ? <div>{ "0"+custCount}</div> : <div>{custCount}</div> }</h1>
                    </div>
        </div>
        <div className="statistics">
                    <img src={require('../../images/pending.png')} />
                    <div>
                        <h2>Pending Orders</h2>
                        <h1>{ pendingCount < 10 ? <div>{ "0"+pendingCount}</div> : <div>{pendingCount}</div> }</h1>
                    </div>
        </div>
        <div className="statistics">
                    <img src={require('../../images/delivered.png')} />
                    <div>
                        <h2>Delivered Orders</h2>
                        <h1>{ delivCount < 10 ? <div>{ "0"+delivCount}</div> : <div>{delivCount}</div> }</h1>
                    </div>
        </div>
    </div> );
}
 
export default Statictics;