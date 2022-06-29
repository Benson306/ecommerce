import ListCategories from './clientComponents/ListCategories';
import Carousel from './clientComponents/Carousel';
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
                    <Carousel />
                </div>
                
            </div>
            
        </div>
        
     );
}
 
export default Home;