import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, login, signUpWithGithub } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();

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

  /*  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    console.log(email, "   ", password);
    login(email, password)
      .then((result) => {
       
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((response) => {
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
          });
        });
        window.location.reload("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    //console.log(email, password);

    login(email, password)
      .then((response) => {
        console.log(response);
        if (response) {
          Toast.fire({
            icon: "success",
            title: `Welcome ${response.user.displayName}`,
          });
        }
      })
      .then(() => document.getElementById("my_modal_5").close())
      .catch((error) => {
        console.error("Error:", error.toString().substring(37, 56));

        if (error.toString().substring(37, 57)) {
          document.getElementById("my_modal_5").close();
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Invalid Credentials",
            showConfirmButton: true,
            customClass: {
              container: "swal-container",
            },
          });
        } else {
          document.getElementById("my_modal_5").close();
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An error occurred. Please try again.",
            showConfirmButton: true,
            customClass: {
              container: "swal-container",
            },
          });
        }
      });
  };

  //Login with google
  let userInfo = {
    name: "Null",
    email: "Null",
  };
  const handleLogin = async () => {
    try {
      const result = await signUpWithGmail();

      // Ensure `result.user` contains the expected fields
      const user = result.user;
      console.log("User:", JSON.stringify(user, null, 2));

      // Define userInfo after verifying the structure of `user`
      userInfo = {
        name: user.displayName || "User", // Fallback if `displayName` is null
        email: user.email || "User", // Fallback if `email` is null
      };

      //console.log("UserInfo:", JSON.stringify(userInfo, null, 2));

      // API call to backend
      const response = await axiosPublic.post("/users", userInfo);
      console.log("API Response:", response.data);

      document.getElementById("my_modal_5").close();
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    } catch (error) {
      if (error.message == "Request failed with status code 302") {
        document.getElementById("my_modal_5").close();

        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
      }
    }
  };

  //Login with github
  const handleGithubLogin = async () => {
    try {
      const result = await signUpWithGithub();
      console.log("result :    ", result);
      // Ensure `result.user` contains the expected fields
      const user = result.user;
      console.log("User:", JSON.stringify(user, null, 2));

      // Define userInfo after verifying the structure of `user`
      userInfo = {
        name: user.displayName || "User", // Fallback if `displayName` is null
        email: user.email || "User", // Fallback if `email` is null
      };

      //console.log("UserInfo:", JSON.stringify(userInfo, null, 2));

      // API call to backend
      const response = await axiosPublic.post("/users", userInfo);
      console.log("API Response:", response.data);

      document.getElementById("my_modal_5").close();
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    } catch (error) {
      if (error.message == "Request failed with status code 302") {
        document.getElementById("my_modal_5").close();

        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
      }
    }
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action mt-0 flex-col justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="font-bold text-lg">Please Login</h3>

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

            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
              />
            </div>

            <p className="text-center my-2">
              Don't have an account?{" "}
              <Link to="/signup" className="underline text-red ml-1">
                Sign up
              </Link>
            </p>
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          <div className="text-center space-x-3 mb-5">
            <button
              className="btn btn-circle hover:bg-green"
              onClick={handleLogin}
            >
              <FcGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green">
              <FaXTwitter />
            </button>
            <button
              className="btn btn-circle hover:bg-green"
              onClick={handleGithubLogin}
            >
              <SiGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
