import {useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Store } from 'react-notifications-component';

import { Link } from 'react-router-dom';
import Delivery from './Delivery'
import MoreProducts from './MoreProducts';


const Preview = () => {
    const { id } = useParams();
    const history = useHistory();

    const [product, setProduct] = useState([]);
    const [pending , setPending] = useState(true);
    const [error, setError] = useState(false);

    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/auth', {signal: abortCont.signal})
        .then((res)=>{
            if(res.ok){
                setLoggedIn(true);
                setLoading(false);
            }else{
                setLoggedIn(false);
                setLoading(false);
            }
        })

        return () => abortCont.abort();
    },[])

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

        

        return () => abortCont.abort();

    },[product])



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

      const handleAddToCart = () =>{
          if(loggedIn === true){
            fetch('/add_cart',{
                method:'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ item_id: id })
            })
            .then((res)=>{
                return res.json();
            })
            .then((res)=>{
              if(res === 'sent'){
                  notify("Success","Added To Cart","success");
              }else{
                  notify("Failed","Item already exists in your cart","danger");
              }
            })
            .catch((err)=>{
                  console.log('error');
            })
          }else{
            notify("Login","Login to Continue","info");
            history.push('/login')
          }
          
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
                                <li className="slide"><img src={`/uploads/${product.preview1}`} width="100%" height="100%" style={{objectFit:'scale-down'}} alt="" /></li>
                                <li className="slide"><img src={`/uploads/${product.preview2}`} width="100%" height="100%" style={{objectFit:'scale-down'}} alt="" /></li>
                                <li className="slide"><img src={`/uploads/${product.preview3}`} width="100%" height="100%" style={{objectFit:'scale-down'}} alt="" /></li>
                                <li className="slide"><img src={`/uploads/${product.preview4}`} width="100%" height="100%" style={{objectFit:'scale-down'}} alt="" /></li>
                            </ul>
                        </section>
                            <div className="moreImages">
                                <img src={`/uploads/${product.preview1}`} width='50px' height='50px' alt="" />
                                <img src={`/uploads/${product.preview2}`} width='50px' height='50px' alt="" />
                                <img src={`/uploads/${product.preview3}`} width='50px' height='50px' alt="" />
                                <img src={`/uploads/${product.preview4}`} width='50px' height='50px' alt="" />
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
                            <button onClick={handleAddToCart}>Add to Cart</button>

                        </div>
                    </div>
                </div>
                <div className="delivery">
                { loggedIn && <Delivery /> }
                {!loggedIn && <div style={{width:'50%', margin: '0 auto', textAlign:'center'}}>
                    Login In to Set Delivery Address <br /> <br />
                    <img src={require('../images/padlock.png')} alt="" />
                    <br />
                    <br />
                    <Link to="/login"><button style={{padding:'10px', backgroundColor:'orange', border:'none'}}>Login to Continue</button></Link>

                    </div>}
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
        {/* {!pending && <MoreProducts props={product.categ}/> } */}
        <br /><br />
        
    </div> );
}

export default Preview;
