import React from "react";
import useMenu from "../../../hooks/useMenu";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageTour = () => {
  const [menu, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDeleteTour = (item) => {
    console.log(item);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "indigo-500",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/menus/${item._id}`);
          refetch();
          if (response) {
            Swal.fire({
              title: "Deleted!",
              text: "Tour has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          console.error("Error deleting tour:", error);
          /*   Swal.fire({
            title: "Error",
            text: "Failed to delete the tour.",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          }); */
        }
      }
    });
  };

  return (
    <div className="w-full md:w-[1090px] px-4 mx-auto">
      {" "}
      <h2 className="text-2xl font-semibold my-4 ">
        Manage All{" "}
        <span className="font-bold text-indigo-600">Tour Packages</span>
      </h2>
      {/* tour packages*/}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-semibold text-xs">
              <th>
                <label>#</label>
              </th>
              <th>Tour</th>
              <th>Description</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {menu.map((item, index) => (
              <tr key={index}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {item.recipe}
                  <br />
                  {/* <span className="badge badge-ghost badge-sm">
                    {tour.Days}
                  </span> */}
                </td>
                <td>
                  <span className="text-amber-800">&#x20B9;</span>
                  {item.price}
                </td>
                <th>
                  <Link
                    to={`/dashboard/update-tour/${item._id}`}
                    className="btn btn-ghost btn-xs text-xl hover:bg-indigo-300"
                  >
                    <FaRegEdit />
                  </Link>
                </th>
                <th>
                  <button
                    onClick={() => handleDeleteTour(item)}
                    className="btn btn-ghost btn-xs text-xl hover:bg-pink-300"
                  >
                    <MdOutlineDeleteForever />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default ManageTour;
