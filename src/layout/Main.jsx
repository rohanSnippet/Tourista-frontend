import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

export const Main = () => {
  const { loading } = useContext(AuthContext);
  return (
    <div className="#ffffff">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {" "}
          <Navbar />
          <div>
            <Outlet className="min-h-screen" />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Main;
