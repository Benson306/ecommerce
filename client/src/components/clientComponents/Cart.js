import {useState, useEffect } from 'react';
import { Store } from 'react-notifications-component';

import { Link, useHistory } from 'react-router-dom';
import useCart from '../../context/CartContext';


const Cart = () => {
    const history =  useHistory();
    
    const [items, setItems] = useState([]);

    const { products , addQuantity, minusQuantity, removeFromCart, total }  = useCart();

    useEffect(()=>{

        const abortCont = new AbortController();

        setItems(products);

        return () => abortCont.abort();

    },[products])
    
 

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

    const handleRemove = (e, product) =>{
        e.preventDefault();
        removeFromCart(product)
    }

    const handleAddQuantity = (e, id) =>{
        e.preventDefault();
        addQuantity(id);
    }

    const handleMinusQuantity = (e, id) =>{
        e.preventDefault();
        minusQuantity(id);
    }

   
      
    const handleClick = (e)=>{
        e.preventDefault();

        history.push('/summary')
    }

    return ( 
        <div className="cart">
            <div className='cartLayout'>

                <div className="crt">
                            {   items.length > 0   ? items.map( product => (
                        
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
                            <div className="cartPanels">
                                <label style={{fontWeight:'bolder'}}>Quantity:</label>
                                <br /><br />
                                <div style={{display:'flex', alignSelf:'center', alignItems:'center'}}>
                                    <button style={{marginRight: '10%', backgroundColor:'orange', color:'black', border:'none', borderRadius:'5px', fontSize:'large',width:'10%', padding:'10px', display:'flex', justifyContent:'center'}} onClick={(e)=>{handleMinusQuantity(e, product._id)}}>-</button>
                                    <div style={{paddingLeft:'0px'}}>{product.quantity}</div>
                                    <button style={{marginLeft: '10%', backgroundColor:'orange', color:'black', border:'none', borderRadius:'5px', fontSize:'large',width:'10%', padding:'10px', display:'flex', justifyContent:'center'}} onClick={e => handleAddQuantity(e, product._id)}>+</button>
                                </div>
                            </div>

                            <div style={{alignSelf:'center', alignItems:'center'}}>
                                <center>
                                    <button onClick={ (e) => handleRemove(e, product)} style={{display:'flex',alignSelf:'center',justifyContent:'center', padding:'10px'}}>Remove from Cart</button>
                                </center>
                            </div>
                    </div> 

                    
                ) ) : <div></div> } 

                </div>
           
                { items.length > 0  ?  <div className='deliv'>
                            <h3>Total Price:</h3> <br />
                               <h1>{ total }</h1> 
                                <br />
                                <button onClick={ (e)=>{handleClick(e)}}><img src={require('../../images/shopping-cart.png') } style={{display:'flex',justifyContent:'center'}} alt="" /> Checkout <div id="spinner" style={{width:'0px',justifyContent:'center', marginLeft:'0px', visibility:'hidden'}}></div></button>
                </div> : <div></div> }
                
            </div>

            { items.length === 0  ? 
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