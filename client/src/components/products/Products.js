import ProductsTable from "./ProductsTable";
import { Link } from "react-router-dom";


const Products = () => {


    return ( 
        <div>
   <br />
            <div className="topButton">

                <Link to="/admin_dashboard/add_products" style={{display:'flex', width:'16%',border: '1px solid maroon',marginLeft: '3%',textDecoration: 'none', backgroundColor: 'orange', color:'black', padding: '10px'}}>
                    <img src={ require('../../images/add.png')} alt="" width="22px" style={{marginRight:'6%'}}/>
                    Add A New Product
                </Link>
            </div>
            <br />
            <ProductsTable /> 


        </div>
     );
}
 
export default Products;