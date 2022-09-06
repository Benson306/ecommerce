import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../index.css';
const TopProducts = () => {

    const [products, setProducts] = useState([]);
    const [isPending, setPending] = useState(true);
    const [isError, setError] = useState(false);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/products',{signal: abortCont.signal})
        .then(res=>{
            if(!res.ok){
                setPending(false);
                setError(true);
            }else{
                return res.json();
            }
        })
        .then(res=>{
            setProducts(res);
            setPending(false);
            setError(false);
        })
        .catch(err =>{
            setPending(false);
            setError(true);
        })

        return () => abortCont.abort();
    },[products]);


    return ( 
        <div className="prd">
            <div className="topTitile">Top Products:</div>
            <div class='productList'>
            {
                isPending && <div>Loading...</div>
            }
            {
                isError && <div>Failed to Fetch Products</div>
            }
            { !isPending && !isError && products.map(product =>(
                
                <div className="product">
                    <Link to={`/preview/${product._id}`}>
                        <img src={require(`../uploads/${product.preview1}`)} width='100%' height="75%" style={{objectFit:'scale-down'}} alt="" />
                        <br />
                        <div className="bottom">
                            <div style={{paddingTop:'2px'}}>{product.prodName}</div>
                            <div style={{color:'#030c3b', paddingTop:'2px'}}>Ksh. {product.price}</div> 
                        </div>
                   </Link>
                   
                </div>
                
                
            ))
            }
        
        </div> 

        </div>
        
    );
}
 
export default TopProducts;