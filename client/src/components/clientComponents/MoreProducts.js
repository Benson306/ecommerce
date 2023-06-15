import { useEffect, useState } from "react";
import { Link, BrowserRouter as  Router, Route, Switch } from "react-router-dom";


const MoreProducts = ({props}) => {


    const [pending , setPending] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch(`${process.env.REACT_APP_API_URL}/products/similar/`+props, {signal: abortCont.signal})
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
            setProducts(res);
            setPending(false);
        })
        .catch((err)=>{
            setError(true);
            setPending(false);
        })

        return () => abortCont.abort();

    },[])
    
    console.log(products);

    return ( <div className="moreProducts">
        <h3>Similar Products</h3>
        <hr />
        {
            error &&  <div>Failed to Fetch Data</div>
        }
        {
            pending && < div>Loading ....</div>
        }
        <div class='morePd'>
        {
            !pending && !error && products.slice(0,4).reverse().map(product =>(
                
                <div className="product">
                    <Link key={product._id} to={`/preview/${product._id}`}>
                        <img src={require(`../../ProductImages/${product.preview1}`)} width='100%' height="75%" style={{objectFit:'scale-down'}} alt="" />
                        <br />
                        <div className="bottom">
                            <div style={{paddingTop:'3px'}}>{product.prodName}</div>
                            <div style={{color:'#030c3b', paddingTop:'2px'}}>Ksh. {product.price}</div> 
                        </div>
                    </Link>
                
                </div>
            
            )) 
        }
        
        </div>
        <br />
    </div>);
}
 
export default MoreProducts;