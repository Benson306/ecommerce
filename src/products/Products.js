import { BrowserRouter as Route, Switch } from "react-router-dom";
import AddProducts from "../products/AddProducts";
const Products = () => {
    return ( 
        <div>
            {/* <Switch>

                <Route path='/admin_dashboard/add_products'> */}
                    <AddProducts />
                {/* </Route>


            </Switch> */}

        </div>
     );
}
 
export default Products;