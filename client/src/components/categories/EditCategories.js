import { useState, useEffect } from 'react'
import '../../index.css'
import { Store } from 'react-notifications-component';
import { useHistory ,useParams } from 'react-router-dom';

const AddCategories = () => {

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
    const [categ, setCateg] = useState(null);
    

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(`${process.env.REACT_APP_API_URL}/categories/`+id,{signal: abortCont.signal})
        .then((data)=>{
            return data.json()
        })
        .then((data)=>{
            setData(data.categ)
            setCateg(data.categ)
        })

        return () => abortCont.Abort()
    },[])

    const categs = { categ }

    const handleSubmit = (e) =>{
        e.preventDefault();
        e.target.value = null;

        fetch(`${process.env.REACT_APP_API_URL}/edit_categories/`+id,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(categs)
        }).then(()=>{
           notify("Success","Category Edited","warning")
           history.push('/admin_dashboard/categories')

        }).catch( ()=>{
            notify("Failed","Server Error. Try Again.","danger")
        })

    }

    return ( 
        <div className="categories" style={{backgroundColor: '#030c3b', color: 'white'}}>
                <br />
                Edit Category:  <div style={{color:'orange', fontSize:'20px', marginLeft:'10%'}}>{ data }</div> 
                <div style={{color:'orange', fontSize:'20px', marginLeft:'10%'}}>{!data && <span>Loading...</span> }</div> 
                <br />
                <br />
                <form onSubmit={handleSubmit} className="add_category">
                    <input 
                        type="text"
                        onChange={(e) => setCateg(e.target.value) } 
                        required
                        style={{color: 'black'}}
                        defaultValue={ categ }
                    />
                    <input type="submit" value="Save" style={{backgroundColor: 'maroon'}}/>
                </form>
                <br />
            </div>
     );
}
 
export default AddCategories;

