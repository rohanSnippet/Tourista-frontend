import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const { signUpWithGmail, login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.pathname || "/";
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

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((response) => {
        console.log(response);

        if (response) {
          navigate(from);
          Toast.fire({
            icon: "success",
            title: `Welcome ${response.user.displayName}`,
          });
          if (location.state?.prevPath == "/dashboard") {
            navigate("/dashboard");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);

        if (error.toString().substring(37, 57)) {
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
  //login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        console.log(result);
        const userInfo = {
          name: result?.user?.displayName,
          email: result.user.email,
        };
        axiosPublic.post("/users", userInfo).then((response) => {
          console.log(response);

          navigate(from, { replace: true });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Welcome ${userInfo.name}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
      })
      .catch((error) => {
        if (error.response.data.message == "User already exists") {
          navigate(from, { replace: true });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Welcome ${userInfo.name}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log(error);
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action mt-0  flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          {location.state?.prevPath === "/dashboard" && (
            <div className="font-bold text-lg">
              <h3 className="bg-gradient-to-r from-green via-midGreen to-darkGreen font-semibold text-xl bg-clip-text text-transparent text-center">
                You do not have admin access !!
              </h3>
              <h6 className="text-red font-medium text-sm text-center">
                Please login with admin account.
              </h6>
            </div>
          )}
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

          {/* Login */}
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
              Sign Up
            </Link>
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
