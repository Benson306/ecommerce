import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from 'react-router-dom';

const ProductsByCategory = () => {

    const { id } = useParams();

    const [pending , setPending] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/products/similar/'+id, {signal: abortCont.signal})
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
    return ( <div className="moreCategoryProducts">
        <h2>Products In the {id} Category</h2>
        <br />
        <hr />
        {
            error &&  <div>Failed to Fetch Data</div>
        }
        {
            pending && < div>Loading ....</div>
        }
        <div class='morePd'>
        {
            !pending && !error && products.length === 0 ? <div>
                <br />
                No products In this Category

            </div> 
            :  products.map(product =>(
                
                <div className="product">
                    <Link key={product._id} to={`/preview/${product._id}`}>
                        <img src={`/uploads/${product.preview1}`} width='100%' height="75%" style={{objectFit:'scale-down'}} alt="" />
                        <br />
                        <div className="bottom" height="25%">
                            <div style={{paddingTop:'3px'}}>{product.prodName}</div>
                            <div style={{color:'#030c3b', paddingTop:'2px'}}>Ksh. {product.price}</div> 
                        </div>
                    </Link>
                
                </div>
            
            )) 
        }
        {
            
        }
        
        </div>
        <br />
    </div>);
}
 
export default ProductsByCategory;