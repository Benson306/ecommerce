import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductDetails from "../products/ProductDetails";
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {

    const [query, setQuery] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/products',{signal: abortCont.signal})
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setProducts(res);
            setLoading(false);
        })
        .catch((err)=>{
            setLoading(false);
            setError(true);
        })
    },[] )

    return ( <div className="search">
        <form action="" style={{display:'flex'}}>
                        <input 
                        type="text" 
                        placeholder="Search products, brands and categories" 
                        required 
                        style={{width:'80%',padding:'10px'}} 
                        onChange={(e)=> e.target.value === "" ? setQuery(null) : setQuery(e.target.value)}
                        />
                        <div class='searchIcon'>
                            <SearchIcon />
                        </div>
                        

        </form>
        { query !== null ? <div className="searchResult">
            {
                products.filter((product)=>{
                    if(query === '' || query === null){
                        return product;
                    }else if(
                        product.prodName.toLowerCase().includes(query.toLowerCase()) ||
                        product.categ.toLowerCase().includes(query.toLowerCase())
                    ){
                        if(product.length === 0){
                            setQuery(null);
                        }else{
                            return product;
                        }
                    }
                }).slice(0,7).map( product =>
                            (
                            <div className="links"><Link to={ `/preview/${product._id}`}>{product.prodName} <b> in </b> {product.categ}</Link></div>
                            )
                              
                )
            }
        </div> : <div></div>}

    </div> );
}
 
export default Search;