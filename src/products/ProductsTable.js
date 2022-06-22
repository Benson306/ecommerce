import { Store } from 'react-notifications-component';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react'


const ProductsTable = () => {

    const [datas, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setPending] = useState(true);
    const [q, setQ] = useState("");

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch('/products', {signal: abortCont.signal})
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
        fetch('http://localhost:8001/del_products/'+ id,{
            method: 'DELETE'
        })
        .then(()=>{
            notify("Deleted", "Product Deleted", "danger")
        })
    }
    let no = 0;

        return ( 
            <div className='list_categories'>
                <br />
            <input style={{float:'right',border: '1px solid black', padding: '10px', marginRight:'5%'}} type="text" placeholder="Search...." onChange={ (e) => setQ(e.target.value)} />
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
                    { (datas == "" ) && <tr><td colspan={8} style={{textAlign:'center'}}>No data</td></tr>}
                    {   
                        datas.filter( val =>{
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
                                        <img src={require('../images/editing.png')} width='20px' alt="" />
                                    </Link>
                                </td>
                                    <td><button onClick={() => handleDelete(data._id)}><img src={require('../images/delete.png')} width='20px' alt="" /></button>
                                </td>
                            </tr>

                        ))
                    }

                </tbody>
            </table>
    </div> 
            // <table id="customers" >
            //     <thead>
            //         <tr>{data[0] && columns.map(heading => <th>{heading}</th> ) } <th>Edit</th><th>Delete</th> </tr>
            //         {/* <tr>
            //             <th>Id</th>
            //             <th>Category</th>
            //             <th>Edit</th>
            //             <th>Delete</th>
            //             <th></th>
            //         </tr> */}
            //     </thead>
            //     <tbody>
            //         { (data == '' ) && <tr><td colspan={5} style={{textAlign:'center'}}>No data</td></tr>}
            //         {
            //         data.map(row => <tr>
            //             {
            //                 columns.map(column => <td>{row[column]}</td>)
            //             }
                        
            //             <td><Link to={ `/admin_dashboard/edit_products/${row._id}` }>
            //                     <img src={require('../images/editing.png')} width='20px' alt="" />
            //                 </Link></td>
            //             <td><button onClick={() => handleDelete(row._id)}><img src={require('../images/delete.png')} width='20px' alt="" /></button></td>
            //         </tr>
            //         )}
            //     </tbody>
    
            // </table>
            
         );

}
 
export default ProductsTable;