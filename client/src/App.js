import { BrowserRouter as  Router, Route, Switch} from 'react-router-dom'
import $ from 'jquery';
import 'react-notifications-component/dist/theme.css';


import AdminLogin from './components/admin/AdminLogin';
import AdminDash from './components/admin/AdminDash';
import AdminSidebar  from './components/admin/AdminSidebar';
import { ReactNotifications } from 'react-notifications-component'
import Preview from './components/clientComponents/Preview';
import Nav from './components/Nav/Nav';
import Login from './components/clientComponents/Login';
import Register from './components/clientComponents/Register';
import { useEffect, useState } from 'react';
import ListCategories from './components/clientComponents/ListCategories';
import Search from './components/clientComponents/Search';
import LoggedNav from './components/Nav/LoggedNav';
import TopProducts from './components/clientComponents/TopProducts';
import Personal from './components/clientComponents/Personal';
import ProfileSidebar from './components/clientComponents/ProfileSidebar';
import EditPersonal from './components/clientComponents/EditPersonal';
import Delivery from './components/clientComponents/Delivery';
import AddDeliveryAdrr from './components/clientComponents/AddDeliveryAddr';
import EditDeliveryAdrr from './components/clientComponents/EditDeliveryAddr';
import Cart from './components/clientComponents/Cart';
import Summary from './components/clientComponents/Summary';
import Payment from './components/clientComponents/Payment';
import Orders from './components/clientComponents/Orders';
import CompleteSummary from './components/clientComponents/CompleteSummary';
import ProductsByCategory from './components/clientComponents/ProductsByCategory';

 function App() {
  //   $(function(){
  //     // Check the initial Position of the fixed_nav_container
  //     var stickyHeaderTop = $('.list').offset().top;

  //     $(window).scroll(function(){
  //         if( $(document).scrollTop() > stickyHeaderTop - 70 ) {
  //             $('.list').css({position: 'fixed', top: '85px', marginLeft: '2%',width:'20%'});  
  //             $('.topProducts').css({marginLeft:'24%'})
  //         } else {
  //             $('.list').css({position: '', top: '385px', marginLeft: '2%', width:'20%'});  
  //             $('.topProducts').css({marginLeft:'2%'})
  //         }
  //     });
  // });

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  useEffect(()=>{
      const abortCont = new AbortController();

      fetch(`${process.env.REACT_APP_API_URL}/auth`,{credentials: 'include', proxy: true, withCredentials: true})
      .then((res)=>{
        return res.json();
      })
      .then(res => {
        console.log(res)
          if(res === 'success'){
              setLoggedIn(true);
              setLoading(false);
          }else{
              setLoggedIn(false);
              setLoading(false);
          }
      })
      .catch(err=>{
        console.log(err);
      })
      
      
  
      fetch(`${process.env.REACT_APP_API_URL}/admin_auth`,{credentials: 'include', proxy: true, withCredentials: true})
      .then((res)=>{
        return res.json();
      })
      .then(res=>{
        if(res === 'success'){
          setAdminLoggedIn(true);
          setLoadingAdmin(false);
      }else if(res === 'failed'){
          setAdminLoggedIn(false);
          setLoadingAdmin(false);
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
            <Route path='/products/categories/:id'>
                <div className="home">
                    { !loggedIn && <Nav />}
                    { loggedIn && <LoggedNav />}
                    <br />
                    <br />
                    <br />
                    <br /> 
                      <ProductsByCategory />
                </div>
            </Route>
            <Route path='/preview/:id'>
              <div className="home">
                  { !loggedIn && <Nav />}
                  { loggedIn && <LoggedNav />}
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
                    <div className="profile">
                      <div className="left">
                          <ProfileSidebar />
                      </div>
                      <div className="right">
                        <Delivery />
                      </div>
                    </div>
              </div>
            </Route>
            <Route path='/account/add_delivery_addr'>
            <div className="home">
                  <LoggedNav />
                    <br />
                    <div className="profile">
                      <div className="left">
                          <ProfileSidebar />
                      </div>
                      <div className="right">
                        <AddDeliveryAdrr />
                      </div>
                    </div>
              </div>
            </Route>
            <Route path='/account/edit_delivery_addr'>
            <div className="home">
                  <LoggedNav />
                    <br />
                    <div className="profile">
                      <div className="left">
                          <ProfileSidebar />
                      </div>
                      <div className="right">
                        <EditDeliveryAdrr />
                      </div>
                    </div>
              </div>
            </Route>
            <Route path='/account/orders'>
            <div className="home">
                  <LoggedNav />
                  <br />
                    <div className="profile">
                      <div className="left">
                          <ProfileSidebar />
                      </div>
                      <div className="right">
                        <Orders />
                      </div>
                    </div>
              </div>
            </Route>
            <Route path='/cart'>
                      {
                        loading && <div>Loading ...</div>
                      }
                      { !loading && loggedIn && 
                          <div className="home">
                            <LoggedNav />
                              <br />
                              <br />
                              <br />
                            <Cart />
                          </div>
                      
                      }
                      { !loading &&  !loggedIn && <div className="home">
                            <Nav />
                              <br />
                              <br />
                              <br />
                              
                              <Login />
                          </div>
                      }
                
                
            </Route>
            <Route path='/summary'>
                      {
                        loading && <div>Loading ...</div>
                      }
                      { !loading && loggedIn && 
                          <div className="home">
                            <LoggedNav />
                              <br />
                              <br />
                              <br />
                              
                            <Summary />
                          </div>
                      
                      }
                      { !loading &&  !loggedIn && <div className="home">
                            <Nav />
                              <br />
                              <br />
                              <br />
                              
                              <Login />
                          </div>
                      }
                
            </Route>
            <Route path='/view_summary'>
                      {
                        loading && <div>Loading ...</div>
                      }
                      { !loading && loggedIn && 
                          <div className="home">
                            <LoggedNav />
                              <br />
                              <br />
                              <br />
                              
                            <CompleteSummary />
                          </div>
                      
                      }
                      { !loading &&  !loggedIn && <div className="home">
                            <Nav />
                              <br />
                              <br />
                              <br />
                              
                              <Login />
                          </div>
                      }
                
            </Route>
            <Route path='/payment'>
                      {
                        loading && <div>Loading ...</div>
                      }
                      { !loading && loggedIn && 
                          <div className="home">
                            <LoggedNav />
                              <br />
                              <br />
                              <br />
                              
                            <Payment />
                          </div>
                      
                      }
                      { !loading &&  !loggedIn && <div className="home">
                            <Nav />
                              <br />
                              <br />
                              <br />
                              
                              <Login />
                          </div>
                      }
                
            </Route>
            <Route path='/admin'>
                <AdminLogin />
            </Route>

            <Route path='/admin_dashboard'>
              
              {!loadingAdmin && adminLoggedIn && <div className="adminDash">
                <AdminSidebar /> 
                <AdminDash /> </div>
              }
              {!loadingAdmin && !adminLoggedIn && <div>
                <AdminLogin /></div>
              }
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
