import {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";


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

    return ( <div className="previewPage">
        { error && <div>Failed to fetch Data.. Try again</div>}
        { pending && <div>Loading ....</div> }
        {!pending && <div className="topPreview">
                <div className="slideshow">
                    <div className="topArea">
                        <div className="pics">

                            <Slider {...settings} style={{marginLeft:'6%', marginRight:'2%'}}>
                                <div>
                                    <img src={require(`../uploads/${product.preview1}`)} width='200px' height='200px' style={{objectFit:'scale-down'}} alt="" />
                                </div>
                                <div>
                                    <img src={require(`../uploads/${product.preview2}`)} width='200px' height='200px' style={{objectFit:'scale-down'}} alt="" />
                                </div>
                                <div>
                                    <img src={require(`../uploads/${product.preview3}`)} width='200px' height='200px' style={{objectFit:'scale-down'}} alt="" />
                                </div>
                                <div>
                                    <img src={require(`../uploads/${product.preview4}`)} width='200px' height='200px' style={{objectFit:'scale-down'}} alt="" />
                                </div>
                            </Slider>
                            <br />
                            <br />
                            <div className="moreImages">
                                <img src={require(`../uploads/${product.preview1}`)} width='50px' height='50px' style={{objectFit:'scale-down'}} alt="" />
                                <img src={require(`../uploads/${product.preview2}`)} width='50px' height='50px' style={{objectFit:'scale-down'}} alt="" />
                                <img src={require(`../uploads/${product.preview3}`)} width='50px' height='50px' style={{objectFit:'scale-down'}} alt="" />
                                <img src={require(`../uploads/${product.preview4}`)} width='50px' height='50px' style={{objectFit:'scale-down'}} alt="" />
                            </div>
                        </div>
                        <div className="topDetails">
                            <div className="prodHeading">{product.prodName}</div>
                            <div className="prodBody">
                                Category: {product.categ}
                                <br />
                                <br />
                                Share Product:
                                <br />
                                <br />
                            </div>
                            <div className="prodFooter">Ksh. {product.price}</div>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="delivery">
                    Delivery Details
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
        
    </div> );
}

export default Preview;
