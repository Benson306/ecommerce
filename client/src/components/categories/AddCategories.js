import { useState, useEffect } from 'react'
import '../../index.css'
import { Store } from 'react-notifications-component';

const AddCategories = () => {
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

        fetch('/add_categories',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(categs)
        }).then(()=>{
            e.target.reset()
           notify("Success","Category Added","success")
        }).catch( (err)=>{
            console.log(err)
            notify("Failed","Server Error. Try Again.","danger")
        })

    }

    return ( 
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
                    <input type="submit" value="Save" />
                </form>
                <br />
            </div>
     );
}
 
export default AddCategories;