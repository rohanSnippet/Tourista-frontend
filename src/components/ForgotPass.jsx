import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import app from "../firebase/firebase.config";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const ForgotPass = () => {
  const [sentMessage, setSentMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    const emval = e.target.email.value;
    sendPasswordResetEmail(auth, emval)
      .then(() => {
        // alert("check your email");
        setSentMessage("Check Your Email!");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div>
      {" "}
      {/* <div className="mx-auto flex justify-center items-center h-screen">
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-white p-8 rounded shadow-md"
    >
      <input type="email" name="email" placeholder="enter email" />
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
*/}
      <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
        <div className="modal-action mt-0  flex-col justify-center">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="card-body"
            method="dialog"
          >
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>
            <h3 className="font-bold text-lg">Reset Password</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
            {/* error text */}
            {sentMessage && (
              <p className="text-green font-semibold text-xs italic mt-1">
                {sentMessage}
              </p>
            )}
            {/* submit */}
            <div className="form-control mt-6">
              <input
                type="submit"
                placeholder="Send Email"
                className="btn bg-green text-white"
              />
            </div>
          </form>
        </div>
        <Modal />
      </div>
    </div>
  );
};

export default ForgotPass;
