import React, { useRef } from "react";
import Stars from "./Stars";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiCoffeeCup } from "react-icons/gi";
import { FaUtensils } from "react-icons/fa";
import { FaPizzaSlice } from "react-icons/fa";
import { TbBus } from "react-icons/tb";
import { RiHotelLine } from "react-icons/ri";
import { GiMeal } from "react-icons/gi";
import { FcBinoculars } from "react-icons/fc";
import { TbMoodEmpty } from "react-icons/tb";
import { GiByzantinTemple } from "react-icons/gi";
import { FaScrewdriver } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { TbTrekking } from "react-icons/tb";
import { GiSailboat } from "react-icons/gi";
import { MdOutlineHouseboat } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Terms from "./Terms";

const PackageOverview = (props) => {
  const location = useLocation();
  const item = location.state?.item;
  const navigate = useNavigate();

  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const bottomRef = useRef(null);

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [showGlow, setShowGlow] = useState(false);
  const [priceAdult, setPriceAdult] = useState(0);
  const [priceChildren, setPriceChildren] = useState(0);

  const incrementAdults = () => {
    setAdults(adults + 1);
    setPriceAdult(adults * item.price);
  };

  const decrementAdults = () => {
    if (adults > 0) {
      setAdults(adults - 1);
      if (priceAdult > 0) setPriceAdult(priceAdult - item.price);
    }
  };

  const incrementChildren = () => {
    setChildren(children + 1);
    setPriceChildren(children * item.price);
  };

  const decrementChildren = () => {
    if (children > 0) {
      setChildren(children - 1);
      if (priceChildren > 0) setPriceChildren(priceChildren - item.price);
    }
  };

  const toggleAccordion = () => {
    setIsAccordionExpanded(!isAccordionExpanded);
    if (!isAccordionExpanded && bottomRef.current) {
      const yOffset = -150;
      window.scrollTo({
        top: bottomRef.current.offsetTop + yOffset,
        behavior: "smooth",
      });
    }
    setShowGlow(true);
  };

  //useEffect when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //useEffect
  useEffect(() => {
    let timer;
    if (showGlow) {
      timer = setTimeout(() => {
        setShowGlow(false);
      }, 3000); // Adjust the duration as needed (1000ms = 1 second)
    }
    return () => clearTimeout(timer);
  }, [showGlow]);

  //confirm travellers
  const handleConfirmTravellers = () => {
    if (!children && !adults) {
      alert("Add Traveller First!!");
    } else {
      navigate("/add-travellers", {
        state: {
          adults: adults,
          children: children,
          item: item,
        },
      });
    }
  };
  const stars = parseFloat(item.stars?.$numberDecimal);

  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);

  const handleAccordionToggle = (index) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const MealIcon = ({ meal }) => {
    if (meal === "Breakfast") {
      return <GiCoffeeCup />;
    } else if (meal === "Lunch") {
      return <FaUtensils />;
    } else if (meal === "Dinner") {
      return <FaPizzaSlice />;
    } else {
      return null; // Return null for meals other than breakfast, lunch, and dinner
    }
  };

  const iconMapping = {
    Hotel: <RiHotelLine />,
    Meals: <GiMeal />,
    Transport: <TbBus />,
    SightSeeing: <FcBinoculars />,
    HouseboatStay: <MdOutlineHouseboat />,
    TempleVisit: <GiByzantinTemple />,
    RiverRafting: <FaScrewdriver />,
    Camping: <GiCampingTent />,
    Trekking: <TbTrekking />,
    Boating: <GiSailboat />,
    default: <TbMoodEmpty />,
  };

  return (
    <div>
      {" "}
      <div className="mx-auto mt-32 max-w-5xl px-5 py-12">
        {/* ***************upper section  */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 lg:pr-10">
            {/* <p>{tour_id}</p> */}
            {item && item.image && (
              <img
                alt=""
                className="h-64 lg:h-96 w-full object-cover rounded-lg shadow-md mb-6 lg:mb-0"
                src={item.image}
              />
            )}
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2 lg:pl-10">
            <div className="text-xl lg:text-xl badge badge-ghost max-h-64  text-white font-semibold bg-slate-500">
              Tour Includes
            </div>
            <div className="flex items-center justify-between mb-4">
              {item.tour_includes.map((tour_includes, index) => (
                <span
                  key={index}
                  className="mt-3 rounded-full px-6 flex item-center gap-2"
                >
                  <div className="text-xl">
                    {iconMapping[tour_includes] || iconMapping["default"]}
                  </div>
                  <span className="text-sm ">{tour_includes}</span>
                </span>
              ))}
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              {item ? item.name : "Go to home"}
            </h1>
            <div className="flex items-center mb-4">
              <span className="flex items-center space-x-1">
                <Stars
                  stars={stars}
                  reveiws={item.reveiws}
                  className="text-yellow-500"
                />
                <span className="ml-3 inline-block text-md font-semibold">
                  {item.reveiws} Customer Reviews
                </span>
              </span>
            </div>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              {item.recipe}
            </p>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-bold text-gray-900">
                ₹{item.price} / Person
              </span>
              <button
                onClick={toggleAccordion}
                type="button"
                className=" btn inline-block px-10 py-3 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 shadow-gray-500/50 rounded-full text-white text-sm font-bold shadow-lg hover:shadow-xl hover:shadow-gray-500/30 hover:bg-gradient-to-r hover:from-gray-600 hover:via-gray-500 hover:to-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ***************Accordion section */}
      <div
        ref={bottomRef}
        className="flex flex-col lg:flex-row items-center justify-center lg:justify-center "
      >
        {" "}
        {/* Accordion content */}
        {isAccordionExpanded && (
          <div className="w-full lg:w-1/2 lg:pl-10 mr-8 text-center">
            <div
              className={`lg:flex text-xl lg:text-xl max-h-72 mx-9 rounded-lg text-white font-semibold shadow-2xl shadow-purple-300 py-2 px-56 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-500`}
            >
              <p className="ml-5 ">Add Travellers</p>
            </div>
            <div
              className={`bg-white rounded-lg p-6 mt-6 shadow-purple-300 shadow-xl ${
                showGlow ? "glow-effect zoom-out-animation" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-xl font-semibold">Adults</div>
                <div className="flex items-center">
                  <button
                    onClick={decrementAdults}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:text-white hover:font-semibold hover:bg-gradient-to-r hover:from-blue-300 hover:to-indigo-600"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={adults}
                    required
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg w-16 text-center"
                  />
                  <button
                    onClick={incrementAdults}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg ml-2 hover:text-white hover:font-semibold hover:bg-gradient-to-r hover:from-blue-300 hover:to-indigo-600"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">Children</div>
                <div className="flex items-center">
                  <button
                    onClick={decrementChildren}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:text-white hover:font-semibold hover:bg-gradient-to-r hover:from-blue-300 hover:to-indigo-600"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={children}
                    required
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg w-16 text-center"
                  />
                  <button
                    onClick={incrementChildren}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg ml-2 hover:text-white hover:font-semibold hover:bg-gradient-to-r hover:from-blue-300 hover:to-indigo-600"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleConfirmTravellers}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 mt-6 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:shadow-outline"
              >
                Confirm Travellers
              </button>
            </div>
          </div>
        )}
      </div>
      {/*********  iternary section*/}
      <div className="mx-auto max-w-5xl px-5 py-2 mt-5">
        <h4 className="text-3xl font-semibold mb-6">Itinerary</h4>
        <div className="space-y-4">
          {item.Days.map((day, index) => (
            <div
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl"
              key={index}
            >
              <input
                type="radio"
                name={`my-accordion-${index}`}
                id={`accordion-${index}`}
                checked={openAccordionIndex === index}
                onChange={() => handleAccordionToggle(index)}
                className="hidden"
              />
              <label
                className="block cursor-pointer px-6 py-4 text-xl shadow-xl shadow-gray-500/50 text-white font-semibold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400  relative"
                htmlFor={`accordion-${index}`}
              >
                <span className="flex justify-between items-center">
                  <FaLocationDot />
                  {`Day ${index + 1}: ${item.name} -- ${day.places.join(", ")}`}
                  <span
                    className={`transform transition-transform ${
                      openAccordionIndex === index ? "rotate-180" : "rotate-0"
                    } w-6 h-6 text-white`}
                  >
                    {openAccordionIndex === index ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </span>
                </span>
              </label>
              <div
                className={`p-6 transition-all duration-300 ${
                  openAccordionIndex === index
                    ? "max-h-96"
                    : "max-h-0 overflow-hidden"
                }`}
              >
                <p className="text-gray-800 mb-4 max-h-24 rounded-md  px-4 bg-gradient-to-l from-slate-300 to-slate-200 shadow-inner font-semibold py-4 shadow-slate-200">
                  {day.description}
                </p>
                <p>
                  <span className="text-lg font-medium badge badge-ghost rounded-full">
                    Meals
                  </span>{" "}
                  {day.meals.map((meal, index) => (
                    <span key={index} className="flex text-lg mt-2">
                      {" "}
                      <MealIcon meal={meal} className="py-3" /> &nbsp;&nbsp;
                      {meal}
                      {index !== day.meals.length - 1}
                    </span>
                  ))}
                </p>
                <hr />
                <p className="text-gray-800 mt-5 ">
                  <span className="text-lg font-medium badge badge-ghost rounded-full">
                    Places
                  </span>
                  &nbsp;&nbsp;{day.places.join(" | ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Terms and conditions */}
      <div className="mx-auto max-w-5xl px-5 py-2 mt-20">
        <h4 className="text-3xl font-semibold mb-6">Terms and Conditions</h4>
        <div className="space-y-4">
          <Terms />
        </div>
      </div>
    </div>
  );
};

export default PackageOverview;
