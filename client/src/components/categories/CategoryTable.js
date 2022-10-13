import { Store } from 'react-notifications-component';
import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react'

const CategoryTable = () => {


    const [categories, setCategory] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setPending] = useState(true);
    const [q, setQ] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(5);

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = categories.slice(indexOfFirstData, indexOfLastData);

    const pageNumbers = [];
    const totalData = categories.length;

    for(let i =1; i <= Math.ceil(totalData / dataPerPage);i++){
        pageNumbers.push(i);
    }

    function paginate(number){
        setCurrentPage(number);
    }

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(`${process.env.REACT_APP_API_URL}/categories`, {signal: abortCont.signal})
        .then( (res) =>{
            if(!res.ok){
                throw Error('Could Not fetch Data')
            }
            return res.json()
        })
        .then( (data) =>{
            setCategory(data)
            setPending(false)
            setError(null)
            
        })
        .catch((err) =>{
            if(err.name === 'AbortError'){
                console.log('Abort Error')
            }else{
                setError(err.message)
                setPending(false)
            }

        });
        return () => abortCont.abort();
    },[categories])
 

    function notify(title, message, type){
        Store.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
            duration: 1000,
            onScreen: true
            }
        }) 
    }

    const handleDelete = (id)=>{
        fetch(`${process.env.REACT_APP_API_URL}/del_categories/`+ id,{
            method: 'DELETE'
        })
        .then(()=>{
            notify("Deleted", "Category Deleted", "danger")
        })
    }

    

    return ( 
        <div className="list_categories">
        <br />
        
        

        <input style={{float:'right',border: '1px solid black', padding: '10px', marginRight:'5%'}} type="text" placeholder="Search...." onChange={ (e) => { setQ(e.target.value);  setDataPerPage(categories.length) } } />

        <br />
        <table id="customers">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Category</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>

            </thead>
            <tbody>
            {error && notify("Failed To fetch Data", "Server Error. Reload Page.","danger")}
            {isPending && <tr><td colspan={8} style={{textAlign:'center'}}>Loading...</td></tr>}
            { !isPending && (currentData === "" ) && <tr><td colspan={8} style={{textAlign:'center'}}>No data</td></tr>}
            { currentData.filter( categ =>{
                if(q === ''){
                    return categ;
                }else if(
                    categ._id.toLowerCase().includes(q.toLowerCase()) ||
                    categ.categ.toLowerCase().includes(q.toLowerCase())
                ){
                    return categ;
                }
            }).map( category =>(
                <tr key={category._id}>
                    <td>{category._id}</td>
                    <td>{category.categ}</td>
                    <td>
                        <Link to={ `/admin_dashboard/categories/${category._id}` }>
                            <img src={require('../../images/editing.png')} width='20px' alt="" />
                        </Link>
                    </td>
                    <td>
                        <button onClick={() => handleDelete(category._id)}><img src={require('../../images/delete.png')} width='20px' alt="" /></button>
                    </td>
                </tr>
            ))}

            </tbody>
        </table>
        
        <br />

        <div className='pageNumbers' style={{display:'flex', marginLeft: '5%',color:'darkblue'}}>
            <br />

            {
                pageNumbers.map( number =>(
                    <div style={{border: '1px solid gray', padding:'10px'}}>
                        <a href='#' onClick={()=>paginate(number)}>
                            {number}
                        </a>
                    </div>
                ))
            }
            <br />
        </div>
        <br />
    
        
        
    </div>
        
     );
}
 
export default CategoryTable;