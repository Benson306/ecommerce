import { useState, useEffect } from 'react';
import './index.css'
import { Store } from 'react-notifications-component';


const Categories = () => {

    const [categories, setCategory] = useState(null);
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

    const handleSubmit = (e) =>{
        e.preventDefault();
        e.target.value = null;

        fetch('http://localhost:8000/categories',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(categs)
        }).then(()=>{
            Store.addNotification({
                title: "Success",
                message: "Succesfully added",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 1000,
                  onScreen: true
                }
              }) 

        }).catch( ()=>{
                Store.addNotification({
                title: "Failed",
                message: "Try Again",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 1000,
                  onScreen: true
                }
              }) 

        })


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
                <table id='customers'>
                    <tr>
                        <th>Category Name</th>
                        <th>Edit</th>
                        <th>Delete</th> 
                    </tr>
                    { error && <tr><td colSpan={3} style={{textAlign: 'center'}}>Error Fetching Data</td></tr> }
                    { isPending && <tr><td colSpan={3} style={{textAlign: 'center'}}>Loading ....</td></tr> }
                    
                    {
                        !isPending && categories.map(category => (
                            <tr>
                                <td>{category.categ}</td>
                                <td><img src={require('./images/editing.png')} width='20px' alt="" /></td>
                                <td><img src={require('./images/delete.png')} width='20px' alt="" /></td>
                            </tr>
                        ))
                    }

                    </table>
                
             
            </div>
        </div>
        
     );
}
 
export default Categories;