import { useState, useEffect  } from "react";
import { Link } from "react-router-dom";

const Personal = () => {
    const [ data, setData ]=useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);

    let star = "*";
    let stars = "";
    const [passLength, setLength] = useState(null);


    useEffect(()=>{
        const abortCont = new AbortController();
        fetch('/profile',{signal: abortCont.signal})
        .then(res=>{
            if(res.ok){
                return res.json();
            }else{
                setError(true);
                setLoading(false);
            }
        })
        .then((res)=>{
            setError(false);
            setLoading(false);
            setData(res);
            setLength(res.password.length);
        })
        .catch((err)=>{
            setError(true);
            setLoading(false);
        })


        return ()=> abortCont.abort();
    },[data])

    for(let i = 0; i<passLength; i++){
        stars+=star;
    }

    return ( <div className="personal">

        <h1>Personal Information</h1>
        <hr />
        <br /><br />

        { loading && <div>Loading ...</div>}
        { error && <div>Failed to Fetch Data</div>}
        {!loading && !error && 
        <div className="details">
            <button><Link to={'/account/edit_personal'}>Edit</Link></button>
            <div className="title">Email:</div>
             <div className="body">{data.email}</div>   
                <br />
            <div className="title">Phone:</div>
            <div className="body">{data.phone}</div>
            <br />
            <div className="title">Password:</div>
            <div className="body">{stars}</div>
        </div>
                

        }
        
    </div> );
}
 
export default Personal;