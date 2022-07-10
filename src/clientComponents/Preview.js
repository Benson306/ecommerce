import {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

const Preview = () => {
    const { id } = useParams();

    const [product, setProduct] = useState([]);
    const [pending , setPending] = useState(true);
    const [error, setError] = useState('');

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/products/'+id, {signal: abortCont.signal})
        .then((res)=>{
            if(!res.ok){
                setPending(false);
            }else{
                return res.json();
            }
        })
        .then((res)=>{
            setProduct(res);
            setPending(false);
        })
        .catch((err)=>{
            setError(err.mesage);
            setPending(false);
        })

        return () => abortCont.Abort();

    },[])

    

    return ( <div className="previewPage">
        { pending && <div>Loading ....</div> }
        {!pending && <div className="topPreview">
                <div className="slideshow">
                    <div className="topArea">
                        <div className="pics">
                            <img src={require(`../uploads/${product.preview1}`)} width='200px' height='200px' style={{objectFit:'scale-down'}} alt="" />
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
                            <div className="prodBody">Category: {product.categ}</div>
                            <div className="prodFooter">Ksh. {product.price}</div>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="delivery">
                    Delivery Details
                </div>
        </div>}
        <div className="detailsPreview">
            More details
        </div>
        <div className='moreProducts'>
            More Products
        </div>
        
    </div> );
}

export default Preview;