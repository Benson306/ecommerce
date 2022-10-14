import {useState, useEffect } from 'react';
import { Store } from 'react-notifications-component';
import { TrinitySpinner } from 'loading-animations-react';

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

        fetch(`${process.env.REACT_APP_API_URL}/cart`, {
            credentials: 'include',
            withCredentials: true,
            proxy: true,
            signal: abortCont.signal
        })
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

      const handleRemove = (e, id) =>{
            e.preventDefault();

            showSpinner();

            fetch(`${process.env.REACT_APP_API_URL}/remove_cart/`+id,{
                withCredentials:true,
                proxy: true,
                credentials: 'include',
                method: 'DELETE',
                headers: {'Content-Type':'application/json'}
            })
            .then((res)=>{
                return res.json();
            })
            .then(res =>{
                if(res === 'deleted'){
                    notify("Success","Removed From Cart","success");
                    hideSpinner();
                    history.go(0);
                }
            })
      }
      
      const handleClick = (e)=>{
          e.preventDefault();
          showSpinner();

        history.push({
            pathname: '/summary',
            state: data
        })
        hideSpinner();
      }

      

    //   const addQuantity = (e, item_id) =>{
    //     e.preventDefault();
    //     let input = document.querySelector(`#+${item_id}`);
        
    //     input.value = Number(input.value) + 1;

    //     changeData(item_id, input.value);
    //     getTotal();
        
    //   }
    //   const minusQuantity = (e, item_id) =>{
    //     e.preventDefault();
    //     console.log(""+`#${item_id}`)
    //     let input = document.querySelector(".input");

    //     console.log(input);

    //     input.value = Number(input.value) - 1;

    //     changeData(item_id, input.value);
    //     getTotal();
    //   }

  

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
                                    {/* <button style={{marginLeft: '1%', backgroundColor:'orange', color:'black', border:'none', borderRadius:'5px', fontSize:'large',width:'10%'}} onClick={e => minusQuantity(e, product._id)}>-</button> */}
                                    <input id={`${product._id}`} className="input" defaultValue={1} style={{marginLeft:'10%'}} onChange={e => { 

                                        e.target.value < 1  ?   changeData(product._id, 1) : changeData(product._id, e.target.value) ;
                                        getTotal();

                                     }} type="number" min={1} />
                                     {/* <button style={{marginLeft: '1%', backgroundColor:'orange', color:'black', border:'none', borderRadius:'5px', fontSize:'large',width:'10%'}} onClick={e => addQuantity(e, product._id)}>+</button> */}
                                </form>
                                <br />
                                
                                <button onClick={ (e) => { handleRemove(e, product._id) }} style={{display:'flex',justifyContent:'center'}}>Remove from Cart<div id="spinner" style={{width:'0px',justifyContent:'center', marginLeft:'0px', visibility:'hidden'}}><TrinitySpinner text="" color="blue" /></div></button>
                                <br />
                                
                            </div>
                    </div> 

                    
                ) ) : <div></div> } 

                </div>
           
                { !pending && !error && products.length > 0  ?  <div className='deliv'>
                            <h3>Total Price:</h3> <br />
                               <h1>{ newPrice }</h1> 
                                <br />
                                <button onClick={ (e)=>{handleClick(e)}}><img src={require('../../images/shopping-cart.png') } style={{display:'flex',justifyContent:'center'}} alt="" /> Checkout <div id="spinner" style={{width:'0px',justifyContent:'center', marginLeft:'0px', visibility:'hidden'}}><TrinitySpinner text="" color="blue" /></div></button>
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