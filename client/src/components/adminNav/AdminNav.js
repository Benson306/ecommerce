import { Link, useHistory } from 'react-router-dom';
import { Store } from 'react-notifications-component';

const AdminNav = () => {

    const history = useHistory();

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
    };

    const logout = () =>{
        fetch(`${process.env.REACT_APP_API_URL}/admin_logout`,{
            credentials:'include',
            proxy: true,
            withCredentials: true
        })
        .then((res)=>{
            if(res.ok){
                history.push('/admin');
               // window.location.reload();
                notify("Success","Logged Out","success");
            }else{
                notify("Failed","Failed to Log Out","danger");
            }
        })
    }


    return ( 
        <div className="adminNav">
            <nav>
                <ul>
                    <div className="navRight">
                        <li><Link onClick={e => {logout(e)} }>Sign Out</Link></li>
                    </div>
                    
                </ul>
            </nav>
            <br />
        </div>
     );
}
 
export default AdminNav;