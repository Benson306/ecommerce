const adminSidebar = () => {
    return ( 
    <div className="adminSidebar">
        <br /><br /><br /><br /><br /><br /><br />
        <ul>
            <li><a href='/admin_dashboard/categories'><img src={require('./images/application.png')} alt="" width='15px' style={{marginRight: '12px'}}/> Categories</a></li>
            <li><a href='/admin_dashboard/items'><img src={require('./images/shopping-bag.png')} alt="" width='20px' style={{marginRight: '12px'}}/> Items</a></li>
            <li><a href='/admin_dashboard/orders'><img src={require('./images/cargo.png')} alt="" width='20px' style={{marginRight: '12px'}}/> Orders</a></li>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <li><a href='/admin_dashboard/profile'><img src={require('./images/user.png')} alt="" width='20px' style={{marginRight: '12px'}}/> My Profile</a></li>
            <li><a href='/admin_dashboard/users'><img src={require('./images/man.png')} alt="" width='25px' style={{marginRight: '12px'}}/> Manage Users</a></li>

            <br />
            <br />

            <li style={{ padding: '10px'}}><a href='/admin_dashboard/logout'><img src={require('./images/logout.png')} alt="" width='45px' style={{marginRight: '12px'}}/>Logout</a></li>            
        </ul>
    </div>
 );
}
 
export default adminSidebar;