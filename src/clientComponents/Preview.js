import {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { Link } from 'react-router-dom';


const Preview = () => {
    const { id } = useParams();

    const [product, setProduct] = useState([]);
    const [pending , setPending] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/products/'+id, {signal: abortCont.signal})
        .then((res)=>{
            if(!res.ok){
                setPending(false);
                setError(true)
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

        

        return () => abortCont.Abort();

    },[])

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };


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

        

    return ( <div className="previewPage">
        { error && <div>Failed to fetch Data.. Try again</div>}
        { pending && <div>Loading ....</div> }
        {!pending && <div className="topPreview">
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
                                <Link><img src={require("../images/facebook.png")} width="30px" style={{objectFit:'scale-down', marginRight:'5px'}} alt="" /></Link>
                                <Link><img src={require("../images/twitter.png")} width="30px" style={{objectFit:'scale-down'}} alt="" /></Link>
                                
                            </div>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="delivery">
                    <div className="deliveryHeader">
                        <img src={require("../images/fast-delivery.png")} alt="" /> Delivery Details
                    </div>
                    <div className="deliveryBody">
                        <form action="">
                        Delivery Type:
                            <br />
                            <select name="" id="" required>
                                <option value=""></option>
                                <option value="">Door Delivery</option>
                                <option value="">PickUp Point</option>
                            </select>
                            <br />
                        Choose County:
                        <br />
                            <select name="" id="" required>
                                <option value=""></option>
                                <option value="Nairobi">Nairobi</option>
                                <option value="Trans Nzoia">Trans Nzoia</option>
                            </select>
                        Select Pickup Location:
                        <br />
                            <select name="" id="" required>
                                <option value=""></option>
                                <option value="Nairobi">Nairobi</option>
                                <option value="Trans Nzoia">Trans Nzoia</option>
                            </select>
                        <br />
                        <button type='submit'>Set Pickup Location</button>
                        </form>
                    </div>
                    
                </div>
        </div>}

        {!pending && <div className="detailsPreview">
            <div className="specHeading">SPECIFICATIONS</div>
            <hr />
            <br />
            <div className="upper">
                <div className="features">
                    <div className="extraHeading">
                        Key Features:
                    </div>
                    <div className="extrabody">
                        {product.prodDetails}
                    </div>
                </div>
                <div className="features">
                    <div className="extraHeading">
                        Specifications:
                    </div>
                    <div className="extrabody">
                        <b>Weight:</b> {product.weight}
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="extraHeading">
                    Whats in the Box:
                </div>
                <div className="extrabody">
                    {product.inBox}
                </div>
            </div>
        </div>
        }
        
        <div className='moreProducts'>
            More Products
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        
    </div> );
}

export default Preview;
