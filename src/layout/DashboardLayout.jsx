import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaLocationArrow, FaQuestionCircle, FaUsers } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { MdManageSearch } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import logo1 from "/logo1.png";
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import Login from "../components/Login";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard />
        Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <BiCategory />
        Tours
      </Link>
    </li>
    {/*  <li>
      <Link to="/menu">
        <FaLocationArrow />
        Orders Tracking
      </Link>
    </li> */}
    <li>
      <Link to="/menu">
        <FaQuestionCircle />
        Customer support
      </Link>
    </li>
  </>
);
const DashboardLayout = () => {
  const navigate = useNavigate();
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  return (
    <div>
      {isAdmin ? (
        <div className="drawer sm:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-srart sm:justify-start my-2 shadow-xl shadow-slate-300/50 rounded-lg bg-gradient-to-tl mx-2  from-slate-400/90 via-slate-200 to-slate-100">
            {/* Page content here */}
            <div className="flex items-center justify-between mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button md:hidden lg:hidden"
              >
                <MdDashboardCustomize />
              </label>
              <button className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden">
                <FaRegUser />
                Logout
              </button>
            </div>
            <div className="mt-5  md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link to="/dashboard" className="flex justify-start mb-3">
                  <img src={logo1} alt="" className="w-26 h-10" />
                  <span className="badge badge-primary">Admin</span>
                </Link>
              </li>
              <hr />
              <li className="mt-3">
                <Link to="/dashboard">
                  <MdDashboard />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-bookings">
                  <FaBookmark />
                  Manage Bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-tour">
                  <MdManageSearch />
                  Manage Tours
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-tour">
                  <FaPlusCircle />
                  Add Tour
                </Link>
              </li>
              <li>
                <Link to="/dashboard/users">
                  <FaUsers />
                  All Users
                </Link>
              </li>

              <hr />

              {/* shared nav links */}
              {sharedLinks}
            </ul>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default DashboardLayout;
