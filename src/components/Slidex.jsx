
import Slider from "react-slick";
import img from "../assets/banner 9.png"
import imga from "../assets/3.jpg"
import imgs from "../assets/banner 8.png"

function Slidex() {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    swipeToSlide: true,
  };


  return (
    <div className="slider-container bg-white rounded-3xl w-[90%] ml-[140px] ">
      <Slider {...settings} className="m-8 justify-center items-center ">
        <div > 
          <div>
            <img src={img} alt="" className="w-[700px]  rounded-xl" />
          </div>
        </div>

        <div>
          <div >
            <img src={imga} alt="" className=" w-[700px]  rounded-xl" />
          </div>
        </div>

        <div>
          <div >
            <img src={imgs} alt="" className="w-[700px] rounded-xl" />
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Slidex;
