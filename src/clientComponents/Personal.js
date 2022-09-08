import { useState, useEffect  } from "react";

const Personal = () => {
    const [ data, setData ]=useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);


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
        })
        .catch((err)=>{
            setError(true);
            setLoading(false);
        })


        return ()=> abortCont.abort();
    },[data])

    return ( <div className="personal">

        <h1>Personal Information</h1>

        { loading && <div>Loading ...</div>}
        { error && <div>Failed to Fetch Data</div>}
        {!loading && !error && 
        <div className="details">
            <button>Edit</button>
            <div className="title">Email:</div>
             <div className="body">{data.email}</div>   
                <br />
            <div className="title">Phone:</div>
            <div className="body">{data.phone}</div>
        </div>
                

        }
        
    </div> );
}
 
export default Personal;