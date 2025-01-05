import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { baseUrl } from "../URL";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};

const SpecialPackages = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);

  /****************** work pending in menu.json in public folder *************************/

  useEffect(() => {
    fetch(`${baseUrl}/menus`) // wtbd
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) =>
          item.category.includes("popular")
        );
        //console.log(specials);
        setRecipes(specials); // wtbd
      });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="section-container my-20  relative">
      <div className="text-left">
        <p className="subtitle">Discover Our Popular Tour Packages</p>
        <h2 className="title md:w-[520px]"> Special Packages</h2>
      </div>
      {/* arrow buttons */}
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn p-2 rounded-full ml-5 hover:bg-green"
        >
          <FaAngleLeft className="w-8 h-8 p-1" />
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="btn p-2 rounded-full ml-5 hover:bg-green"
        >
          <FaAngleRight className="h-8 w-8 p-1" />
        </button>
      </div>
      {/* slider */}
      {recipes && recipes.length > 0 ? (
        <Slider
          ref={slider}
          {...settings}
          className="overflow-hidden mt-10 space-x-5"
        >
          {recipes.map((item, i) => (
            <Cards className="md:justify-around" key={i} item={item} />
          ))}
        </Slider>
      ) : (
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="flex w-72 flex-col gap-4" key={index}>
              <div className="skeleton h-64 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-[90%] mb-6"></div>
              <div className="flex flex-row items-center justify-between">
                <div className="skeleton h-4 w-24 text-start"></div>
                <div className="skeleton h-11 w-24 text-end"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialPackages;
