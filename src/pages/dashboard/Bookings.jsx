import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import emptyBox from "/empty-box.png";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { baseUrl } from "../../URL";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("access-token");
  //console.log(token);
  const { refetch, data: booking = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/bookings?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // console.log(booking);
      return response.json();
    },
  });

  //handle delete
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFB300",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `Transaction for ${item.tour_info[0].name} deleted.`,
          icon: "success",
        });
      }
      axiosSecure.delete(`/bookings/del/${item._id}`);
      refetch();
    });
  };
  if (booking.length === 0) {
    return (
      <div className="section-container mt-32 mx-auto flex items-center justify-center mb-20">
        <div className="mx-auto ml-84 items-center">
          <img
            src={emptyBox}
            style={{ width: 250 }}
            className="ml-32 mb-3 mt-5"
            alt=""
          />
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
            No Tours
            <span className="text-amber-300">Booked</span>
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
              Your Travel Story
              <span className="text-amber-400"> Unfolds</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] ml-4 mt-1">
              Discover Your Booked Adventures here
            </p>
          </div>
        </div>
      </div>

      {/* table for the cart */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-gradient-to-r  shadow-amber-500/50 from-amber-400 via-amber-300 to-amber-200 text-white rounded-md shadow-xl">
              <tr className="text-lg">
                <th>#</th>
                <th>Transaction ID</th>
                <th>Package</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {Array.isArray(booking) &&
                booking.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="font-medium badge bg-amber-300 bg-opacity-40 mt-6">
                      {item.transaction_id}
                    </td>
                    <td>
                      <p className="font-semibold">{item.tour_info[0].name} </p>
                      <span className="badge badge-md badge-ghost rounded-full ">
                        {item.tour_info[0].Days.length} Days Tour
                      </span>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-">
                        &#x20B9; {item.price}
                      </button>
                    </th>
                    <th>
                      <button
                        className="btn btn-ghost text-red btn-xl"
                        onClick={() => handleDelete(item)}
                      >
                        cancel
                      </button>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* name */}
      <div className="mb-10">
        {/* user && <span>{user.displayName}</span> */}
      </div>
    </div>
  );
};

export default Bookings;
