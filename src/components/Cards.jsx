import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import UseCart from "../hooks/UseCart";
import { baseUrl } from "../URL";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id, stars, reveiws } = item;

  const [isHeartFillted, setIsHeartFillted] = useState(false);
  const { user } = useContext(AuthContext);
  // console.log(user);
  const [cart, refetch] = UseCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (item) => {
    //console.log("button is clicked", item);

    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        recipe,
        quantity: 1,
        image,
        price,
        email: user.email,
        stars,
        reveiws,
      };
      //console.log(cartItem);
      fetch(`${baseUrl}/carts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.name) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Added to Favorites",
              showConfirmButton: false,
              timer: 1500,
            });
            setIsHeartFillted(!isHeartFillted);
            refetch();
          }
        });
    } else {
      Swal.fire({
        title: "Please Login?",
        text: "Without an account can't be able to add products",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  const handleHeartClick = () => {
    // setIsHeartFillted(!isHeartFillted);
  };

  return (
    <div
      style={{ width: "18rem", height: "28rem" }}
      className="relative bg-base-100 shadow-xl"
    >
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${
          isHeartFillted ? "text-rose-500" : "text-white"
        }`}
        onClick={() => handleAddToCart(item)}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to="/package-overview" state={{ item: item }}>
        <figure style={{ height: "16rem" }}>
          <img
            src={item.image}
            alt=""
            className="hover:scale-105 transition-all duration-200 object-cover rounded-t-xl w-full h-full"
          />
        </figure>
      </Link>
      <div className="card-body" style={{ height: "12rem" }}>
        <Link to="/package-overview">
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>{item.recipe.split(" ").slice(0, 5).join(" ") + "..."}</p>
        <div className="card-actions justify-end item-center">
          <h5 className="font-semibold">
            <span className="text-sm text-red">&#x20B9;</span>
            {item.price}
          </h5>
          <Link
            to="/package-overview"
            state={{ item: item }}
            className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:text-slate-900"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
