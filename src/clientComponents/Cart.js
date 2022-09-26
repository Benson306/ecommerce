import {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


import { Link } from 'react-router-dom';


const Cart = () => {

    const { id } = useParams();

    const [product, setProduct] = useState([]);
    const [pending , setPending] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/products/'+id, {signal: abortCont.signal})
        .then((res)=>{
            console.log(res)
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


    return ( <div className="slideshow">
        <div className="topPreview">
                <div className="slideshow">
                    <div className="topArea">
                        <div className="pics">

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
                            <div className="moreImages">
                                <img src={require(`../uploads/${product.preview1}`)} width='50px' height='50px' alt="" />
                                <img src={require(`../uploads/${product.preview2}`)} width='50px' height='50px' alt="" />
                                <img src={require(`../uploads/${product.preview3}`)} width='50px' height='50px' alt="" />
                                <img src={require(`../uploads/${product.preview4}`)} width='50px' height='50px' alt="" />
                            </div>
                        </div>
                        <div className="topDetails">
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
                                SHARE THIS PRODUCT:
                                <br />
                            </div>
                            </div>
                       </div>
                    </div>
                </div>
        </div> );
}
 
export default Cart;