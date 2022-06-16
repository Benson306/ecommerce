import { useState, useEffect } from 'react'
import './index.css'
import { Store } from 'react-notifications-component';
import { useParams } from 'react-router-dom';

const AddCategories = () => {

    const { id } = useParams();

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

    const [value, setValue] = useState('');
    useEffect(()=>{
        fetch('http://localhost:8000/categories/'+id)
        .then((data)=>{
            return data.json()
        })
        .then((data)=>{
            setValue(data.categ)
        })
    })

    const handleSubmit = (e) =>{
        e.preventDefault();
        e.target.value = null;

        fetch('http://localhost:8000/categories/'+id,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(categs)
        }).then(()=>{
           notify("Success","Category Added","success")
        }).catch( ()=>{
            notify("Failed","Server Error. Try Again.","danger")
        })

    }

    return ( 
        <div className="categories" style={{backgroundColor: '#030c3b', color: 'white'}}>
                <br />
                Edit Category:
                <br />
                <br />
                <form onSubmit={handleSubmit} className="add_category">
                    <input 
                        type="text"
                        onChange={(e) => setCateg(e.target.value) && setValue(e.target.value) } 
                        placeholder={ value }
                        required
                        style={{color: 'white'}}
                        defaultValue={ value }
                    />
                    <input type="submit" value="Save"/>
                </form>
                <br />
            </div>
     );
}
 
export default AddCategories;

