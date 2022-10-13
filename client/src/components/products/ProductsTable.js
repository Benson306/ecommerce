import { Store } from 'react-notifications-component';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react'


const ProductsTable = () => {

    const [datas, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setPending] = useState(true);
    const [q, setQ] = useState("");


    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(5);

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = datas.slice(indexOfFirstData, indexOfLastData);

    const pageNumbers = [];
    const totalData = datas.length;

    for(let i =1; i <= Math.ceil(totalData / dataPerPage);i++){
        pageNumbers.push(i);
    }
    
    function paginate(number){
        setCurrentPage(number);
    }

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(`${process.env.REACT_APP_API_URL}/products`, {signal: abortCont.signal})
        .then( (res) =>{
            if(!res.ok){
                throw Error('Could Not fetch Data')
            }
            return res.json()
        })
        .then( (data) =>{
            if(data){
                setData(data)
            }
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
    },[datas])



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
        fetch(`${process.env.REACT_APP_API_URL}/del_products/`+ id,{
            method: 'DELETE'
        })
        .then(()=>{
            notify("Deleted", "Product Deleted", "danger")
        })
    }

    


        return ( 
            <div className='list_categories'>
                <br />
            <input style={{float:'right',border: '1px solid black', padding: '10px', marginRight:'5%'}} type="text" placeholder="Search...." onChange={ (e) =>{setQ(e.target.value); setDataPerPage(datas.length) } } />
            <table id="customers">
                <thead>
                        <tr>
                            <th>Category</th>
                            <th>Product Name</th>
                            <th>Product Details</th>
                            <th>Features</th>
                            <th>Price</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                </thead>
                <tbody>
                    { (error !== null ) && <tr><td colspan={8} style={{textAlign:'center'}}>Failed to fetch data</td></tr>}
                    { isPending &&  <tr><td colspan={8} style={{textAlign:'center'}}>Loading...</td></tr> }
                    { !isPending && (currentData === "" ) && <tr><td colspan={8} style={{textAlign:'center'}}>No data</td></tr>}
                    {   
                        currentData.filter( val =>{
                            if(q === ''){
                                return val;
                            }else if(
                                val.categ.toLowerCase().includes(q.toLowerCase()) ||
                                val.prodName.toLowerCase().includes(q.toLowerCase()) ||
                                val.prodDetails.toLowerCase().includes(q.toLowerCase()) ||
                                val.features.toLowerCase().includes(q.toLowerCase())
                            ){
                                
                                        return val;
                                
                            }
                        }).map( data => (
                            <tr key={data._id}>
                                <td>{data.categ}</td>
                                <td>{data.prodName}</td>
                                <td>{data.prodDetails}</td>
                                <td>{data.features}</td>
                                <td>{data.price}</td>
                                <td>
                                    <Link to={  `/admin_dashboard/more/${data._id}` }>
                                        view
                                    </Link>
                                </td>
                                <td>
                                    <Link to={ `/admin_dashboard/edit_products/${data._id}` }>
                                        <img src={require('../../images/editing.png')} width='20px' alt="" />
                                    </Link>
                                </td>
                                    <td><button onClick={() => handleDelete(data._id)}><img src={require('../../images/delete.png')} width='20px' alt="" /></button>
                                </td>
                            </tr>

                        ))
                    }

                </tbody>
            </table>
            <br />
            <div className='pageNumbers' style={{display:'flex', marginLeft:'5%', color:'darkblue'}}>

            {
                pageNumbers.map( number =>(
                    <div style={{border: '1px solid gray', padding:'10px'}}>
                        <a href='#' onClick={()=>paginate(number)}>
                            {number}
                        </a>
                    </div>
                ))
            }

        </div>
        <br />
    </div> 
            
         );

}
 
export default ProductsTable;