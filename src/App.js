import { BrowserRouter as  Router, Route, Switch } from 'react-router-dom'
import $ from 'jquery';
import 'react-notifications-component/dist/theme.css'


import AdminLogin from './admin/AdminLogin';
import AdminDash from './admin/AdminDash';
import AdminSidebar  from './admin/AdminSidebar';
import { ReactNotifications } from 'react-notifications-component'
import Home from './Home';
import Preview from './clientComponents/Preview';
import Nav from './Nav/Nav';
import Login from './clientComponents/Login';

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

            <Route path='/login'>
              <div className="home">
                  <Nav />
                  <br />
                  <br />
                  <br />
                  <br />
                <Login />
              </div>
            </Route>

            <Route path='/admin_dashboard'>
              <div className="adminDash">
                <AdminSidebar /> 
                <AdminDash />
              </div>

            </Route>
            <div className="home">
                <Nav />
                <br />
                <br />
                <br />
                <br />
                <Route path='/preview/:id'>
                    <Preview />
                </Route>
            </div>
            <Route path='*'>
                    404 Not Found
            </Route>

          </Switch>
          
    </div>
    </Router>
  );
}

export default App;
