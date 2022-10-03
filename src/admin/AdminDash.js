import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AdminNav from '../adminNav/AdminNav';
import Products from '../products/Products';
import AddProducts from '../products/AddProducts';
import EditProducts from '../products/EditProducts';
import ProductDetails from '../products/ProductDetails';
import EditCategories from '../categories/EditCategories';
import AddCategories from '../categories/AddCategories';
import CategoryTable from '../categories/CategoryTable';
import '../index.css'
import AddDelivery from '../delivery/AddDelivery';
import DeliveryTable from '../delivery/DeliveryTable';
import EditDelivery from '../delivery/EditDelivery';
import PendingOrders from '../orders/PendingOrders';

const AdminDash = () => {
    return (
                        <div className="admin_main">
                            <AdminNav />
                            <br />
                            <Switch>
                                <Route exact path='/admin_dashboard'>
                                    <div className="category_header">
                                        
                                        Dashboard
                                    </div>
                                    <br />
                                    <br />
                                </Route>
                                <Route path='/admin_dashboard/categories/:id'>
                                    <EditCategories />
                                </Route>
                                <Route path='/admin_dashboard/categories'>
                                <div className="category_header">
                                    
                                    CATEGORIES
                                </div>
                                <br />
                                <br />
                                    <AddCategories />
                                        <br />
                                    <CategoryTable />
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

                                <Route path='/admin_dashboard/pending_orders'>
                                <div className="category_header">
                                    PENDING ORDERS
                                </div>
                                <br />
                                <br />
                                <br />
                                    <PendingOrders />
                                </Route>
                                <Route path='/admin_dashboard/delivered_orders'>
                                <div className="category_header">
                                    ORDERS
                                </div>
                                <br />
                                <br />
                                <br />
                                    Delivered orders
                                </Route>
                                <Route path='/admin_dashboard/delivery'>
                                <div className="category_header">
                                    DELIVERY DETAILS
                                </div>
                                <br />
                                <br />
                                <br />
                                    <AddDelivery />
                                    <br />
                                    <DeliveryTable />
                                </Route>
                                <Route path='/admin_dashboard/edit_delivery/:id'>
                                <div className="category_header">
                                    DELIVERY DETAILS
                                </div>
                                <br />
                                <br />
                                <br />
                                    <EditDelivery />
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