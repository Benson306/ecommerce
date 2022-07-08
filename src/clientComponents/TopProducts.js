import { useState, useEffect } from "react";
import '../index.css';
const TopProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/products',{signal: abortCont.signal})
        .then(res=>{
            if(!res.ok){

            }else{
                return res.json();
            }
        })
        .then(res=>{
            setProducts(res);
        })

        return () => abortCont.abort();
    },[]);


    return ( 
        <div class='productList'>
            { products.map(product =>(
                <div className="product">
                    {product._id}
                </div>
            ))
            }

        </div> 
    );
}
 
export default TopProducts;