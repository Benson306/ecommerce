import { Redirect ,BrowserRouter as  Router, Route, Switch } from 'react-router-dom'
import $ from 'jquery';
import 'react-notifications-component/dist/theme.css'


import AdminLogin from './admin/AdminLogin';
import AdminDash from './admin/AdminDash';
import AdminSidebar  from './admin/AdminSidebar';
import { ReactNotifications } from 'react-notifications-component'
import Preview from './clientComponents/Preview';
import Nav from './Nav/Nav';
import Login from './clientComponents/Login';
import Register from './clientComponents/Register';
import { useEffect, useState } from 'react';
import ListCategories from './clientComponents/ListCategories';
import Search from './clientComponents/Search';
import LoggedNav from './Nav/LoggedNav';
import TopProducts from './clientComponents/TopProducts';
import Personal from './clientComponents/Personal';
import ProfileSidebar from './clientComponents/ProfileSidebar';
import EditPersonal from './clientComponents/EditPersonal';

  function App() {
    $(function(){
      // Check the initial Position of the fixed_nav_container
      var stickyHeaderTop = $('.list').offset().top;

      $(window).scroll(function(){
          if( $(document).scrollTop() > stickyHeaderTop - 70 ) {
              $('.list').css({position: 'fixed', top: '85px', marginLeft: '2%',width:'20%'});  
              $('.topProducts').css({marginLeft:'24%'})
          } else {
              $('.list').css({position: '', top: '385px', marginLeft: '2%', width:'20%'});  
              $('.topProducts').css({marginLeft:'2%'})
          }
      });
  });

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
      const abortCont = new AbortController();

      fetch('/auth', {signal: abortCont.signal})
      .then((res)=>{
          if(res.ok){
              setLoggedIn(true);
          }else{
              setLoggedIn(false);
          }
      })

      return () => abortCont.abort();
  },[])

  return (
    <Router>
    <div className="App">
    <ReactNotifications />
        
        <Switch>
          <Route exact path='/'>
            <div class="home">
                    { !loggedIn && <Nav />}
                    { loggedIn && <LoggedNav />}
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="carou">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                            <Search />
                    </div>
                    <br />
                    <div className="banner">
                        <div className="list">
                            <ListCategories />
                        </div>
                        <div className="topProducts">
                            <TopProducts />
                            <br />
                            <br />
                        </div>
                    </div>                
              </div>
            </Route>
            <Route path='/preview/:id'>
              <div className="home">
                  { !loggedIn && <Nav />}
                  { loggedIn && <LoggedNav />}
                  <br />
                  <br />
                  <br />
                  <br />
                  <Preview />
              </div>
            </Route>
            <Route path='/login'>
              <div className="home">
                  { !loggedIn && <Nav />}
                  { loggedIn && <LoggedNav />}
                  <br />
                  <br />
                  <br />
                  <br />
                <Login />
              </div>
            </Route>
            <Route path='/Register'>
              <div className="home">
                  { !loggedIn && <Nav />}
                  { loggedIn && <LoggedNav />}
                  <br />
                  <br />
                  <br />
                  <br />
                <Register />
              </div>
            </Route>
            <Route path='/account/personal'>
              <div className="home">
                  <LoggedNav />
                    <br />
                    <br />
                    <br />
                    <div className="profile">
                      <div className="left">
                          <ProfileSidebar />
                      </div>
                      <div className="right">
                        <Personal />
                      </div>
                    </div>
              </div>
              
            </Route>
            <Route path='/account/edit_personal'>
              <div className="home">
                  <LoggedNav />
                    <br />
                    <br />
                    <br />
                    <div className="profile">
                      <div className="left">
                          <ProfileSidebar />
                      </div>
                      <div className="right">
                          <EditPersonal />
                      </div>
                    </div>
              </div>
              
            </Route>
            <Route path='/account/delivery'>
            <div className="home">
                  <LoggedNav />
                    <br />
                    <br />
                    <br />
                    <div className="profile">
                      <div className="left">
                          <ProfileSidebar />
                      </div>
                      <div className="right">
                        123
                      </div>
                    </div>
              </div>
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
            
            <Route path='*'>
                    404 Not Found
            </Route>

          </Switch>
          
    </div>
    </Router>
  );
}

export default App;
