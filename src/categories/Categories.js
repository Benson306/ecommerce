import { useState, useEffect } from 'react';
import '../index.css'
import { Store } from 'react-notifications-component';
import CategoryTable from '../categories/CategoryTable';
import AddCategories from '../categories/AddCategories';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditCategories from '../categories/EditCategories';

const Categories = () => {


    return ( 
        <div className="category">
           
                <Switch>
                    
                    <Route path='/admin_dashboard/categories/:id'>
                        <EditCategories />
                    </Route>
                    
                    <Route path='/admin_dashboard/categories'>
                        <AddCategories />
                        <br />
                        <CategoryTable />
                    </Route> 
                </Switch>
            
            
            <br />
           
        </div>
     );
}
 
export default Categories;