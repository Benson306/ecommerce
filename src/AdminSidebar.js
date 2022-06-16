import { Link } from 'react-router-dom';

const adminSidebar = () => {
    return ( 
    <div className="adminSidebar">
        <br /><br /><br /><br /><br /><br /><br />
        <ul>
            <li><Link to={'/admin_dashboard/categories'}><img src={require('./images/application.png')} alt="" width='15px' style={{marginRight: '12px'}}/> Categories</Link></li>
            <li><Link to={'/admin_dashboard/items'}><img src={require('./images/shopping-bag.png')} alt="" width='20px' style={{marginRight: '12px'}}/> Products</Link></li>
            <li><Link to={'/admin_dashboard/orders'}><img src={require('./images/cargo.png')} alt="" width='20px' style={{marginRight: '12px'}}/> Orders</Link></li>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <li><Link to={'/admin_dashboard/profile'}><img src={require('./images/user.png')} alt="" width='20px' style={{marginRight: '12px'}}/> My Profile</Link></li>
            <li><Link to={'/admin_dashboard/users'}><img src={require('./images/man.png')} alt="" width='25px' style={{marginRight: '12px'}}/> Manage Users</Link></li>

            <br />
            <br />

            <li style={{ padding: '10px'}}><Link to={'admin_dashboard/logout'}><img src={require('./images/logout.png')} alt="" width='45px' style={{marginRight: '12px'}}/>Logout</Link></li>            
        </ul>
    </div>
 );
}
 
export default adminSidebar;