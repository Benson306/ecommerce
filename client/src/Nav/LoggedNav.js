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
                <li style={{marginTop:'5px'}}>
                  <Link to="/">
                    <img src={require('../images/menu.png')} alt="" width="30px"/>
                  </Link>  
                </li>

                <li style={{fontSize:'22px',marginTop:'5px'}}>Ecomm</li>

                <li style={{width:'40%'}}></li>

                <li style={{display:'flex', justifyContent:'center', alignItems:'center'}}> <img src={require('../images/shopping-cart.png')} width="25%" style={{marginTop:'1%'}} alt="" /> <div style={{marginTop:'10px',marginLeft:'5%', paddingBottom:'5px'}}><Link to="/cart" style={{color:'white', textDecoration:'none'}}>Cart</Link></div></li>

                {/* <li style={{display:'flex', justifyContent:'center', alignItems:'center'}}> <img src={require('../images/love.png')} width="22%" style={{marginTop:'5%'}} alt="" /> <div style={{marginTop:'12px',marginLeft:'5%', paddingBottom:'5px'}}><Link to="/login" style={{color:'white', textDecoration:'none'}}>WishList</Link></div></li> */}

                <li style={{display:'flex', justifyContent:'center', alignItems:'center'}}> <img src={require('../images/user.png')} width="15%" style={{marginTop:'3%', objectFit:'scale-down'}} alt="" /> <div style={{marginTop:'10%',marginLeft:'2%', paddingBottom:'5px'}}><Link to="/account/personal" style={{color:'white', textDecoration:'none'}}>Account</Link></div></li>

                <li style={{display:'flex', justifyContent:'center', alignItems:'center'}}> <img src={require('../images/exit.png')} width="22%" style={{marginTop:'4%', objectFit:'scale-down'}} alt="" /> <div style={{marginTop:'10%',marginLeft:'2%', paddingBottom:'5px'}}><Link  onClick={logout} style={{color:'white', textDecoration:'none'}}>Sign Out</Link></div></li>
            </ul>
        </nav>
    </div> );
}
 
export default Nav;