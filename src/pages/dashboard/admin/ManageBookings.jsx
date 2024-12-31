import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdAirplaneTicket } from "react-icons/md";
import emptyBox from "/empty-box.png";
import { FaTrashAlt } from "react-icons/fa";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/bookings/all`);

      console.log(response); // Verify the data structure
      return response.data;
    },
  });

  const handleCancelTransaction = (transaction) => {
    axiosSecure.delete(`/bookings/del/${transaction._id}`).then((res) => {
      console.log(res);
      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Transaction Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    refetch();
  };

  if (bookings.length == 0)
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

  return (
    <div>
      <div>
        <div className="mx-4 md:mx-14">
          <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
            <h5
              className="manageorder font-semibold rounded-md pl-3 pt-2 shadow-lg shadow-lime-500/70 text-center"
              style={{ width: 120, height: 40 }}
            >
              All Bookings
            </h5>
            <h5
              className="manageorder font-semibold rounded-md pl-3 pt-2 shadow-lg shadow-lime-500/70 text-center"
              style={{ width: 160, height: 40 }}
            >
              Total Bookings: {bookings.length}
            </h5>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              {/* head */}
              <thead className="manageorder rounded-lg">
                <tr className="shadow-lg shadow-lime-500/70 font-semibold text-base md:text-xl">
                  <th className="h-14 w-10">
                    <label>
                      <MdAirplaneTicket />
                    </label>
                  </th>
                  <th className="text-sm md:text-base">User</th>
                  <th className="text-sm md:text-base">Transaction ID</th>
                  <th className="text-sm md:text-base">Price</th>
                  <th className="text-sm md:text-base">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(bookings) &&
                  bookings.map((transaction, index) => (
                    <tr key={index} className="text-sm md:text-base">
                      <th>
                        <label>{index + 1}</label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold truncate">
                              {transaction.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="truncate">{transaction.transaction_id}</td>
                      <td>
                        <span className="badge badge-ghost badge-md flex bg-gradient-to-r from-lime-300 to-lime-100">
                          <button className="font-semibold">
                            &#x20B9; {transaction.price}
                          </button>
                        </span>
                      </td>
                      <th>
                        <button
                          onClick={() => handleCancelTransaction(transaction)}
                          className="btn btn-ghost btn-xs hover:bg-cyan-400"
                        >
                          <FaTrashAlt className="text-xl text-lime-700 hover:text-white" />
                        </button>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
