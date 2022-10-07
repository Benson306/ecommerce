import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Store } from 'react-notifications-component';

const Nav = () => {
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

    const history = useHistory();

    const logout = () =>{
        fetch('/logout')
        .then((res)=>{
            if(res.ok){
                history.push('/');
                window.location.reload();
                notify("Success","Logged Out","success");
            }else{
                notify("Failed","Failed to Log Out","danger");
            }
        })
    }

    
    return ( <div className='clientNav'>
        <nav>
            <ul>
                <div className="left">
                    <li style={{marginTop:'5px'}}>
                    <Link to="/">
                        <img src={require('../../images/menu.png')} alt="" width="30px"/>
                    </Link>  
                    </li>

                    <li style={{fontSize:'22px',marginTop:'5px'}}>Ecomm</li>
                </div>
                <div className="right">
                    <li><Link to="/cart">Cart</Link></li>

                    <li><Link to="/account/orders" >My Orders</Link></li>

                    <li><Link to="/account/personal">Account</Link></li>

                    <li><Link  onClick={logout}>Sign Out</Link></li>
                </div>
            
            </ul>
        </nav>
    </div> );
}
 
export default Nav;