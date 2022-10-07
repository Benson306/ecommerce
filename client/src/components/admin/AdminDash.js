import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useState, useEffect } from 'react';

import AdminNav from '../../components/adminNav/AdminNav';
import Products from '../../components/products/Products';
import AddProducts from '../../components/products/AddProducts';
import EditProducts from '../../components/products/EditProducts';
import ProductDetails from '../../components/products/ProductDetails';
import EditCategories from '../../components/categories/EditCategories';
import AddCategories from '../../components/categories/AddCategories';
import CategoryTable from '../../components/categories/CategoryTable';
import '../../index.css'
import AddDelivery from '../../components/delivery/AddDelivery';
import DeliveryTable from '../../components/delivery/DeliveryTable';
import EditDelivery from '../../components/delivery/EditDelivery';
import PendingOrders from '../../components/orders/PendingOrders';
import MakeDelivery from '../../components/orders/MakeDelivery';
import DeliveredOrders from '../../components/orders/DeliveredOrders';
import OrderSummary from '../../components/orders/OrderSummary';
import AddUsers from './AddUsers';
import UsersTable from './UsersTable';
import EditUsers from './EditUsers';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';



const AdminDash = () => {

    const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
      const abortCont = new AbortController();

      fetch('/admin_auth', {signal: abortCont.signal})
      .then((res)=>{
          if(res.ok){
              setLoggedIn(true);
              setLoading(false);
          }else{
              setLoggedIn(false);
              setLoading(false);
          }
      })

      return () => abortCont.abort();
  },[])


    return (
                        <div className="admin_main">
                            <AdminNav />
                            
                            <br />
                            {
                                !loading && loggedIn &&
                            
                            <Switch>
                                <Route exact path='/admin_dashboard'>
                                    <div className="category_header">
                                        DASHBOARD
                                    </div>
                                    <br />
                                    <br />
                                    <Dashboard />
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
                                
                                <Route path='/admin_dashboard/make_delivery'>
                                <div className="category_header">
                                    Make Delivery
                                </div>
                                <br />
                                <br />
                                <br />
                                    <MakeDelivery />
                                </Route>

                                <Route path='/admin_dashboard/delivered_orders'>
                                <div className="category_header">
                                    DELIVERED ORDERS
                                </div>
                                <br />
                                <br />
                                <br />
                                    <DeliveredOrders />
                                </Route>

                                <Route path='/admin_dashboard/order_summary'>
                                <div className="category_header">
                                    Order Summary
                                </div>
                                <br />
                                <br />
                                <br />
                                    <OrderSummary />
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
                                <Route exact path='/admin_dashboard/users'>
                                <div className="category_header">
                                    MANAGE USERS
                                </div>
                                <br />
                                <br />
                                <br />
                                    <AddUsers />
                                    <br />
                                    <UsersTable />
                                </Route>
                                <Route path='/admin_dashboard/users/:id'>
                                <div className="category_header">
                                    EDIT USER CREDENTIALS
                                </div>
                                <br />
                                <br />
                                <br />
                                    <EditUsers />
                                </Route>
                            </Switch>
                        
                            }
                            {!loading && !loggedIn &&
                                <AdminLogin />
                            }

                        </div>
     );
}
 
export default AdminDash;