import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form"; // Import react-hook-form

const AddTravellerInfo = () => {
  const [travellers, setTravellers] = useState([]);
  const location = useLocation();
  const item = location.state?.item;
  const navigate = useNavigate();
  const { adults, children } = location.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Add setValue from useForm
  } = useForm(); // Initialize useForm

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (index, field, value) => {
    const updatedTravellers = [...travellers];
    updatedTravellers[index] = {
      ...updatedTravellers[index],
      [field]: value,
    };
  };

  const onSubmit = (data) => {
    const adultTravellers = data.adults;
    const childTravellers = data.children;
    const totalPrice = item.price * (adults + children);

    navigate("/checkout", {
      state: {
        adultTravellers,
        childTravellers,
        item,
        totalPrice,
      },
    });
  };

  return (
    <div className="mt-14">
      <div className="mx-auto max-w-6xl px-5 py-12 bg-white-100 rounded-lg shadow-purple-300 shadow-xl">
        <div className="section-container mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Adult Traveller Details */}
            {adults ? (
              <h2 className="text-2xl font-semibold mb-4 py-2 rounded-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white pl-4 shadow-purple-500 shadow-md">
                Adult Traveller Details
              </h2>
            ) : (
              <></>
            )}
            {[...Array(adults)].map((_, index) => (
              <div
                key={`adult-${index}`}
                className="flex flex-col lg:flex-row traveller-info mb-10"
              >
                {/* Label for Adult */}
                <label className="mb-2 lg:mt-2 lg:mr-2 text-slate-800">
                  Adult {index + 1}
                </label>

                {/* Name Input */}
                <input
                  type="text"
                  placeholder="Name"
                  required
                  pattern="[A-Za-z\s]+"
                  {...register(`adults[${index}].name`)}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className={`input-field bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mb-2 lg:mb-0 lg:mr-2 ${
                    errors?.adults &&
                    errors.adults[index]?.name &&
                    "border-red-500"
                  }`}
                />
                {errors?.adults && errors.adults[index]?.name && (
                  <span className="text-red-500 lg:ml-2">Name is required</span>
                )}

                {/* Age Input */}
                <input
                  type="number"
                  placeholder="Age"
                  required
                  max={80}
                  min={12}
                  {...register(`adults[${index}].age`)}
                  onChange={(e) => handleChange(index, "age", e.target.value)}
                  className={`input-field bg-gray-200 text-gray-800 px-4 py-2 w-full lg:w-20 rounded-lg mb-2 lg:mb-0 lg:mr-2 ${
                    errors?.adults &&
                    errors.adults[index]?.age &&
                    "border-red-500"
                  }`}
                />
                {errors?.adults && errors.adults[index]?.age && (
                  <span className="text-red-500 lg:ml-2">
                    Age must be between 12 and 80
                  </span>
                )}

                {/* Gender Radio Buttons */}
                <div className="flex items-center justify-center space-x-6">
                  {/* Male Option */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`male-adult-${index}`}
                      name={`gender-adult-${index}`}
                      value="male"
                      {...register(`adults[${index}].gender`)}
                      onChange={() => handleChange(index, "gender", "male")}
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={`male-adult-${index}`}
                      className="ml-2 text-slate-800 cursor-pointer"
                    >
                      Male
                    </label>
                  </div>

                  {/* Female Option */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`female-adult-${index}`}
                      name={`gender-adult-${index}`}
                      value="female"
                      {...register(`adults[${index}].gender`)}
                      onChange={() => handleChange(index, "gender", "female")}
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={`female-adult-${index}`}
                      className="ml-2 text-slate-800 cursor-pointer"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
            ))}

            {/* Children Traveller Details */}
            {children ? (
              <h2 className="text-2xl font-semibold mb-4 py-2 rounded-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white pl-4 shadow-purple-500 shadow-md">
                Children Traveller Details
              </h2>
            ) : (
              <></>
            )}
            {[...Array(children)].map((_, index) => (
              <div
                key={`child-${index}`}
                className="flex flex-wrap items-center traveller-info mb-6 space-x-4"
              >
                <label className="mt-2">Child {index + 1}</label>

                <input
                  type="text"
                  placeholder="Name"
                  required
                  pattern="[A-Za-z\s]+"
                  {...register(`children[${index}].name`)}
                  onChange={(e) =>
                    handleChange(index + adults, "name", e.target.value)
                  }
                  className={`input-field bg-gray-200 text-gray-800 px-4 py-2 mx-1 rounded-lg ${
                    errors?.children &&
                    errors.children[index]?.name &&
                    "border-red-500"
                  }`}
                />
                {errors?.children && errors.children[index]?.name && (
                  <span className="text-red-500 ml-2">Name is required</span>
                )}

                <input
                  type="number"
                  placeholder="Age"
                  required
                  max={11}
                  min={1}
                  {...register(`children[${index}].age`)}
                  onChange={(e) =>
                    handleChange(index + adults, "age", e.target.value)
                  }
                  className={`input-field bg-gray-200 text-gray-800 px-4 w-20 py-2 mx-1 rounded-lg ${
                    errors?.children &&
                    errors.children[index]?.age &&
                    "border-red-500"
                  }`}
                />
                {errors?.children && errors.children[index]?.age && (
                  <span className="text-red-500 ml-2">
                    Age must be between 1 and 11
                  </span>
                )}

                <div className="flex items-center space-x-6">
                  {/* Male Option */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`male-children-${index}`}
                      name={`gender-children-${index}`}
                      value="male"
                      {...register(`children[${index}].gender`)}
                      onChange={() => handleChange(index, "gender", "male")}
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={`male-children-${index}`}
                      className="ml-2 text-slate-800 cursor-pointer"
                    >
                      Male
                    </label>
                  </div>

                  {/* Female Option */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`female-children-${index}`}
                      name={`gender-children-${index}`}
                      value="female"
                      {...register(`children[${index}].gender`)}
                      onChange={() => handleChange(index, "gender", "female")}
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={`female-children-${index}`}
                      className="ml-2 text-slate-800 cursor-pointer"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
            ))}

            {/* Button Container */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="btn justify-around  inline-block px-10 py-3 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 shadow-gray-500/50 rounded-full text-white text-sm font-bold shadow-lg hover:shadow-xl hover:shadow-gray-500/30 hover:bg-gradient-to-r hover:from-gray-600 hover:via-gray-500 hover:to-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 "
              >
                Review Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTravellerInfo;
