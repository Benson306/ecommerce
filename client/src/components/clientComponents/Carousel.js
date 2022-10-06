import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const Carousel = () => {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return ( <div className="carousel">
        <Slider {...settings} style={{width:'40%', marginLeft:'25%'}}>
            <div>
                <img src={require('../../images/add.png')} width='300px'alt="" />
            </div>
            <div>
                <img src={require('../../images/application.png')} width='300px'alt="" />
            </div>
            <div>
                <img src={require('../../images/background.jpg')} width='300px'alt="" />
            </div>
            <div>
            <   img src={require('../../images/cargo.png')} width='300px'alt="" />
            </div>
            <div>
                <img src={require('../../images/delete.png')} width='300px'alt="" />
            </div>
            <div>
            <img src={require('../../images/editing.png')} width='300px'alt="" />
            </div>
        </Slider>

    </div> );
}
 
export default Carousel;