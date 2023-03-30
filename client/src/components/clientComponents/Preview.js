import {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Store } from 'react-notifications-component';


import { Link } from 'react-router-dom';
import useCart from '../../context/CartContext';


const Preview = () => {
    const { id } = useParams();

    const [product, setProduct] = useState([]);
    const [pending , setPending] = useState(true);
    const [error, setError] = useState(false);
    const [loading , setLoading ] = useState(false);


    useEffect(()=>{
        const abortCont = new AbortController();

        fetch(`${process.env.REACT_APP_API_URL}/products/`+id, {signal: abortCont.signal})
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


    const { addToCart } = useCart();

    const handleAddToCart = (product) =>{

        addToCart(product);

        notify("Success","Product Has Been Added To Cart","success");

    }


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
                                <li className="slide"><img src={`${process.env.REACT_APP_API_URL}/images/${product.preview1}`} width="100%" height="100%" style={{objectFit:'scale-down'}} alt="" /></li>
                                <li className="slide"><img src={`${process.env.REACT_APP_API_URL}/images/${product.preview2}`} width="100%" height="100%" style={{objectFit:'scale-down'}} alt="" /></li>
                                <li className="slide"><img src={`${process.env.REACT_APP_API_URL}/images/${product.preview3}`} width="100%" height="100%" style={{objectFit:'scale-down'}} alt="" /></li>
                                <li className="slide"><img src={`${process.env.REACT_APP_API_URL}/images/${product.preview4}`} width="100%" height="100%" style={{objectFit:'scale-down'}} alt="" /></li>
                            </ul>
                        </section>
                            <div className="moreImages">
                                <img src={`${process.env.REACT_APP_API_URL}/images/${product.preview1}`} width='50px' height='50px' alt="" />
                                <img src={`${process.env.REACT_APP_API_URL}/images/${product.preview2}`} width='50px' height='50px' alt="" />
                                <img src={`${process.env.REACT_APP_API_URL}/images/${product.preview3}`} width='50px' height='50px' alt="" />
                                <img src={`${process.env.REACT_APP_API_URL}/images/${product.preview4}`} width='50px' height='50px' alt="" />
                            </div>
                        </div>
                        <div className="topDetails">
                            <div className="prodHeading">{product.prodName}</div>
                            <div className="prodBody">
                                Category: <Link to={`/products/categories/${product.categ}`}>{product.categ}</Link> 
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
                                <Link><img src={require("../../images/facebook.png")} width="30px" style={{objectFit:'scale-down', marginRight:'5px'}} alt="" /></Link>
                                <Link><img src={require("../../images/twitter.png")} width="30px" style={{objectFit:'scale-down'}} alt="" /></Link>
                                
                            </div>
                            <button onClick={() => handleAddToCart(product)} style={{display:'flex',justifyContent:'center'}}>Add to Cart</button>
                            <br />

                        </div>
                    </div>
                </div>
                <br />
            
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
        {/* {!pending && <MoreProducts props={product.categ}/> } */}
        <br /><br />
        
    </div> );
}

export default Preview;
