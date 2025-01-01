import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MdManageAccounts } from "react-icons/md";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import userlogo from "/user.png";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  //const token = localStorage.getItem("access-token");
  //console.log(token);
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users`);
      // return response.json();
      return response.data;
    },
  });
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  // console.log(users);
  /* const handleMakeAdmin = (user) => {
    console.log(user);
    axiosSecure
      .patch(`/users/admin/${user._id}`)
      .then((response) => {
        alert(`${user.name} is now Admin`);

        refetch();
      })
      .catch((error) => {
        console.error("Error making admin:", error);
      });
  }; */

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are granting your admin access to this user!!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffcc00",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Make ${user.name} admin`,
      customClass: {
        container: "swal-container",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${user._id}`)
          .then((response) => {
            if (response) {
              Swal.fire({
                title: "Done!",
                text: `${user.name} is now Admin`,
                icon: "success",
              });

              refetch();
            }
          })
          .catch((error) => {
            console.error("Error making admin:", error);
          });

        // window.location.reload();
      }
    });
  };

  //delete user
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00939e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `${user.name} has been deleted.`,
          icon: "success",
        });
      }
    });
    axiosSecure.delete(`/users/${user._id}`).then((response) => {
      // alert(`${user.name}'s account is deleted`);
      refetch();
    });
  };
  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-2">
        <h5 className="bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-300 text-white font-semibold rounded-md pl-2 pt-2 shadow-lg pb-2 pr-2 shadow-cyan-500/50 mb-2 md:mb-0">
          All Users
        </h5>
        <h5 className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 text-white font-semibold rounded-md pl-2 pt-2 pb-2 pr-2 shadow-lg shadow-cyan-500/50">
          Total users: {users.length}
        </h5>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-300 text-white rounded-lg ">
            <tr className="shadow-lg shadow-cyan-500/50 font-semibold text-xl ">
              <th className="h-14">
                <MdManageAccounts className="text-2xl" />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        ) : (
                          <img src={userlogo} />
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="badge badge-ghost badge-md flex bg-gradient-to-r from-cyan-300 to-indigo-300">
                      <MdAdminPanelSettings className="text-lg" />
                      <p className="text-sm">Admin</p>
                    </span>
                  ) : (
                    <button
                      className="badge badge-ghost badge-md flex"
                      onClick={() => handleMakeAdmin(user)}
                    >
                      <FaUsers />
                      <p>User</p>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-xs hover:bg-cyan-400 "
                  >
                    <FaTrashAlt className="text-xl text-cyan-700 hover:text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
