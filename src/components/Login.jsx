import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";
import Swal from "sweetalert2";
import { baseUrl } from "../URL";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, login, updateUserProfile } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  //redirecting to home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    login(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };

          axios.post(`${baseUrl}/users`, userInfo).then((response) => {
            console.log(response);
            alert(`Welcome ${data.name}`);
            navigate(from, { replace: true });
            if (response) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            setShowModal(false);
          });
        });
        // document.getElementById("my_modal_5").close();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //setErrorMessage(errorMessage);
        console.log(errorMessage);
      });
    reset();
  };

  //login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/users", userInfo).then((response) => {
          console.log(response);
          alert(`Welcome ${data.name}`);
          navigate(from, { replace: true });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          setShowModal(false);
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action mt-0  flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg"> Please Login</h3>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label mt-1">
              <Link to="/forgot" className="label-text-alt link link-hover">
                Forgot password?
              </Link>
            </label>
          </div>

          {/* error text */}
          {errorMessage ? (
            <p className="text-red text-xs italic">{errorMessage}</p>
          ) : (
            ""
          )}
          {/* Login */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
            />
          </div>

          <p className="text-center my-2">
            Don't have an account?{" "}
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="underline text-red ml-1"
            >
              Sign Up
            </button>
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>
        {/* social sign in */}
        <div className="text-center space-x-3 mb-5">
          <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-green"
          >
            <FcGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green">
            <FaXTwitter />
          </button>
          <button className="btn btn-circle hover:bg-green">
            <SiGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
