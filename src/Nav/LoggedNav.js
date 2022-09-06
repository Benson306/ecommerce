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

                <li style={{width:'50%'}}></li>

                <li style={{display:'flex', justifyContent:'center', alignItems:'center'}}> <img src={require('../images/shopping-cart.png')} width="35%" style={{marginTop:'5%'}} alt="" /> <div style={{marginTop:'10px',marginLeft:'5%', paddingBottom:'5px'}}><Link to="/login" style={{color:'white', textDecoration:'none'}}>Cart</Link></div></li>

                <li style={{display:'flex', justifyContent:'center', alignItems:'center'}}> <img src={require('../images/love.png')} width="22%" style={{marginTop:'10%'}} alt="" /> <div style={{marginTop:'12px',marginLeft:'5%', paddingBottom:'5px'}}><Link to="/login" style={{color:'white', textDecoration:'none'}}>WishList</Link></div></li>

                <li style={{display:'flex', justifyContent:'center', alignItems:'center'}}> <img src={require('../images/user.png')} width="22%" style={{marginTop:'4%', objectFit:'scale-down'}} alt="" /> <div style={{marginTop:'10%',marginLeft:'2%', paddingBottom:'5px'}}><Link to="/login" style={{color:'white', textDecoration:'none'}}>Account</Link></div></li>

                <li style={{display:'flex', justifyContent:'center', alignItems:'center'}}> <img src={require('../images/user.png')} width="22%" style={{marginTop:'4%', objectFit:'scale-down'}} alt="" /> <div style={{marginTop:'10%',marginLeft:'2%', paddingBottom:'5px'}}><Link to="/login" style={{color:'white', textDecoration:'none'}}>Sign Out</Link></div></li>
            </ul>
        </nav>
    </div> );
}
 
export default Nav;