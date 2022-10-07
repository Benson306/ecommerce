import { Store } from 'react-notifications-component';
import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react'

const UsersTable = () => {


    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setPending] = useState(true);
    const [q, setQ] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(5);

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = users.slice(indexOfFirstData, indexOfLastData);

    const pageNumbers = [];
    const totalData = users.length;

    for(let i =1; i <= Math.ceil(totalData / dataPerPage);i++){
        pageNumbers.push(i);
    }

    function paginate(number){
        setCurrentPage(number);
    }

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch('/admins', {signal: abortCont.signal})
        .then( (res) =>{
            if(!res.ok){
                throw Error('Could Not fetch Data')
            }
            return res.json()
        })
        .then( (data) =>{
            setUsers(data)
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
    },[users])
 

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
        fetch('/del_admin/'+ id,{
            method: 'DELETE'
        })
        .then(()=>{
            notify("Deleted", "Admin Deleted", "danger")
        })
    }

    

    return ( 
        <div className="list_categories">
        <br />
        
        

        <input style={{float:'right',border: '1px solid black', padding: '10px', marginRight:'5%'}} type="text" placeholder="Search...." onChange={ (e) => { setQ(e.target.value);  setDataPerPage(users.length) } } />

        <br />
        <table id="customers">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>

            </thead>
            <tbody>
            {error && notify("Failed To fetch Data", "Server Error. Reload Page.","danger")}
            {isPending && <tr><td colspan={8} style={{textAlign:'center'}}>Loading...</td></tr>}
            { !isPending && (currentData === "" ) && <tr><td colspan={8} style={{textAlign:'center'}}>No data</td></tr>}
            { currentData.filter( user =>{
                if(q === ''){
                    return user;
                }else if(
                    user.email.toLowerCase().includes(q.toLowerCase()) ||
                    user.email.toLowerCase().includes(q.toLowerCase())
                ){
                    return user;
                }
            }).map( user =>(
                <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>{user.password.length > 0 ? <div>{"*".repeat(user.password.length)}</div> : <div></div>}</td>
                    <td>
                        <Link to={ `/admin_dashboard/users/${user._id}` }>
                            <img src={require('../../images/editing.png')} width='20px' alt="" />
                        </Link>
                    </td>
                    <td>
                        <button onClick={() => handleDelete(user._id)}><img src={require('../../images/delete.png')} width='20px' alt="" /></button>
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
 
export default UsersTable;