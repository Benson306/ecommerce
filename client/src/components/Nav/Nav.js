import { Link } from 'react-router-dom';

const Nav = () => {
    return ( <div className='clientNav'>
        <nav>
            <ul>
                <li style={{marginTop:'5px'}}>
                  <Link to="/">
                    <img src={require('../../images/menu.png')} alt="" width="20px"/>
                  </Link>  
                </li>

                <li style={{fontSize:'22px',marginTop:'1px'}}>Ecomm</li>

                <li id='space'></li>

                <li id='signIn' ><Link to="/login" style={{color:'white', textDecoration:'none'}}>Sign In</Link></li>

                <li id='register' ><Link to="/register" style={{color:'white', textDecoration:'none'}}>Register</Link></li> 
            </ul>
        </nav>
    </div> );
}
 
export default Nav;