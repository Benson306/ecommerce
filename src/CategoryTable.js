import { Store } from 'react-notifications-component';

const CategoryTable = ({ data }) => {

    // console.log(data[0].categ)

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
        fetch('http://localhost:8000/categories/'+ id,{
            method: 'DELETE'
        })
        .then(()=>{
            notify("Deleted", "Category Deleted", "info")
        })
    }

    return ( 
        <table id="customers" >
            <thead>
                {/* <tr>{data[0] && columns.map(heading => <th>{heading}</th> ) } <th>Edit</th><th>Delete</th> </tr> */}
                <tr>
                    <th>Id</th>
                    <th>Category</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                data.slice(0).reverse().map(row => <tr>
                    {
                        columns.slice(0).reverse().map(column => <td>{row[column]}</td>)
                    }
                    <td><a href={'/admin_dashboard/categories/'+row.id}><img src={require('./images/editing.png')} width='20px' alt="" /></a></td>
                    <td><button onClick={() => handleDelete(row.id)}><img src={require('./images/delete.png')} width='20px' alt="" /></button></td>
                </tr>
                )}
            </tbody>

        </table>
        
     );
}
 
export default CategoryTable;