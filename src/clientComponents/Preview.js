import {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

const Preview = () => {
    const { id } = useParams();

    const [product, setProduct] = useState([]);
    const [pending , setPending] = useState(true);
    const [error, setError] = useState(' ');

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

        return () => abortCont.abort();

    },[])

    

    return ( <div className="previewPage">
        <div className="topPreview">
            <div className="slideshow">
                
            </div>
            <div className="delivery">
                Delivery Details
            </div>
        </div>
        <div className="detailsPreview">
            More details
        </div>
        <div className='moreProducts'>
            More Products
        </div>
    </div> );
}

export default Preview;