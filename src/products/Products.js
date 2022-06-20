import { useEffect, useState } from "react";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import AddProducts from "../products/AddProducts";
import { Store } from "react-notifications-component";
import ProductsTable from "./ProductsTable";
import { Link } from "react-router-dom";


const Products = () => {


    const [q, setQ] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setPending] = useState(true);

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

    function search(rows){
        const columns = rows[0] && Object.keys(rows[0]);

        return rows.filter((row) => 
            columns.some(
                (column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1 
            )
        )
    }

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch('http://localhost:8001/products', {signal: abortCont.signal})
        .then( (res) =>{
            if(!res.ok){
                throw Error('Could Not fetch Data')
            }
            return res.json()
        })
        .then( (data) =>{
            setProducts(data)
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
    },[products])

    return ( 
        <div>
   <br />
            <div className="topButton">

                <Link to="/admin_dashboard/add_products" style={{display:'flex', width:'16%',border: '1px solid maroon',marginLeft: '3%',textDecoration: 'none', backgroundColor: 'orange', color:'black', padding: '10px'}}>
                    <img src={ require('../images/add.png')} alt="" width="22px" style={{marginRight:'6%'}}/>
                    Add A New Product
                </Link>
            </div>
            <br />
            <div className="list_categories">
                <br />

                <input style={{float:'right',border: '1px solid black', padding: '10px', marginRight:'5%'}} type="text" placeholder="Find in table ...." onChange={ (e) => setQ(e.target.value)} value={q} />

                <br />
                <br />
            
                {error && notify("Failed To fetch Data", "Server Error. Reload Page.","danger")}
                {isPending && <div>Loading ...</div>}
                {!isPending && <ProductsTable data={search(products)} /> }
                
            </div>


        </div>
     );
}
 
export default Products;