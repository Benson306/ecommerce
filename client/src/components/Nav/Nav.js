import { Link } from 'react-router-dom';

const Nav = () => {
    return ( <div className='clientNav'>
        <nav>
            <ul>
                <li style={{marginTop:'5px'}}>
                  <Link to="/">
                    <img src={require('../../images/menu.png')} alt="" width="30px"/>
                  </Link>  
                </li>

                <li style={{fontSize:'22px',marginTop:'5px'}}>Ecomm</li>

                <li style={{width:'80%'}}></li>

                <li style={{display:'flex', justifyContent:'center', alignItems:'center'}}> <img src={require('../../images/user.png')} width="22%" style={{marginTop:'3%', objectFit:'scale-down'}} alt="" /> <div style={{marginTop:'10%',marginLeft:'2%', paddingBottom:'3px'}}><Link to="/login" style={{color:'white', textDecoration:'none'}}>Sign In</Link></div></li>

                <li style={{display:'flex', justifyContent:'center', alignItems:'center'}}> <img src={require('../../images/personal.png')} width="28%" style={{marginTop:'5%'}} alt="" /> <div style={{marginTop:'12px',marginLeft:'5%', paddingBottom:'5px'}}><Link to="/register" style={{color:'white', textDecoration:'none'}}>Register</Link></div></li> 
            </ul>
        </nav>
    </div> );
}
 
export default Nav;