import { BrowserRouter as  Router, Route, Switch } from 'react-router-dom'
import $ from 'jquery';
import 'react-notifications-component/dist/theme.css'


import AdminLogin from './admin/AdminLogin';
import AdminDash from './admin/AdminDash';
import AdminSidebar  from './admin/AdminSidebar';
import { ReactNotifications } from 'react-notifications-component'
import Home from './Home';

function App() {


  return (
    <Router>
    <div className="App">
    <ReactNotifications />
        
          <Switch>
            <Route exact path='/'>
                <Home />
            </Route>

            <Route path='/admin'>
                <AdminLogin />
            </Route>

            <Route path='/admin_dashboard'>
              <div className="adminDash">
                <AdminSidebar /> 
                <AdminDash />
              </div>

            </Route>

            <Route exact path='*'>
                    404 Not Found
                </Route>

          </Switch>
          
    </div>
    </Router>
  );
}

export default App;
