import '../index.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Categories from '../categories/Categories';
import Nav from '../Nav/Nav';
import Products from '../products/Products';
import AddProducts from '../products/AddProducts';
import EditProducts from '../products/EditProducts';

const AdminDash = () => {
    return (
            
        
                        <div className="admin_main">
                            <Nav />
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