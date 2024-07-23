import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Swal from "sweetalert2";
const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
        setErrorMessage("Invalid Credentials");
        setOpenSnackbar(true);
        console.log(error);
      });
  };

  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.name,
          email: user.email,
        };
        axiosPublic.post("/users", userInfo).then((response) => {
          console.log(response);
          alert(`Welcome ${response.name}`);
          navigate(from, { replace: true });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        });
      })
      .catch((error) => {
        setErrorMessage("Invalid Credentials");
        console.log(error);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
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

            {errorMessage && (
              <Snackbar
                className=" text-red rounded-full"
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
              >
                <MuiAlert
                  className=" text-red bg-gradient-to-r from-pink-300 to-indigo-400"
                  onClose={handleCloseSnackbar}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {errorMessage}
                </MuiAlert>
              </Snackbar>
            )}

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
            <button className="btn btn-circle hover:bg-green">
              <SiGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
