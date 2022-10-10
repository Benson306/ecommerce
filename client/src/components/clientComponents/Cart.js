import {useState, useEffect } from 'react';
import { Store } from 'react-notifications-component';

import { Link, useHistory } from 'react-router-dom';


const Cart = () => {
    const history =  useHistory();
    
    const [products, setProducts] = useState([]);
    const [pending , setPending] = useState(true);
    const [error, setError] = useState(false);

    const [newPrice, setNewPrice] = useState(0);
    const [data, setData ] = useState([]);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/cart', {signal: abortCont.signal})
        .then((res)=>{
            if(!res.ok){
                setPending(false);
                setError(true);

            }else{
                return res.json();
            }
        })
        .then((res)=>{
            setError(false)
            setProducts(res);
            if(res.length === 0){

            }else{
                let prc = 0;
                res.map(r =>{
                prc += Number(r.price);
                addData(r._id, r.price, 1);
                })
                setNewPrice(prc);
            }
            
            
            setPending(false);
        })
        .catch((err)=>{
            console.log(err)
            setError(true);
            setPending(false);
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
            duration: 1500,
            onScreen: true
            }
        }) 
    };

    function getTotal(){
        let prc = 0;
        data.map(r =>{
            prc += Number(r.price*r.quantity);
        });
        setNewPrice(prc);
    }

    const addData = (item_id, price, quantity) =>{
        let newData = {item_id, price, quantity};
        setData(prevArray => [...prevArray, newData]);
    }

    const changeData = (item_id, quantity) =>{
        data.forEach(dt=>{
            if(dt.item_id === item_id ){
                dt.quantity = Number(quantity);
            }
        })
    }
    

      const handleRemove = (e, id) =>{
            e.preventDefault();

            fetch('/remove_cart/'+id,{
                method: 'DELETE',
                headers: {'Content-Type':'application/json'}
            })
            .then((res)=>{
                return res.json();
            })
            .then(res =>{
                if(res === 'deleted'){
                    notify("Success","Removed From Cart","success");
                    history.go(0);
                }
            })
      }
      
      const handleClick = (e)=>{
          e.preventDefault();

        history.push({
            pathname: '/summary',
            state: data
        })

        
      }

  

    return ( 
        <div className="cart">
            { !pending && error && <div><br /><br />Failed to fetch Data.. Try again</div>}
            { pending && <div><br /><br />Loading ....</div> }
            <div className='cartLayout'>

                <div className="crt">
                            {   !pending && !error &&  products.length > 0   ? products.map( product => (
                        
                        
                        <div className="cartProduct">
                            <div className="cartDetails">
                                    <div className="topCartDetails">
                                        <div className="prodHeading"><Link to={`/preview/${product._id}`}>{product.prodName}</Link></div>
                                        <div className="prodBody">
                                            Category: <Link to="">{product.categ}</Link> 
                                            <br />
                                            <div className="prodFooter">Ksh {product.price}</div>
                                            <br />
                                        </div>
                                </div>
                            </div>
                             
                            <div className="cartButton">
                                <form action="">
                                    <label style={{fontWeight:'bolder', padding:'10px'}}>Quantity:</label>
                                    <input defaultValue={1} onChange={e => { 

                                        e.target.value < 1  ?   changeData(product._id, 1) : changeData(product._id, e.target.value) ;
                                        getTotal();

                                     }} type="number" min={1} name="" id="" />
                                </form>
                                <br />
                                
                                <button onClick={ (e) => { handleRemove(e, product._id) }}>Remove from Cart</button>
                                <br />
                                
                            </div>
                    </div> 

                    
                ) ) : <div></div> } 

                </div>
           
                { !pending && !error && products.length > 0  ?  <div className='deliv'>
                            <h3>Total Price:</h3> <br />
                               <h1>{ newPrice }</h1> 
                                <br /><br />
                                <button onClick={ (e)=>{handleClick(e)}}><img src={require('../../images/shopping-cart.png') } alt="" /> Checkout </button>
                </div> : <div></div> }
                
            </div>

            { !pending && !error && products.length === 0  ? 
            <div id='emptyCart'>
                <h3>You have no items in Cart</h3><br /><br />
                <img src={require('../../images/empty-cart.png')} alt="" />
                <br /><br />
                <Link style={{textDecoration: 'none', color:'black'}} to={'/'}><button style={{padding:'15px', borderRadius: '5px', backgroundColor:'orange', border:'none'}}>Go Back</button></Link>
            </div> : <div></div> }

            <br />
        </div>
        );
}
 
export default Cart;