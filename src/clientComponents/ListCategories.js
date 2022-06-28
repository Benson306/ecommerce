import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


const ListCategories = () => {

    const [categories, setCategories] = useState([]);
    const [isPending, setPending] = useState(true);


    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/categories',{signal: abortCont.signal})
        .then((response)=>{
            return response.json();
        })
        .then((response)=>{
            setPending(false);
            setCategories(response);
        })

        return ()=> abortCont.Abort();
    },[])

    console.log(categories);


    return ( <div className='listCategories'>
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