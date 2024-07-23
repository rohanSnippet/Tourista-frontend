import React, { useEffect, useRef, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";
import { baseUrl } from "../../URL";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const menuRef = useRef(null);
  //load data
  useEffect(() => {
    //fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/menus`);
        const data = await response.json();
        //console.log(Data);
        setMenu(data);
        setFilteredItems(data);
        console.log(data);
      } catch (error) {
        console.log("Error Fetching data", error);
      }
    };
    //calling the function
    fetchData();
  }, []);

  // Function to scroll to the menu section
  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  // filtering data based on category

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category.includes(category));

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // show all data function
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  //sorting based on A-Z ,Z-A, Low-High pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    //logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // code block
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Menu banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col justify-center items-center gap-8 -mt-10">
          {/* text */}
          <div className="text-center mt-24">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
              For The Love of
              <span className="text-pink-600"> Travelling</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] md:w-4/5 mx-auto ">
              Embark on unforgettable journeys
            </p>
            <br></br>
            <button
              onClick={scrollToMenu}
              className="bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 shadow-lg shadow-pink-500/50 px-8 py-3 font-semibold text-white rounded-full"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop sections */}
      <div className="section-container" ref={menuRef}>
        {/* filtering and sorting */}
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* all category buttons */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("beach")}
              className={selectedCategory === "beach" ? "active" : ""}
            >
              Beaches
            </button>
            <button
              onClick={() => filterItems("forest")}
              className={selectedCategory === "forest" ? "active" : ""}
            >
              Forests
            </button>
            <button
              onClick={() => filterItems("hill")}
              className={selectedCategory === "hill" ? "active" : ""}
            >
              Heritage
            </button>
            <button
              onClick={() => filterItems("heritage")}
              className={selectedCategory === "heritage" ? "active" : ""}
            >
              Hills
            </button>
            <button
              onClick={() => filterItems("statetour")}
              className={selectedCategory === "statetour" ? "active" : ""}
            >
              State Tours
            </button>
          </div>

          {/*sorting base filtering */}

          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <FaFilter className="h-4 w-4 text-white" />
            </div>

            {/* sorting options */}
            <select
              name="sort"
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low-To-High</option>
              <option value="high-to-low">High-To-Low</option>
            </select>
          </div>
        </div>

        {/* products card */}
        <div className="grid md:grid-cols-3 md:gap-8 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Pagination section */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1
                ? "bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
