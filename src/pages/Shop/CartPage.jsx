import React, { useContext } from "react";
import UseCart from "../../hooks/UseCart";
import { IoTrashOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";
import cartempty from "/cart.png";
import { useEffect } from "react";
import { baseUrl } from "../../URL";

const CartPage = () => {
  const [cart, refetch] = UseCart();
  const { user } = useContext(AuthContext);
  console.log(user);
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      //console.log(result);
      if (result.isConfirmed) {
        fetch(`${baseUrl}/carts/${item._id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            //console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            refetch();
          });
      }
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //if cart empty
  if (cart.length === 0) {
    return (
      <div className="section-container mt-32 mx-auto flex items-center justify-center mb-20">
        <div className="mx-auto ml-84 items-center">
          <img
            src={cartempty}
            style={{ width: 250 }}
            className="ml-32 mb-3 mt-5"
            alt=""
          />
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
            No Tours In
            <span className="text-indigo-500"> Your Wishlist</span>
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container">
      {/* banner */}
      <div className=" bg-gradient-to-r from-[#fafafa] from-0% to-[#FCFCFC] to-100%">
        <div className="py-28 -mt-10 flex flex-col justify-center items-center gap-8">
          {/* text */}
          <div className="px-4 spae-y-7 mt-24">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
              Heres Your Favourite
              <span className="text-indigo-600"> Destinations</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table for the cart */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-gradient-to-r shadow-indigo-500/50 from-indigo-500 via-indigo-400 to-indigo-300 text-white rounded-sm shadow-xl">
              <tr className="text-lg">
                <th>#</th>
                <th>Destination</th>
                <th>Package</th>

                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} />
                        </div>
                      </div>{" "}
                    </div>
                  </td>
                  <td className="font-medium">{item.name}</td>
                  <th>
                    <button className="btn btn-ghost btn-">{item.price}</button>
                  </th>
                  <th>
                    <button
                      className="btn btn-ghost text-red btn-xl"
                      onClick={() => handleDelete(item)}
                    >
                      <IoTrashOutline />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* name */}
      <div>{/* user && <span>{user.displayName}</span> */}</div>
    </div>
  );
};

export default CartPage;
