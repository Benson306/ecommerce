import $ from 'jquery'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';

import ListCategories from './clientComponents/ListCategories';
import Search from './clientComponents/Search';
import Nav from './Nav/Nav';
import LoggedNav from './Nav/LoggedNav';
import Preview from './clientComponents/Preview';
import TopProducts from './clientComponents/TopProducts';
import Login from './clientComponents/Login';
import Register from './clientComponents/Register';
import { useEffect, useState } from 'react';

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

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        const abortCont = new AbortController;

        fetch('/auth', {signal: abortCont.signal})
        .then((res)=>{
            if(res.ok){
                setLoggedIn(true);
            }else{
                setLoggedIn(false);
            }
        })

        return () => abortCont.abort();
    },[loggedIn])

    return ( 
        <div class="home">
            

            { !loggedIn && <Nav />}
            { loggedIn && <LoggedNav />}
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
                    <Login />
                </Route>

                <Route path='/Register'>
                    <Register />
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