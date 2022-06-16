import AdminLogin from './AdminLogin';
import { BrowserRouter as  Router, Route, Switch } from 'react-router-dom'
import AdminDash from './AdminDash';
import AdminSidebar  from './AdminSidebar';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Datatable from './Datatable'
import Home from './Home';
import Categories from './Categories';


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
            <Route path='/datatable'>
              <Datatable />
            </Route>

          </Switch>
          
        
      
      
    </div>
    </Router>
  );
}

export default App;
