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
    // Handle form submission
    console.log(data);
    setTravellers(data);
    const adultTravellers = data.adults;
    const childTravellers = data.children;
    const totalPrice = item.price * (adults + children);
    console.log(adultTravellers);
    console.log(childTravellers);
    //console.log();

    navigate("/checkout", {
      state: {
        adultTravellers: adultTravellers,
        childTravellers: childTravellers,
        item: item,
        totalPrice: totalPrice,
      },
    });
  };

  return (
    <div className="mt-14">
      <div className="mx-auto max-w-6xl px-5 py-12 bg-white-100 rounded-lg shadow-purple-300 shadow-xl">
        <div className="section-container mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Adult Traveller Details */}
            <h2 className="text-2xl font-semibold mb-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white pl-4 shadow-purple-500 shadow-md">
              Adult Traveller Details
            </h2>
            {[...Array(adults)].map((_, index) => (
              <div
                key={`adult-${index}`}
                className="flex lg:flex traveller-info mb-10"
              >
                <label className="mt-2">Adult {index + 1}</label>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  pattern="[A-Za-z\s]+"
                  {...register(`adults[${index}].name`)}
                  onChange={(e) => handleChange(index, "name", e.target.value)} // Add onChange event handler
                  className={`input-field bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mx-1 mb-1 ${
                    errors?.adults &&
                    errors.adults[index]?.name &&
                    "border-red-500"
                  }`}
                />
                {errors?.adults && errors.adults[index]?.name && (
                  <span className="text-red-500 ml-2">Name is required</span>
                )}
                <input
                  type="number"
                  placeholder="Age"
                  required
                  max={80}
                  min={12}
                  {...register(`adults[${index}].age`)}
                  onChange={(e) => handleChange(index, "age", e.target.value)} // Add onChange event handler
                  className={`input-field bg-gray-200 text-gray-800 px-4 py-2 w-20 rounded-lg mx-1 mb-1 ${
                    errors?.adults &&
                    errors.adults[index]?.age &&
                    "border-red-500"
                  }`}
                />
                {errors?.adults && errors.adults[index]?.age && (
                  <span className="text-red-500 ml-2">
                    Age must be between 12 and 80
                  </span>
                )}
                <div className="ml-3 flex items-center">
                  <input
                    type="radio"
                    id={`male-adult-${index}`}
                    name={`gender-adult-${index}`}
                    value="male"
                    {...register(`adults[${index}].gender`)}
                    onChange={() => handleChange(index, "gender", "female")} // Add onChange event handler
                  />
                  <label
                    htmlFor={`male-${index}`}
                    className="text-slate-800 mr-4 cursor-pointer"
                  >
                    Male
                  </label>

                  <input
                    type="radio"
                    id={`female-adult-${index}`}
                    name={`gender-adult-${index}`}
                    value="female"
                    {...register(`adults[${index}].gender`)}
                    onChange={() => handleChange(index, "gender", "female")}
                  />
                  <label
                    htmlFor={`female-${index}`}
                    className="text-slate-800 cursor-pointer"
                  >
                    Female
                  </label>
                </div>
              </div>
            ))}

            {/* Children Traveller Details */}
            <h2 className="text-2xl font-semibold mb-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white pl-4 shadow-purple-500 shadow-md">
              Children Traveller Details
            </h2>
            {[...Array(children)].map((_, index) => (
              <div
                key={`child-${index}`}
                className="flex lg:flex traveller-info mb-6"
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
                  } // Add onChange event handler
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
                  } // Add onChange event handler
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
                <div className="ml-3 flex items-center">
                  <input
                    type="radio"
                    id={`male-children-${index}`}
                    name={`gender-children-${index}`}
                    value="male"
                    {...register(`children[${index}].gender`)}
                    onChange={() => handleChange(index, "gender", "female")}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`male-children-${index}`}
                    className="text-slate-800 mr-4 cursor-pointer"
                  >
                    Male
                  </label>
                  <input
                    type="radio"
                    id={`female-children-${index}`}
                    name={`gender-children-${index}`}
                    value="female"
                    {...register(`children[${index}].gender`)}
                    onChange={() => handleChange(index, "gender", "female")}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`female-children-${index}`}
                    className="text-slate-800 cursor-pointer"
                  >
                    Female
                  </label>
                </div>
              </div>
            ))}
            <button
              type="submit" // Change button type to submit
              className="ml-80 btn-primary items-center mt-8 py-2 px-4 rounded-lg  text-white hover:shadow-blue-500 hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-400 hover:to-indigo-600 bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500"
            >
              Review Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTravellerInfo;
