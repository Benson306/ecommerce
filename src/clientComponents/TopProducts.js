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
        <div className="prd">
            <div className="topTitile">Top Products:</div>
            <div class='productList'>
            
            { products.map(product =>(
                <div className="product">
                    <img src={require(`../uploads/${product.preview1}`)} width='220px' height='150px' alt="" />
                    <br />
                    <div style={{paddingTop:'2px'}}>{product.prodName}</div>
                   <div style={{color:'#030c3b', paddingTop:'2px'}}>Ksh. {product.price}</div> 
                </div>
            ))
            }
        
        </div> 

        </div>
        
    );
}
 
export default TopProducts;