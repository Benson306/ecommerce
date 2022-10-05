import { Link } from "react-router-dom";

const adminNav = () => {
    return ( 
        <div className="adminNav">
            <nav>
                <ul>
                    <div className="navRight">
                        <li style={{float:'right'}}><Link to={'/admin_dashboard/profile'}>My Account</Link></li>
                        <li><Link to={'/admin_dashboard/profile'}>Sign Out</Link></li>
                    </div>
                    
                </ul>
            </nav>
            <br />
        </div>
     );
}
 
export default adminNav;