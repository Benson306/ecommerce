import $ from 'jquery'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';

import ListCategories from './clientComponents/ListCategories';
import Search from './clientComponents/Search';
import Nav from './Nav/Nav';
import Preview from './clientComponents/Preview';
import TopProducts from './clientComponents/TopProducts';
import Login from './clientComponents/Login';
import Register from './clientComponents/Register';

const Home = () => {
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

    return ( 
        <div class="home">
            

            <Nav />
            <br />
            <br />
            <br />
            <br />
            <Router>
            <Switch>

                <Route exact path='/'>

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

            <Route path='/Register'>
              <div className="home">
                  <Nav />
                  <br />
                  <br />
                  <br />
                  <br />
                <Register />
              </div>
              </Route>

                <Route path='/preview/:id'>
                    <Preview />
                </Route>

                <Route path='*'>
                    404 Not Found
                </Route>

            </Switch>
        </Router>
            
            
            
        </div>
        
     );
}
 
export default Home;