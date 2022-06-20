import { Store } from 'react-notifications-component';
import { Link } from 'react-router-dom';


const ProductsTable = ({data}) => {
    const columns = data[0] && Object.keys(data[0])

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
            notify("Deleted", "Category Deleted", "danger")
        })
    }

        return ( 
            <table id="customers" >
                <thead>
                    <tr>{data[0] && columns.map(heading => <th>{heading}</th> ) } <th>Edit</th><th>Delete</th> </tr>
                    {/* <tr>
                        <th>Id</th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th></th>
                    </tr> */}
                </thead>
                <tbody>
                    { (data == '' ) && <tr><td colspan={5} style={{textAlign:'center'}}>No data</td></tr>}
                    {
                    data.map(row => <tr>
                        {
                            columns.map(column => <td>{row[column]}</td>)
                        }
                        
                        <td><Link to={ `/admin_dashboard/edit_products/${row._id}` }>
                                <img src={require('../images/editing.png')} width='20px' alt="" />
                            </Link></td>
                        {/* <td><a href={'/admin_dashboard/categories/'+row.id}><img src={require('./images/editing.png')} width='20px' alt="" /></a></td> */}
                        <td><button onClick={() => handleDelete(row._id)}><img src={require('../images/delete.png')} width='20px' alt="" /></button></td>
                    </tr>
                    )}
                </tbody>
    
            </table>
            
         );

}
 
export default ProductsTable;