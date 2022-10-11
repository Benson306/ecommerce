import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

const ProfileSidebar = () => {

    let toggle = true;
    const handleClick = () =>{

        if(toggle === true){

            if(window.innerWidth > 1200){ //desktop
                document.querySelector('.adminSidebar').style.width = '6.0%';
                document.querySelector('.profile .right').style.marginLeft = '10%';
                document.querySelector('.profile .right').style.width = '85%';
            }else if(window.innerWidth < 1200 && window.innerHeight > 768){ //tablet
                document.querySelector('.adminSidebar').style.width = '22%';
                document.querySelector('.profile .right').style.marginLeft = '24%';
                document.querySelector('.profile .right').style.width = '75%';
            }else if(window.innerHeight < 768){ //phone
                document.querySelector('.adminSidebar').style.width = '55%';
                document.querySelector('.profile .right').style.marginLeft = '12%';
                document.querySelector('.profile .right').style.width = '80%';
            }
        
            toggle = false;

        }else if(toggle === false){

            if(window.innerWidth > 1200){ //desktop
                document.querySelector('.adminSidebar').style.width = '20%';
                document.querySelector('.profile .right').style.marginLeft = '22%';
                document.querySelector('.profile .right').style.width = '75%';
            }else if(window.innerWidth < 1200 && window.innerHeight > 768){ //tablet

                document.querySelector('.adminSidebar').style.width = '9.8%';
                document.querySelector('.profile .right').style.marginLeft = '12%';
                document.querySelector('.profile .right').style.width = '85%';
                
            }else if(window.innerHeight < 768){ //phone

                document.querySelector('.adminSidebar').style.width = '10%';
                document.querySelector('.profile .right').style.marginLeft = '12%';
                document.querySelector('.profile .right').style.width = '80%';
                
            }
            

            toggle = true;
        }

    }
    return ( 
        <div className="adminSidebar">
            <br /><br /><br /><br />
        <ul>
            <li><img onClick={handleClick}  src={require('../../images/side-menu.png')} alt="" width='22px' style={{marginRight: '12px'}}/></li>
            
            <li><Link to={'/account/personal'}><Tooltip title="Personal Info" arrow><img src={require('../../images/application.png')} alt="" width='20px' style={{marginRight: '12px'}}/></Tooltip> Personal Info</Link></li>
        
        
        
            <li><Link to={'/account/delivery'}><Tooltip title="Delivery Address" arrow><img src={require('../../images/shopping-bag.png')} alt="" width='20px' style={{marginRight: '12px'}}/></Tooltip> Delivery Address</Link></li>
        
        
        
            <li><Link to={'/account/orders'}><Tooltip title="My Orders" arrow><img src={require('../../images/cargo.png')} alt="" width='20px' style={{marginRight: '12px'}}/></Tooltip>  Orders</Link></li>
              
        </ul>
    </div>
     );
}
 
export default ProfileSidebar;