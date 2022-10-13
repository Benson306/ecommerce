import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {

    const [query, setQuery] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading ,setLoading] = useState(true);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch(`${process.env.REACT_APP_API_URL}/products`,{signal: abortCont.signal})
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setProducts(res);
            setLoading(false);
        })
        .catch((err)=>{

        })
    },[] )

    const handleSearch = (e) =>{
        e.preventDefault();

    }

    const filteredData = products.filter((product)=>{
                    
        if(query === '' || query === null){
            return product;
        }else if(
            product.prodName.toLowerCase().includes(query.toLowerCase()) ||
            product.categ.toLowerCase().includes(query.toLowerCase())
        ){
            return product;
        }
    })



    return ( <div className="search">
        <form onSubmit={handleSearch}>
                        <input 
                        type="text" 
                        placeholder="Search products, brands and categories" 
                        required 
                        onChange={(e)=> e.target.value === "" ? setQuery(null) : setQuery(e.target.value)}
                        />
                        <div class='searchIcon'>
                           <SearchIcon onClick={handleSearch}/> 
                        </div>
        </form>
        { query !== null ? <div className="searchResult">
            {
                !loading && filteredData.length > 0 ? filteredData.slice(0,7).map( product =>
                            (
                                <Link to={ `/preview/${product._id}`}><div className="links">{product.prodName} <b> in </b> {product.categ}</div></Link>
                            )
                              
                ) : !loading && filteredData.length == 0 ? <div style={{color:'#030c3b'}}>No Products Matching Your Criteria</div> : <div>Loading ....</div>
            }
        </div> : <div></div>}

    </div> );
}
 
export default Search;