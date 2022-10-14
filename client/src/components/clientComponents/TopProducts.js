import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../index.css';
const TopProducts = () => {

    const [products, setProducts] = useState([]);
    const [isPending, setPending] = useState(true);
    const [isError, setError] = useState(false);

    useEffect(()=>{
        const abortCont = new AbortController();
        

        fetch(`${process.env.REACT_APP_API_URL}/products`,{signal: abortCont.signal})
        .then(res=>{
            if(res.ok){
                return res.json();
            }else{
                throw Error('Could Not Fetch Data');
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
    },[]);


    return ( 
        <div className="prd">
            <div className="topTitile">Top Products:</div>
            <div class='productList'>
            {
                isPending && <div>Loading...</div>
            }
            {
                isError && <div>Failed to Fetch Products. Check your Connection.</div>
            }
            { !isPending && !isError && products.map(product =>(
                
                <div className="product">
                    <Link to={`/preview/${product._id}`}>
                        <img src={`${process.env.REACT_APP_API_URL}/images/${product.preview1}`} width='100%' height="75%" style={{objectFit:'scale-down'}} alt="" />
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