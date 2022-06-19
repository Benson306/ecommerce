import { useEffect, useState } from "react";
import './index.css'
import { useHistory } from "react-router-dom";
import { Store } from "react-notifications-component";

const AddProducts = () => {

    const [category, setCategory] = useState([])

    const history = useHistory();

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch('http://localhost:8001/categories',{signal: abortCont.signal})
        .then((res)=>{
            if(!res.ok){
                console.log("no data")
            }
            return res.json();
        })
        .then((data)=>{
            setCategory(data)
        })
        .catch((err) =>{
            if(err.name === 'AbortError'){
                console.log('Abort Error')
            }else{
               
            }

        });

        return () => abortCont.abort();
    },[])

    function handleCancel(){
        history.push('/admin_dashboard')
    }

    const [categ, setCateg] = useState('');
    const [prodName, setProdName] = useState('');
    const [prodDetails, setProdDetails] = useState('');
    const [features, setFeatures] = useState('');
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState('');
    const [specifications, setSpecifications] = useState('');
    const [inBox, setInBox] = useState('');
    const [preview1, setPreview1] = useState('');
    const [preview2, setPreview2] = useState('');
    const [preview3, setPreview3] = useState('');
    const [preview4, setPreview4] = useState('');


    const [ data, setData ] = useState('');


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

    console.log(preview1)

    function handleSubmit(e){

        let fd = new FormData();
        fd.append('image1', preview1, preview1.name)


        e.preventDefault();

        const data = { prodName, prodDetails, features, weight, price, specifications, inBox} 
        // , preview1, preview2, preview3, preview4 

        fetch('http://localhost:8001/add_product',{
            method: 'POST',
            header: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }).then(()=>{
            notify("success","Product Added", "success" )
        })

    }


    return (   
        <div>
            
            <form onSubmit={handleSubmit} className='add_product'>
            <div className="heading">Add New Products</div>
            <div class='productForm'>
                <div class='productLeft'>
                        <label>Category:</label>
                        <br />
                        <br />
                        <select 
                        onChange={e => setCateg(e.target.value)}
                        required>
                            <option value=""></option>
                            {!category && <option value="">Loading ....</option>}
                            {category.map((categ)=> (
                                <option value={categ.id}>{categ.categ}</option>
                            )
                            )}
                        </select>
                        <br />
                        <br />
                        <label>Products' Name:</label>
                        <br />
                        <br />
                        <input type="text" onChange={e => setProdName(e.target.value)} name="" id="" required/>
                        <br />
                        <br />
                        <label htmlFor="">Product Details:</label>
                        <br />
                        <br />
                        <textarea onChange={e => setProdDetails(e.target.value)} name="" id="" cols="50" rows="5" required></textarea>
                        <br />
                        <br />
                        <label htmlFor="" required>Key Features:</label>
                        <br />
                        <br />
                        <textarea onChange={e => setFeatures(e.target.value)} name="" id="" cols="50" rows="5" required></textarea>

                </div>
                <div className="productRight">

                        <label htmlFor="">Weight:</label>
                        <br />
                        <br />
                        <input onChange={e => setWeight(e.target.value)} type="text" name="" id="" required/>
                        <br />
                        <br />
                        <label htmlFor="">Price:</label>
                        <br />
                        <br />
                        <input type="text" onChange={e => setPrice(e.target.value)} name="" id="" required/>
                        <br />
                        <br />
                        <label htmlFor="">Specifications:</label>
                        <br />
                        <br />
                        <textarea name="" id="" onChange={e => setSpecifications(e.target.value)} cols="50" rows="5" required></textarea>
                        <br />
                        <br />
                        <label htmlFor="">Whats in the Box:</label>
                        <br />
                        <br />
                        <textarea  onChange={e => setInBox(e.target.value)} name="" id="" cols="50" rows="5" required></textarea>
                        <br />

                        
                        

                </div>
            </div>
            <br />
            <div className="subheading">Add Images of the product:</div>
            <br />
            <div className='previews'>
                
                <div className="previewsInput">
                                <label htmlFor="">Preview Picture 1:</label>
                                <br />
                                <br />
                                <input onChange={e => setPreview1(e.target.files[0])} type="file" name="" id="" required/>
                </div>
                                
                <div className="previewsInput">
                                <label htmlFor="">Preview Picture 2:</label>
                                <br />
                                <br />
                                <input onChange={e => setPreview2(e.target.value)} type="file" name="" id="" required/>
                </div>
                <div className="previewsInput">
                                <label htmlFor="">Preview Picture 3:</label>
                                <br />
                                <br />
                                <input onChange={e => setPreview3(e.target.value)} type="file" name="" id="" />
                </div>
                <div className="previewsInput">
                                <label htmlFor="">Preview Picture 4:</label>
                                <br />
                                <br />
                                <input onChange={e => setPreview4(e.target.value)}type="file" name="" id="" />
                </div>
            </div>
            <br />
            <br />
            <div className="productsButtons">

                    <input type="submit" value='Submit' />
                    <button onClick={handleCancel}>Cancel</button>
            </div>
                                <br /><br /><br />
            
            </form>
        </div>
     );
}
 
export default AddProducts;