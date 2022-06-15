import './index.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Categories from './Categories';

const AdminDash = () => {
    return (
                <div className="admin_main">
                    
                    <Router>
                        <Switch>
                            <Route path='/admin_dashboard/categories'>
                            <div className="category_header">
                                CATEGORIES
                            </div>
                                <Categories />
                            </Route>
                            <Route path='/admin_dashboard/items'>
                            <div className="category_header">
                                ITEMS
                            </div>
                                items
                            </Route>
                            <Route path='/admin_dashboard/orders'>
                            <div className="category_header">
                                ORDERS
                            </div>
                                orders
                            </Route>
                            <Route path='/admin_dashboard/profile'>
                            <div className="category_header">
                                MANAGE MY PROFILE
                            </div>
                                profile
                            </Route>
                            <Route path='/admin_dashboard/users'>
                            <div className="category_header">
                                MANAGE USERS
                            </div>
                                users
                            </Route>
                        </Switch>
                    </Router>
                </div>
        
     );
}
 
export default AdminDash;