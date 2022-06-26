import '../index.css'
import { BrowserRouter as Route, Switch} from 'react-router-dom';
import Categories from '../categories/Categories';
import AdminNav from '../adminNav/AdminNav';
import Products from '../products/Products';
import AddProducts from '../products/AddProducts';
import EditProducts from '../products/EditProducts';
import ProductDetails from '../products/ProductDetails';

const AdminDash = () => {
    return (
            
        
                        <div className="admin_main">
                            <AdminNav />
                            <br />
                        <Switch>
                            <Route path='/admin_dashboard/categories'>
                            <div className="category_header">
                                
                                CATEGORIES
                            </div>
                            <br />
                            <br />
                                <Categories />
                            </Route>
                            <Route path='/admin_dashboard/products'>
                            <div className="category_header">
                                PRODUCTS
                            </div>
                            <br />
                            <br />
                            <br />
                                <Products />
                            </Route>
                            <Route path='/admin_dashboard/add_products'>
                            <div className="category_header">
                                PRODUCTS
                            </div>
                            <br />
                            <br />
                            <br />
                                <AddProducts />
                            </Route>
                            <Route path='/admin_dashboard/edit_products/:id'>
                            <div className="category_header">
                                PRODUCTS
                            </div>
                            <br />
                            <br />
                            <br />
                                <EditProducts />
                            </Route>
                            <Route path='/admin_dashboard/more/:id'>
                            <div className="category_header">
                                PRODUCTS DETAILS
                            </div>
                            <br />
                            <br />
                            <br />
                                <ProductDetails />
                            </Route>

                            <Route path='/admin_dashboard/more/:id'>
                            <div className="category_header">
                                MORE DETAILS ON PRODUCT
                            </div>
                            <br />
                            <br />
                            <br />
                                <EditProducts />
                            </Route>

                            <Route path='/admin_dashboard/orders'>
                            <div className="category_header">
                                ORDERS
                            </div>
                            <br />
                            <br />
                            <br />
                                orders
                            </Route>
                            <Route path='/admin_dashboard/profile'>
                            <div className="category_header">
                                MANAGE MY PROFILE
                            </div>
                            <br />
                            <br />
                            <br />
                                profile
                            </Route>
                            <Route path='/admin_dashboard/users'>
                            <div className="category_header">
                                MANAGE USERS
                            </div>
                            <br />
                            <br />
                            <br />
                                users
                            </Route>
                        </Switch>

                        </div>
                
        
     );
}
 
export default AdminDash;