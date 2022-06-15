import AdminLogin from './AdminLogin';
import { BrowserRouter as  Router, Route, Switch } from 'react-router-dom'
import AdminDash from './AdminDash';
import AdminSidebar  from './AdminSidebar';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


function App() {
  return (
    <Router>
    <div className="App">
    <ReactNotifications />
        
          <Switch>

            <Route path='/admin'>
                <AdminLogin />
            </Route>

            <Route path='/admin_dashboard'>
              <div className="adminDash">
                <AdminSidebar />
                    
                <AdminDash />
              </div>
                
            </Route>


          </Switch>
          
        
      
      
    </div>
    </Router>
  );
}

export default App;
