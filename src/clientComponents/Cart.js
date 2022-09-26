import {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


import { Link } from 'react-router-dom';


const Cart = () => {

    const { id } = useParams();

    const [product, setProduct] = useState();
    const [pending , setPending] = useState(true);
    const [error, setError] = useState(false);

    const [price, setPrice] = useState(0);
    const [newPrice, setNewPrice] = useState(0);
    const [quantity, setQuantity ] = useState(1);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/products/'+id, {signal: abortCont.signal})
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
            setProduct(res);
            setPrice(res.price);
            setNewPrice(res.price)
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
            
            {   !pending && !error && <div className="cartProduct">
            
                <div className="cartPreview">
                    <section className="slider-wrapper">
                        <button className="slide-arrow" onClick={back} id="slide-arrow-prev">
                        &#8249;
                        </button>
                        <button className="slide-arrow" onClick={next} id="slide-arrow-next">
                        &#8250;
                        </button>
                        <ul className="slides-container" id="slides-container">
                            <li className="slide"><img src={require(`../uploads/${product.preview1}`)} width="100%" height="100%" style={{objectFit:'scale-down'}} alt="" /></li>
                            <li className="slide"><img src={require(`../uploads/${product.preview2}`)} width="100%" height="100%" style={{objectFit:'scale-down'}} alt="" /></li>
                            <li className="slide"><img src={require(`../uploads/${product.preview3}`)} width="100%" height="100%" style={{objectFit:'scale-down'}} alt="" /></li>
                            <li className="slide"><img src={require(`../uploads/${product.preview4}`)} width="100%" height="100%" style={{objectFit:'scale-down'}} alt="" /></li>
                        </ul>
                    </section>

                </div> 
            
                <div className="cartDetails">
                        <div className="topCartDetails">
                            <div className="prodHeading">{product.prodName}</div>
                            <div className="prodBody">
                                Category: <Link to="">{product.categ}</Link> 
                                <br />
                                <br />
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>
                                 <span class="fa fa-star"></span>
                                <br />
                                <div className="prodFooter">Ksh {product.price}</div>
                                <br />
                            </div>
                       </div>
                </div>
                <div className="cartButton">
                    <form action="">
                        <label style={{fontWeight:'bolder', padding:'10px'}}>Quantity:</label>
                        <input defaultValue={1} onChange={e => { setQuantity(e.target.value); setNewPrice(price*e.target.value); }} type="number" min={1} name="" id="" />
                    </form>
                    <br /><br /><br />
                    <div style={{marginLeft:'7%', fontWeight:'bolder'}}>Total Price:</div>
                    <div style={{marginLeft:'18%', color:'#030c3b'}}><h2>KES. { newPrice}</h2></div> 
                    <button>Remove from Cart</button>
                    <br />
                </div>
                

            </div>
            }
        </div>
        );
}
 
export default Cart;