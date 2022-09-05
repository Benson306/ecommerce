import { Link } from 'react-router-dom';

const Nav = () => {
    return ( <div className='clientNav'>
        <nav>
            <ul>
                <li style={{marginTop:'5px'}}>
                  <Link to="/">
                    <img src={require('../images/menu.png')} alt="" width="30px"/>
                  </Link>  
                </li>

                <li style={{fontSize:'22px',marginTop:'5px'}}>Ecomm</li>

                <li style={{width:'50%'}}>
                    
                    
                </li>

                <li style={{display:'flex'}}> <img src={require('../images/user.png')} width="25px" height="25px" style={{marginTop:'5%'}} alt="" /> <div style={{marginTop:'10%',marginLeft:'2%'}}><Link to="/login">Account</Link></div></li>

                <li style={{display:'flex'}}> <img src={require('../images/shopping-cart.png')} width="25px" height="30px" style={{marginTop:'5%'}} alt="" /> <div style={{marginTop:'10px',marginLeft:'5%'}}>Cart</div></li>

                <li style={{display:'flex'}}> <img src={require('../images/love.png')} width="25px" height="25px" style={{marginTop:'10%'}} alt="" /> <div style={{marginTop:'12px',marginLeft:'5%'}}>Wishlist</div></li>
            </ul>
        </nav>
    </div> );
}
 
export default Nav;