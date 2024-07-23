import React, { useContext, useEffect, useState } from "react";
import logo1 from "/logo1.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import UseCart from "../hooks/UseCart";
import { MdFavoriteBorder } from "react-icons/md";
import { baseUrl } from "../URL";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const { user } = useContext(AuthContext);
  const [cart, refetch] = UseCart();

  // Handle scroll functions
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setSticky(offset > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    if (searchValue !== "") {
      fetch(`${baseUrl}/menus`)
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((item) =>
            item.name.toLowerCase().startsWith(searchValue)
          );
          setSuggestions(filtered);
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (item) => {
    setSearch(""); // Clear the input field
    setSuggestions([]); // Hide suggestions list
    setIsFocused(false); // Collapse the input field
  };

  // Handle input focus
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Handle clicks outside the search input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li tabIndex={0}>
        <a href="/menu">Menu</a>
      </li>
      <li>
        <a href="/about-us">About us</a>
      </li>
      <li>
        <a href="/contact">Contact</a>
      </li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out">
      <div
        className={`navbar xl:px-24 ${isSticky ? "shadow-md bg-base-100" : ""}`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <a href="/">
            <img className="logo-img" src={logo1} alt="Logo" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end relative">
          {/* Search button with input */}
          <div className="search-container relative">
            <button
              className={`btn btn-ghost btn-circle search-button ${
                isFocused ? "hidden" : ""
              }`}
              onClick={() => setIsFocused(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <input
              type="text"
              className={`search-input absolute right-0 top-0 mt-2 h-10 p-2 rounded border border-gray-300 transition-all duration-300 ${
                isFocused ? "expanded" : "collapsed"
              }`}
              placeholder="Search..."
              onChange={handleSearch}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={search}
            />
            {/* Suggestions */}
            {isFocused && suggestions.length > 0 && (
              <ul className="suggestions-list absolute right-0 top-12 mt-2 border border-gray-300 bg-white shadow-lg rounded">
                {suggestions.map((item) => (
                  <li
                    key={item._id}
                    onClick={() => handleSuggestionClick(item)}
                    className="p-2 hover:bg-gray-200 cursor-pointer border-b-2 border-gray-200"
                  >
                    <Link to="/package-overview" state={{ item }}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart items */}
          <Link to="cart-page">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle mr-3 lg:flex items-center justify-center hidden"
            >
              <div className="indicator">
                <MdFavoriteBorder className="text-2xl" />
                <span className="badge badge-xs badge-primary indicator-item">
                  {cart.length}
                </span>
              </div>
            </label>
          </Link>

          {/* Login button */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-300 px-8 py-3 font-semibold hover:text-slate-700 hover:shadow-indigo-500/50 hover:shadow-lg rounded-full text-white flex items-center gap-2"
            >
              <FaRegUser /> Login
            </button>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
