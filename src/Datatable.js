import { useState, useEffect } from 'react'
import Table from './Table'


const Datatables = () => {


const [data, setData] = useState([])
const [q, setQ] = useState('')

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch('http://localhost:8000/categories', {signal: abortCont.signal})
        .then( (res) =>{
            if(!res.ok){
                throw Error('Could Not fetch Data')
            }
            return res.json()
        })
        .then( (json) =>{
            setData(json)
        })

        return () => abortCont.abort();
    },[])

    function search(rows){
        const columns = rows[0] && Object.keys(rows[0]);

        return rows.filter((row) => 
            columns.some(
                (column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1 
            )
        )
    }


    return ( 

        <div style={{width: '80%', marginLeft:'10%'}}>
            <div>
                <br />
                <br />
                <input style={{float:'right',border: '1px solid black', padding: '10px'}} type="text" placeholder="Find in table ...." onChange={ (e) => setQ(e.target.value)} value={q} />
            </div>
              <Table data={search(data)} /> 
               
        </div>

     );
}
 
export default Datatables;