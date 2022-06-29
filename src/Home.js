import ListCategories from './clientComponents/ListCategories';
import Search from './clientComponents/Search';
import Nav from './Nav/Nav';


const Home = () => {
    return ( 
        <div class="home">
            <Nav />
            <br />
            <br />
            <br />
            <br />
            <div className="banner">
                <div className="list">
                    <ListCategories />
                </div>
                <div className="carou">
                    <Search />
                </div>
                
            </div>
            
        </div>
        
     );
}
 
export default Home;