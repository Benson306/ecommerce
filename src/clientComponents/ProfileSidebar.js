import { Link } from 'react-router-dom';

const ProfileSidebar = () => {
    return ( 
        <div className="adminSidebar">
            <br /><br /><br /><br /><br /><br /><br />
        <ul>
            <li><Link to={'/account/personal'}><img src={require('../images/application.png')} alt="" width='15px' style={{marginRight: '12px'}}/> Personal Info</Link></li>
            <li><Link to={'/account/delivery'}><img src={require('../images/shopping-bag.png')} alt="" width='20px' style={{marginRight: '12px'}}/> Delivery Details</Link></li>   
        </ul>
    </div>
     );
}
 
export default ProfileSidebar;