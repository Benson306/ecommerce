import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


const ListCategories = () => {

    const [categories, setCategories] = useState([]);
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(false);


    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/categories',{signal: abortCont.signal})
        .then((response)=>{
            if(response.ok){
                return response.json();
            }else{
                throw Error('Could Not Fetch Data');
            }
        })
        .then((response)=>{
            setPending(false);
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

        return ()=> abortCont.Abort();
    },[])

    console.log(categories);


    return ( <div className='listCategories'>
            {
                error && <div>Could Not Fetch Data</div>
            }
            {
                isPending && <div>Loading ...</div>
            }
            {
                !isPending && categories.map(category =>(
                    <div className="categ" key={category._id}>
                       <Link to={`/products/categories/${category._id}`}>
                            {category.categ}
                       </Link> 
                    </div>
                ))
            }
    </div> );
}
 
export default ListCategories;