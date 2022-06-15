
const CategoryTable = ({ data }) => {

    // console.log(data[0].categ)

    const columns = data[0] && Object.keys(data[0])

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
                data.map(row => <tr>
                    {
                        columns.slice(0).reverse().map(column => <td>{row[column]}</td>)
                    }
                    <td><img src={require('./images/editing.png')} width='20px' alt="" /></td>
                    <td><img src={require('./images/delete.png')} width='20px' alt="" /></td>
                </tr>
                )}
            </tbody>

        </table>
        
     );
}
 
export default CategoryTable;