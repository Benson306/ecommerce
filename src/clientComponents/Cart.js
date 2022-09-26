import {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


import { Link } from 'react-router-dom';


const Cart = () => {

    const { id } = useParams();

    const [products, setProducts] = useState([]);
    const [pending , setPending] = useState(true);
    const [error, setError] = useState(false);

    const [price, setPrice] = useState(0);
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
            // setPrice(res.price);
            // setNewPrice(res.price)
            setPending(false);
        })
        .catch((err)=>{
            setError(true);
            setPending(false);
        })

        return () => abortCont.abort();

    },[])



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



    return ( 
        <div className="cart">
            { error && <div><br /><br />Failed to fetch Data.. Try again</div>}
            { pending && <div><br /><br />Loading ....</div> }
            
            {   !pending && !error &&  products.map( product => (<div className="cartProduct">
            
            
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
                    <button>Remove from Cart</button>
                    <br />
                </div>
                

            </div>
            ) ) }
            <br />
        </div>
        );
}
 
export default Cart;