import { useState, useEffect } from 'react';
import './index.css'
import { Store } from 'react-notifications-component';
import CategoryTable from './CategoryTable';

const Categories = () => {

    const [categories, setCategory] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setPending] = useState(true);

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch('http://localhost:8000/categories', {signal: abortCont.signal})
        .then( (res) =>{
            if(!res.ok){
                throw Error('Could Not fetch Data')
            }
            return res.json()
        })
        .then( (data) =>{
            setCategory(data)
            setPending(false)
            setError(null)
            
        })
        .catch((err) =>{
            if(err.name === 'AbortError'){
                console.log('Abort Error')
            }else{
                setError(err.message)
                setPending(false)
            }

        });
        return () => abortCont.abort();
    },[categories])
 
    const [categ, setCateg] = useState('');
    const categs = {categ}

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

    const handleSubmit = (e) =>{
        e.preventDefault();
        e.target.value = null;

        fetch('http://localhost:8000/categories',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(categs)
        }).then(()=>{
           notify("Success","Category Added","success")
        }).catch( ()=>{
            notify("Failed","Server Error. Try Again.","danger")
        })

    }

    const [q, setQ] = useState('')

    function search(rows){
        const columns = rows[0] && Object.keys(rows[0]);

        return rows.filter((row) => 
            columns.some(
                (column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1 
            )
        )
    }
    
    return ( 
        <div className="category">
            <div className="categories">
                <br />
                Add Category:
                <br />
                <br />
                <form onSubmit={handleSubmit} className="add_category">
                    <input 
                        type="text" 
                        onChange={(e) => setCateg(e.target.value)} 
                        placeholder="Add Category"
                        required
                    />
                    <input type="submit" value="Save"/>
                </form>
                <br />
            </div>
            <br />
            <div className="list_categories">
                <br />

                <input style={{float:'right',border: '1px solid black', padding: '10px', marginRight:'5%'}} type="text" placeholder="Find in table ...." onChange={ (e) => setQ(e.target.value)} value={q} />

                <br />
                <br />
            
                {error && notify("Failed To fetch Data", "Server Error. Reload Page.","danger")}
                {isPending && <div>Loading ...</div>}
                {!isPending && <CategoryTable data={search(categories)} /> }
                
            </div>
        </div>
        
     );
}
 
export default Categories;