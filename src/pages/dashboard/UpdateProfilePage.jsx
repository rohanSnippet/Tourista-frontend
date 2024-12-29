import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
  const { updateUserProfile, user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(user);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.from?.state || "/";

  const onSubmit = (data) => {
    // const name = data.name;
    // const photoURL = data.photoURL;
    const { name, photoURL } = data;

    updateUserProfile({ name, photoURL })
      .then(() => {
        alert("user updated successfully!");
        console.log(name);
        console.log(photoURL);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex items-center justify-center h-screen">
      {" "}
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold">Update your profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder={user.displayName}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              {...register("photoURL")}
              type="text"
              placeholder={user.photoURL}
              className="input input-bordered"
            />
            {/* To-Do Here uploading image will be later */}
            {/* <input type="file" className="file-input file-input-bordered w-full max-w-xs" /> */}
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
