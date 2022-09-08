import { Link } from "react-router-dom";

const Delivery = () => {

    return ( 
        <div className="deliv">
                    <div className="deliveryHeader">
                        <img src={require("../images/fast-delivery.png")} alt="" />My Delivery Details
                    </div>
                    <div className="deliveryBody">
                        <button style={{float:'right', backgroundColor:'transparent'}}><Link to="/account/edit_delivery_addr" style={{textDecoration:'none', fontSize: 'maedium', color:'maroon'}}>Change Delivery Address</Link></button>
                        <br />
                        <div className="title">Delivery Type:</div>
                        <br />
                        <div className="title">County:</div>
                        <br />
                        <div className="title">Pick-up Point:</div>
                        <br />
                    </div>
                    
                </div>
    );
}
 
export default Delivery;