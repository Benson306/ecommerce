import { useEffect, useState } from "react";
import '../../index.css'
import { useHistory } from "react-router-dom";
import { Store } from "react-notifications-component";

const AddProducts = () => {

    const [category, setCategory] = useState([])

    const history = useHistory();

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(`${process.env.REACT_APP_API_URL}/categories`,{signal: abortCont.signal})
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
        history.push('/admin_dashboard/products')
    }

    const [categ, setCateg] = useState(null);
    const [prodName, setProdName] = useState(null);
    const [prodDetails, setProdDetails] = useState(null);
    const [features, setFeatures] = useState(null);
    const [weight, setWeight] = useState(null);
    const [price, setPrice] = useState(null);
    const [specifications, setSpecifications] = useState(null);
    const [inBox, setInBox] = useState(null);
    const [preview1, setPreview1] = useState('');
    const [preview2, setPreview2] = useState('');
    const [preview3, setPreview3] = useState('');
    const [preview4, setPreview4] = useState('');


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

    const datas = { categ, prodName, prodDetails, features, weight, price, specifications, inBox }


    const handleSubmit = (e)=>{

        let formData =  new FormData();

        formData.append("file1", preview1);
        formData.append("file2", preview2);
        formData.append("file3", preview3);
        formData.append("file4", preview4);
        formData.append("datas", JSON.stringify(datas));


        e.preventDefault();
        e.target.value = null;

     
        fetch(`${process.env.REACT_APP_API_URL}/add_product`,{
            method: 'POST',
            body: formData
        }).then((res)=>{
            if(!res.ok){
                notify("Failed","Server Error. Try Again.","danger")
            }else{
                history.push('/admin_dashboard/products')
                notify("success","Product Added", "success" )
            }
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
                            {(category.length == 0) && <option value="">Loading ....</option>}
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
                                <input onChange={e => setPreview2(e.target.files[0])} type="file" name="" id="" required/>
                </div>
                <div className="previewsInput">
                                <label htmlFor="">Preview Picture 3:</label>
                                <br />
                                <br />
                                <input onChange={e => setPreview3(e.target.files[0])} type="file" name="" id="" required/>
                </div>
                <div className="previewsInput">
                                <label htmlFor="">Preview Picture 4:</label>
                                <br />
                                <br />
                                <input onChange={e => setPreview4(e.target.files[0])}type="file" name="" id="" required/>
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