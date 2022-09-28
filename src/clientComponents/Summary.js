import { useLocation } from "react-router-dom";

const Summary = () => {
    const location = useLocation();
    const data = location.state;

    console.log(data);

    return ( <div className="summary">
        <br /><br /><br />
        Data: <br />
        { data.map(dt =>(
            <div>{dt.item_id}</div> 
        )) }
    </div> );
}
 
export default Summary;