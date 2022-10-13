import { useState, useEffect } from 'react'
import '../../index.css'
import { Store } from 'react-notifications-component';
import { useHistory ,useParams } from 'react-router-dom';

const EditDelivery = () => {

    const { id } = useParams();


    function notify(title, message, type){
        Store.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
            duration: 1000,
            onScreen: true
            }
        }) 
    }

    const history = useHistory();


    const [data, setData] = useState(null)
    const [location, setLocation] = useState(null);
    const [county, setCounty] = useState(null);
    const [counties, setCounties] = useState([]);
    const [error, setError] = useState(false);
    const [isPending, setPending] = useState(true);
    

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(`${process.env.REACT_APP_API_URL}/delivery/`+id,{signal: abortCont.signal})
        .then((data)=>{
            return data.json()
        })
        .then((data)=>{
            setData(data)
            setLocation(data.location)
            setCounty(data.county)
        })
        .catch(err =>{
            console.log(err)
        })

        fetch('https://counties-kenya.herokuapp.com/api/v1?order=name&dir=asc', {signal: abortCont.signal})
        .then(res=>{
            if(res.ok){
                return res.json();
            }else{
                setError(true)
            }
            
        })
        .then(res=>{
            setPending(false);
            setCounties(res);
        })
        .catch(err =>{
            setPending(false);
            setError(true)
        })

        return () => abortCont.Abort()
    },[])

    const datas = { location, county }

    const handleSubmit = (e) =>{
        e.preventDefault();
        e.target.value = null;

        fetch(`${process.env.REACT_APP_API_URL}/edit_delivery/`+id,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(datas)
        }).then(()=>{
           notify("Success","Delivery Edited","warning")
           history.push('/admin_dashboard/delivery')

        }).catch( ()=>{
            notify("Failed","Server Error. Try Again.","danger")
        })

    }

    return ( 
        <div className="categories" style={{backgroundColor: '#030c3b', color: 'white'}}>
                <br />
                Edit Delivery Location:  
                <div style={{color:'orange', fontSize:'20px', marginLeft:'10%'}}>{!data && <span>Loading...</span> }</div> 
                <br />
                <br />
                <form onSubmit={handleSubmit} className="add_delivery">
                    County:
                    <br />
                    {
                            error && <div style={{color:'red'}}>Failed to fetch Counties</div>
                    }
                    <select name="" 
                    id="" 
                    required 
                    onChange={(e) => setCounty(e.target.value)} >
                        
                        <option value={county}>{county}</option>
                        {
                            isPending && <option>Loading ....</option>
                        }
                        
                        {
                            !isPending && !error && counties.map(county =>(
                                    <option key={county.code} value={county.name}>{county.name}</option>
                            ))
                        } 
                    </select>
                    <br />
                    <br />
                    Pickup Location:
                    <br />
                    <input 
                        type="text"
                        onChange={(e) => setLocation(e.target.value) } 
                        required
                        style={{color: 'black'}}
                        defaultValue={ location }
                    />
                    <br />
                    <br />
                    <input type="submit" value="Save" style={{backgroundColor: 'maroon', color:'white'}}/>
                </form>
                <br />
            </div>
     );
}
 
export default EditDelivery;

