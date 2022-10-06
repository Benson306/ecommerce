import {useState, useEffect} from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Store } from 'react-notifications-component';
import '../../index.css';


const ProductDetails = () => {

    const [product, setProduct]= useState(null);

    const { id } = useParams();

    let history = useHistory()

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch('/products/'+id, {signal: abortCont.signal})
        .then((res)=>{
            if(!res.ok){

            }else{
                return res.json()
            }  
        })
        .then((res)=>{
            setProduct(res);
        })

        return () => abortCont.Abort();

    },[])

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


    const handleDelete = ()=>{
        fetch('/del_products/'+id,{
            method: 'DELETE'
        })
        .then(()=>{
            history.push('/admin_dashboard/products')
            notify("Deleted", "Product Deleted", "danger")
        })
    }
    
    return ( 
    <div className="more">
        {(product == null) && <div>Loading...</div>}
         { (product !=null) && 
         <div>
            <div class='productForm'>
                <div class='productLeft'>
                        <label>Category:</label>
                        <br />
                        <div className='itemBrand'>{product.categ}</div>
                        <br />
                        <br />
                        <label>Products' Name:</label>
                        <br />
                        <div className='itemBrand'>{product.prodName}</div>
                        <br />
                        <br />
                        <label htmlFor="">Product Details:</label>
                        <br />
                        <div className='itemBrand'>{product.prodDetails}</div>
                        <br />
                        <br />
                        <label htmlFor="" required>Key Features:</label>
                        <br />
                        <div className='itemBrand'>{product.features}</div>

                </div>
                <div className="productRight">

                        <label htmlFor="">Weight:</label>
                        <br />
                        <div className='itemBrand'>{product.weight}</div>
                        <br />
                        <br />
                        <label htmlFor="">Price:</label>
                        <br />
                        <div className='itemBrand'>{product.price}</div>
                        <br />
                        <br />
                        <label htmlFor="">Specifications:</label>
                        <br />
                        <div className='itemBrand'>{product.specifications}</div>
                        <br />
                        <br />
                        <label htmlFor="">Whats in the Box:</label>
                        <br />
                        <div className='itemBrand'>{product.inBox}</div>
                        <br />

                        
                        

                </div>
            </div>
            <br />
            <div className="subheading">Images of the product:</div>
            <br />
         
            <div className='previews'>
                
                <div className="previewsInput">
                                <label htmlFor="">Preview Picture 1:</label>
                                <br />
                                <br />
                                <img src={`/uploads/${product.preview1}`} alt="" />
                </div>
                                
                <div className="previewsInput">
                                <label htmlFor="">Preview Picture 2:</label>
                                <br />
                                <br />
                                <img src={`/uploads/${product.preview2}`} alt="" />
                </div>
                <div className="previewsInput">
                                <label htmlFor="">Preview Picture 3:</label>
                                <br />
                                <br />
                                <img src={`/uploads/${product.preview3}`} alt="" />
                </div>
                <div className="previewsInput">
                                <label htmlFor="">Preview Picture 4:</label>
                                <br />
                                <br />
                                <img src={`/uploads/${product.preview4}`} alt="" />
                </div>
            </div>
            <br />
            <br />
            <div className="productsButtons">

                    <Link to={ `/admin_dashboard/edit_products/${product._id}`}>
                        Edit
                    </Link>
                    <button onClick={handleDelete} style={{backgroundColor:'darkred', color:'white'}}>Delete</button>
                    <button onClick={handleCancel}>Back</button>
            </div>
            <br />
            <br />

            </div>
        }
        <br />
        <br />

    </div> 
    );
}
 
export default ProductDetails;