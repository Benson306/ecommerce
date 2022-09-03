import { Link } from 'react-router-dom';

const adminSidebar = () => {
    return ( 
    <div className="adminSidebar">
        <br /><br /><br /><br /><br /><br /><br />
        <ul>
            <li><Link to={'/admin_dashboard/categories'}><img src={require('../images/application.png')} alt="" width='15px' style={{marginRight: '12px'}}/> Categories</Link></li>
            <li><Link to={'/admin_dashboard/products'}><img src={require('../images/shopping-bag.png')} alt="" width='20px' style={{marginRight: '12px'}}/> Products</Link></li>
            <li><Link to={'/admin_dashboard/orders'}><img src={require('../images/cargo.png')} alt="" width='20px' style={{marginRight: '12px'}}/> Orders</Link></li>
            <li><Link to={'/admin_dashboard/delivery'}><img src={require('../images/delivery-man.png')} alt="" width='25px' style={{marginRight: '12px'}}/> Delivery Stations</Link></li>
            <li><Link to={'/admin_dashboard/users'}><img src={require('../images/man.png')} alt="" width='25px' style={{marginRight: '12px'}}/> Manage Users</Link></li>     
        </ul>
    </div>
 );
}
 
export default adminSidebar;