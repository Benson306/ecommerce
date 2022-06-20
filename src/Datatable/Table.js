
const Table = ({ data }) => {

    console.log(data)

    const columns = data[0] && Object.keys(data[0])

    return ( 
        <table id="customers" >
            <thead>
                <tr>{data[0] && columns.map(heading => <th>{heading}</th> ) } <th>Edit</th><th>Delete</th> </tr>
            </thead>
            <tbody>
                {
                data.map(row => <tr>
                    {
                        columns.map(column => <td>{row[column]}</td>)
                    }
                    <td><img src={require('../images/editing.png')} width='20px' alt="" /></td>
                    <td><img src={require('../images/delete.png')} width='20px' alt="" /></td>
                </tr>
                )}
            </tbody>

        </table>
        
     );
}
 
export default Table;