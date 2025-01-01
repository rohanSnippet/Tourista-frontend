import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import Swal from "sweetalert2";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffcc00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      customClass: {
        container: "swal-container",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire({
          title: "Done!",
          text: "Your have been logged out successfully.",
          icon: "success",
        });
        window.location.reload();
      }
    });
    /* logOut()
      .then(() => {
        alert("Logged out Successfully");
        window.location.reload();
      })
      .catch((error) => {
        //handle error
      }); */
  };
  console.log(user.photoURL);
  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar tooltip tooltip-bottom "
            data-tip="Profile"
          >
            <div className="w-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  onError={(e) => {
                    e.target.src = "/path-to-default-image.png";
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <CiUser size={48} className="text-gray-500" />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <a href="/bookings">Bookings</a>
            </li>
            {/*   <li>
              <a>Settings</a>
            </li> */}
            <li>
              <a href="dashboard">Dashboard</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
