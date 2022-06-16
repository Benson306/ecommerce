import { Link } from "react-router-dom";

const Nav = () => {
    return ( 
        <div>
            <nav>
                <ul>
                    <div className="navRight">
                        <li style={{float:'right'}}><Link to={'/admin_dashboard/profile'}>My Account</Link></li>
                        <li><Link>Sign Out</Link></li>
                    </div>
                    
                </ul>
            </nav>
            <br />
        </div>
     );
}
 
export default Nav;