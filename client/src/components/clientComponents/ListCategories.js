import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


const ListCategories = () => {

    const [categories, setCategories] = useState([]);
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(false);


    useEffect(()=>{
        const abortCont = new AbortController();

        fetch(`${process.env.REACT_APP_API_URL}/categories`,{signal: abortCont.signal})
        .then((response)=>{
            if(response.ok){
                return response.json();
            }else{
                throw Error('Could Not Fetch Data');
            }
        })
        .then((response)=>{
            setPending(false);
            setError(false);
            setCategories(response);
        })
        .catch(err=>{
            if(err.name === 'AbortError'){
                console.log('Abort Error')
            }else{
                setError(true)
                setPending(false)
            }
            setError(true);
            setPending(false);
        })

        return ()=> abortCont.abort();
    },[])



    return ( <div className='listCategories'>
            {
                error && <div style={{color:'red'}}>Could Not Fetch Data. Try Again</div>
            }
            {
                isPending && <div>Loading ...</div>
            }
            {
                !isPending && !error && categories.map(category =>(
                    <Link to={`/products/categories/${category.categ}`} key={category._id}>
                    <div className="categ" key={category._id}>
                       
                            {category.categ}
                       
                    </div>
                    </Link> 
                ))
            }
    </div> );
}
 
export default ListCategories;