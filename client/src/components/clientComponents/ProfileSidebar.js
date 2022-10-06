import { Link } from 'react-router-dom';

const ProfileSidebar = () => {
    return ( 
        <div className="adminSidebar">
            <br /><br /><br /><br /><br /><br /><br />
        <ul>
            <li><Link to={'/account/personal'}><img src={require('../../images/application.png')} alt="" width='15px' style={{marginRight: '12px'}}/> Personal Info</Link></li>
            <li><Link to={'/account/delivery'}><img src={require('../../images/shopping-bag.png')} alt="" width='20px' style={{marginRight: '12px'}}/> Delivery Address</Link></li>
            <li><Link to={'/account/orders'}><img src={require('../../images/cargo.png')} alt="" width='20px' style={{marginRight: '12px'}}/> Orders</Link></li>   
        </ul>
    </div>
     );
}
 
export default ProfileSidebar;