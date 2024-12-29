import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import LoadingSpinner from "./LoadingSpinner";

const ContactUs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const onSubmit = async (data) => {
    console.log(data); // Check the data you're submitting
    const formData = {
      email: data.email,
      name: data.name,
      question: data.question,
      feedback: data.feedback,
    };
    console.log(formData); // Ensure the formData structure is correct
    axiosPublic.post("/emails", formData).then((res) => {
      console.log(res.data);
      if (res.data) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your query has been sent successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        alert("Something went wrong");
      }
    });
  };

  const isSetToken = localStorage.getItem("access-token") != null;

  if (!user) {
    if (isSetToken) return <LoadingSpinner />;
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name <span className="text-red">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={isSetToken ? user.displayName : " "}
            {...register("name", { required: true })}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email <span className="text-red">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={isSetToken ? user.email : ""}
            {...register("email", { required: true })}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700"
          >
            Question <span className="text-red">*</span>
          </label>
          <textarea
            id="question"
            {...register("question", { required: true })}
            rows="4"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700"
          >
            Feedback
          </label>
          <textarea
            id="feedback"
            {...register("feedback")}
            rows="4"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
