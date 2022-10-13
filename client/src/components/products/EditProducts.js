import { useEffect, useState } from "react";
import '../../index.css'
import { useHistory } from "react-router-dom";
import { Store } from "react-notifications-component";
import { useParams } from "react-router-dom";

const EditProducts = () => {

    const [category, setCategory] = useState([])



    const { id } = useParams();


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

    const [data, setData] = useState('')

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(`${process.env.REACT_APP_API_URL}/products/`+id,{ signal: abortCont.signal })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            setData(data);

            setCateg(data.categ)
            setProdName(data.prodName)
            setProdDetails(data.prodDetails)
            setFeatures(data.features)
            setWeight(data.weight)
            setPrice(data.price)
            setSpecifications(data.specifications)
            setInBox(data.inBox);
        })

        return () => abortCont.abort()
    },[]);

    function handleCancel(){
        history.push('/admin_dashboard/products')
    }

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

        e.preventDefault();
        e.target.value = null;

     
        fetch(`${process.env.REACT_APP_API_URL}/edit_product/`+id,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(datas)
        }).then((res)=>{
            if(!res.ok){
                notify("Failed","Server Error. Try Again.","danger")
            }else{
                history.push('/admin_dashboard/products')
                notify("Success","Product Edited", "warning" )
            }
        })
    }


    function handlePreview1(e){
        e.preventDefault();

        let data = e.target.files[0];

        let formData =  new FormData();

        formData.append("file1", data);



        fetch(`${process.env.REACT_APP_API_URL}/edit_pic1/`+id,{
            method:'PUT',
            body: formData
        })
        .then(()=>{
            notify("Success","Picture Replaced", "warning" );
        })
    }
    function handlePreview2(e){
        e.preventDefault();

        let data = e.target.files[0];

        let formData =  new FormData();

        formData.append("file2", data);


        fetch(`${process.env.REACT_APP_API_URL}/edit_pic2/`+id,{
            method:'PUT',
            body: formData
        })
        .then(()=>{
            notify("Success","Picture Replaced", "warning" );
        })
    }
    function handlePreview3(e){
        e.preventDefault();

        let data = e.target.files[0];

        let formData =  new FormData();

        formData.append("file3", data);


        fetch(`${process.env.REACT_APP_API_URL}/edit_pic3/`+id,{
            method:'PUT',
            body: formData
        })
        .then(()=>{
            notify("Success","Picture Replaced", "warning" );
        })
    }
    function handlePreview4(e){
        e.preventDefault();

        let data = e.target.files[0];

        let formData =  new FormData();

        formData.append("file4", data);


        fetch(`${process.env.REACT_APP_API_URL}/edit_pic4/`+id,{
            method:'PUT',
            body: formData
        })
        .then(()=>{
            notify("Success","Picture Replaced", "warning" );
        })
    }


    return (   
        <div>
            
            <form onSubmit={handleSubmit} className='edit_product'>
            <div className="heading" style={{color:'black'}}>Edit Product  </div>
            { !data && <div style={{color: 'yellow', fontSize:'18px'}}>Loading ... <br /></div>}
           {data && <div class='productForm'>
                <div class='productLeft'>
                        <label>Category:</label>
                        <br />
                        <br />
                        <select 
                        onChange={e => setCateg(e.target.value)}
                        required>
                            <option value={data.categ}>{data.categ}</option>
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
                        <input type="text" onChange={e => setProdName(e.target.value)} defaultValue={ data.prodName } required/>
                        <br />
                        <br />
                        <label htmlFor="">Product Details:</label>
                        <br />
                        <br />
                        <textarea onChange={e => setProdDetails(e.target.value)} defaultValue={ data.prodDetails } cols="50" rows="5" required></textarea>
                        <br />
                        <br />
                        <label htmlFor="" required>Key Features:</label>
                        <br />
                        <br />
                        <textarea onChange={e => setFeatures(e.target.value)} defaultValue={ data.prodName } cols="50" rows="5" required></textarea>

                </div>
                <div className="productRight">

                        <label htmlFor="">Weight:</label>
                        <br />
                        <br />
                        <input onChange={e => setWeight(e.target.value)} defaultValue={ data.weight } type="text" name="" id="" required/>
                        <br />
                        <br />
                        <label htmlFor="">Price:</label>
                        <br />
                        <br />
                        <input type="text" onChange={e => setPrice(e.target.value)} defaultValue={ data.price } name="" id="" required/>
                        <br />
                        <br />
                        <label htmlFor="">Specifications:</label>
                        <br />
                        <br />
                        <textarea name="" id="" onChange={e => setSpecifications(e.target.value)} defaultValue={ data.specifications } cols="50" rows="5" required></textarea>
                        <br />
                        <br />
                        <label htmlFor="">Whats in the Box:</label>
                        <br />
                        <br />
                        <textarea  onChange={e => setInBox(e.target.value)} defaultValue={ data.inBox } cols="50" rows="5" required></textarea>
                        <br />
                        

                </div>
                
            </div> }

            <br />
            <div className="subheading" style={{backgroundColor:'orange', color:'black'}}>Replace Images of the product:</div>
            <br />
           { data && <div className='previews'>
                
                <div className="previewsInput">
                                
                                <label htmlFor="">Preview Picture 1:</label>
                                <br />
                                <br />
                                <img src={`${process.env.REACT_APP_API_URL}/uploads/${data.preview1}`} alt="" />
                                <br />
                                <br />

                                <input style={{display:'none'}} onChange={ (e) =>{ setPreview1(e.target.files[0]); handlePreview1(e) }} placeholder="" type="file" name="" id="img1" />
                                <label for="img1"><div style={{padding: '10px', textAlign:'center', width:'50%', marginLeft:'25%', backgroundColor:'lightgray', color:'#030c3b', border:'1px solid orange'}}>Replace</div></label>
                </div>
                                
                <div className="previewsInput">
                                <label htmlFor="">Preview Picture 2:</label>
                                <br />
                                <br />
                                <img src={`${process.env.REACT_APP_API_URL}/uploads/${data.preview2}`} alt="" />
                                <br />
                                <br />
                                <input onChange={e =>{ setPreview2(e.target.files[0]); handlePreview2(e) }} type="file" name="" id="img2" style={{display:'none'}}/>
                                <label for="img2"><div style={{padding: '10px', textAlign:'center', width:'50%', marginLeft:'25%', backgroundColor:'lightgray', color:'#030c3b', border:'1px solid orange'}}>Replace</div></label>
                </div>
                <div className="previewsInput">
                                <label htmlFor="">Preview Picture 3:</label>
                                <br />
                                <br />
                                <img src={`${process.env.REACT_APP_API_URL}/uploads/${data.preview3}`} alt=""  />
                                <br />
                                <br />
                                <input onChange={e => {setPreview3(e.target.files[0]); handlePreview3(e)}} type="file" name="" id="img3" style={{display:'none'}} />
                                <label for="img3"><div style={{padding: '10px', textAlign:'center', width:'50%', marginLeft:'25%', backgroundColor:'lightgray', color:'#030c3b', border:'1px solid orange'}}>Replace</div></label>
                </div>
                <div className="previewsInput">
                                <label htmlFor="">Preview Picture 4:</label>
                                <br />
                                <br />
                                <img src={`${process.env.REACT_APP_API_URL}/uploads/${data.preview4}`} alt="" />
                                <br />
                                <br />
                                <input onChange={e => { setPreview4(e.target.files[0]); handlePreview4(e)}}type="file" name="" id="img4" style={{display:'none'}} />
                                <label for="img4"><div style={{padding: '10px', textAlign:'center', width:'50%', marginLeft:'25%', backgroundColor:'lightgray', color:'#030c3b', border:'1px solid orange'}}>Replace</div></label>
                </div>
            </div> }
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
 
export default EditProducts;