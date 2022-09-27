import {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Store } from 'react-notifications-component';

import { Link } from 'react-router-dom';


const Cart = () => {

    const { id } = useParams();

    const [products, setProducts] = useState([]);
    const [pending , setPending] = useState(true);
    const [error, setError] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);
    const [newPrice, setNewPrice] = useState(0);
    const [quantity, setQuantity ] = useState(1);

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
            let prc = 0;
            res.map(r =>{
                prc += Number(r.price);
            })

            setTotalPrice(prc);
            setNewPrice();
            setPending(false);
        })
        .catch((err)=>{
            setError(true);
            setPending(false);
        })

        return () => abortCont.abort();

    },[products])



      function next(){
        const slidesContainer = document.querySelector("#slides-container");
        const slide = document.querySelector(".slide");

          const slideWidth = slide.clientWidth;
          slidesContainer.scrollLeft += slideWidth;

          console.log(slideWidth)
      };
      
      function back(){
        const slidesContainer = document.querySelector("#slides-container");
        const slide = document.querySelector(".slide");

          const slideWidth = slide.clientWidth;
          slidesContainer.scrollLeft -= slideWidth;
      };

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

      const handleRemove = (id) =>{

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
                }
            })
      }


    return ( 
        <div className="cart">
            { error && <div><br /><br />Failed to fetch Data.. Try again</div>}
            { pending && <div><br /><br />Loading ....</div> }
            <div className='cartLayout'>
                <div className="crt">
                            {   !pending && !error &&  products.map( product => (
                        
                        
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
                                    <input defaultValue={1} onChange={e => { setQuantity(e.target.value); {/*setNewPrice(price*e.target.value); */} }} type="number" min={1} name="" id="" />
                                </form>
                                <br />
                                {/* <div style={{marginLeft:'7%', fontWeight:'bolder'}}>Total Price:</div>
                                <div style={{marginLeft:'18%', color:'#030c3b'}}><h2>KES. { newPrice}</h2></div>  */}
                                <button onClick={ () => { handleRemove(product._id) }}>Remove from Cart</button>
                                <br />
                            </div>
                    </div>

                    
                ) ) }

                </div>
            
                <div className='deliv'>
                            <h3>Total Price:</h3> <br />
                               <h1>{ totalPrice }</h1> 
                                <br /><br />
                                <button><img src={require('../images/shopping-cart.png') } alt="" /> Checkout </button>
                </div>
            </div>
            { !pending && !error && products.length === 0 ? 
            <div style={{width:'50%', margin: '0 auto', backgroundColor: '#ddd', padding: '20px', textAlign:'center'}}>
                <h3>You have no items in Cart</h3><br /><br />
                <img src={require('../images/empty-cart.png')} alt="" />
                <br /><br />
                <Link style={{textDecoration: 'none', color:'black'}} to={'/'}><button style={{padding:'15px', borderRadius: '5px', backgroundColor:'orange', border:'none'}}>Go Back</button></Link>
            </div> : <div></div> }

            <br />
        </div>
        );
}
 
export default Cart;