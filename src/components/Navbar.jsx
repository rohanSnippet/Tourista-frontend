import React, { useContext } from "react";
import logo1 from "/logo1.png";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import UseCart from "../hooks/UseCart";
import { MdFavoriteBorder } from "react-icons/md";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);

  const { user, loading } = useContext(AuthContext);
  console.log(user);

  const [cart, refetch] = UseCart();
  // console.log(cart);

  //handle scroll functions
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
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
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transitions-all duration-300 ease-in-out">
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-base-100 transitions-all duration-300 ease-in-out"
            : ""
        }`}
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
            <img className="logo-img" src={logo1} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {/* search button */}
          <button className="btn btn-ghost btn-circle hidden lg:flex">
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

          {/* cart items */}
          <Link to="cart-page">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle mr-3 lg:flex item-center justify-center hidden"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {/*  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  /> */}
                  <MdFavoriteBorder className="text-2xl" />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item">
                  {cart.length}
                </span>
              </div>
            </label>
          </Link>
          {/* login button */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-300 px-8 py-3 font-semibold hover:text-slate-700 hover:shadow-indigo-500/50 hover:shadow-lg rounded-full text-white flex item-center gap-2"
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
