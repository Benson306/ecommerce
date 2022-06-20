import AdminLogin from './admin/AdminLogin';
import { BrowserRouter as  Router, Route, Switch } from 'react-router-dom'
import AdminDash from './admin/AdminDash';
import AdminSidebar  from './admin/AdminSidebar';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Datatable from './Datatable/Datatable'
import Home from './Home';
import Categories from './categories/Categories';
import Nav from './Nav/Nav'
import FileUpload from './FileUpload';

function App() {
  return (
    <Router>
    <div className="App">
    <ReactNotifications />
        
          <Switch>

            <Route exact path='/'>
              <Home />

            </Route>

            <Route path='/images'>
              <FileUpload />
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
            <Route path='/datatable'>
              <Datatable />
            </Route>

          </Switch>
          
        
      
      
    </div>
    </Router>
  );
}

export default App;
