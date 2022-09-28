import { useLocation } from "react-router-dom";
import Delivery from "./Delivery";
import Personal from "./Personal";

const Summary = () => {
    const location = useLocation();
    const data = location.state;

    console.log(data);

    return ( 
    <div className="summary">
        <div className="panel1">
            <div className="detailsPreview">
                <Personal />

            </div>
        </div>
        <div className="panel2">
            <Delivery />
        </div>
        
        
    </div>
     );
}
 
export default Summary;