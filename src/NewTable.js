import { useState, useEffect } from 'react';
import './index.css'

const NewTable = () => {

    const [datas, setData] = useState([]);
    const [q, setQ] = useState("")


    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('http://localhost:8001/categories',{signal: abortCont.signal})
        .then(res=>{
            return res.json();
        })
        .then((res)=>{
            setData(res)
        })

        return ()=> abortCont.Abort();
    },[])


    return ( <div>
        <br />
            <input type="text" placeholder="Search..." onChange={e=>{ setQ(e.target.value)}} />
            <table id="customers">
                <thead>
                        <tr>
                            <th>id</th>
                            <th>Category</th>
                        </tr>
                </thead>
                <tbody>
                    { !datas && <div>Loading...</div> }
                    {
                        datas.filter( val =>{
                            if(q === ''){
                                return val;
                            }else if(
                                val.categ.toLowerCase().includes(q.toLowerCase()) ||
                                val._id.toLowerCase().includes(q.toLowerCase())
                            ){
                                return val;
                            }
                        }).map( data => (
                            <tr key={data._id}>
                                <td>{data._id}</td>
                                <td>{data.categ}</td>
                            </tr>

                        ))
                    }

                </tbody>
            </table>
    </div> );
}
 
export default NewTable;