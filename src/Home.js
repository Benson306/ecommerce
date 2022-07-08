import ListCategories from './clientComponents/ListCategories';
import Search from './clientComponents/Search';
import Nav from './Nav/Nav';
import $ from 'jquery'
import TopProducts from './clientComponents/TopProducts';


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
                </div>
                
                
            </div>
            
        </div>
        
     );
}
 
export default Home;