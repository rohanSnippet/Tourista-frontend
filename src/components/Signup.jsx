import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, signInWithTwitter, createUser, updateUserProfile } =
    useContext(AuthContext);

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
  //redirecting to home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;

    try {
      // Create user in authentication system
      await createUser(name, email, password);

      // Update user profile with provided data
      await updateUserProfile(data.email, data.photoURL, name);

      // Prepare user information
      const userInfo = {
        name: data.name,
        email: data.email,
      };

      // Send user info to your backend
      const response = await axiosPublic.post("/users", userInfo);

      if (response.status === 201) {
        // Show the SweetAlert success message
        Toast.fire({
          icon: "success",
          title: `Welcome ${response.data.result.name}`,
        });
      }

      // Navigate to another page after success
      navigate("/");
    } catch (error) {
      console.error(error.toString().substring(37, 57));
      // Optionally, show an error alert or handle it as needed
      if (error.toString().substring(37, 57)) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "User Already Exists.",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "An error occurred. Please try again.",
          showConfirmButton: true,
        });
      }
    }
  };

  //Sign up with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        console.log("User:", user); // Check if user object is logged properly

        const userInfo = {
          name: user.name,
          email: user.email,
        };

        axiosPublic
          .post("/users", userInfo)
          .then((response) => {
            console.log("Response:", response); // Check if response is logged properly
            alert(`Welcome ${user.displayName}`);
            navigate(from, { replace: true }); // Check if navigate function is called properly
          })
          .catch((error) => {
            console.error("Error in axiosPublic.post:", error); // Log axios post error
          });
      })
      .catch((error) => {
        console.error("Error in signUpWithGmail:", error); // Log signUpWithGmail error
      });
  };

  //twitter sign in
  const handleXRegister = () => {
    signInWithTwitter().then((result) => {
      const user = result.user;
      console.log(user);

      const userInfo = {
        name: user.name,
        email: user.email,
      };

      // Send data to the server
      axiosPublic
        .post("/users", userInfo)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error in signUpWithTwitter:", error); // Log signUpWithTwitter error
        });
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
          <h3 className="font-bold text-lg">Create an account</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
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
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>

          {/* error text */}
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
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
            Have an account?{" "}
            <Link
              //onClick={() => document.getElementById("my_modal_5").showModal()}
              to="/login"
              className="underline text-red ml-1"
            >
              Login
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
          <button
            onClick={handleXRegister}
            className="btn btn-circle hover:bg-green"
          >
            <FaXTwitter />
          </button>
          <button className="btn btn-circle hover:bg-green">
            <SiGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Signup;
