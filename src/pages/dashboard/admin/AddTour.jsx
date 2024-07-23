import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import { FaPlusCircle } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddTour = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Days",
  });
  const options = [
    { value: "Meals", label: "Meals" },
    { value: "Hotel", label: "Hotel" },
    { value: "Transport", label: "Transport" },
    { value: "SightSeeing", label: "SightSeeing" },
    { value: "HouseboatStay", label: "HouseboatStay" },
    { value: "TempleVisit", label: "TempleVisit" },
    { value: "RiverRafting", label: "RiverRafting" },
    { value: "Camping", label: "Camping" },
    { value: "Trekking", label: "Trekking" },
    { value: "Boating", label: "Boating" },
  ];

  const categories = [
    {
      value: "hill",
      label: "hill",
    },
    {
      value: "beach",
      label: "beach",
    },
    {
      value: "popular",
      label: "popular",
    },
    {
      value: "forest",
      label: "forest",
    },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);

  //Image hosting key
  const imageHostKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  //Image hosting
  const image_hosting_api = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`;

  //Image hosting
  const onSubmit = async (data) => {
    if (data.image && data.image.length > 0) {
      // Check if image data exists
      const imageFile = { image: data.image[0] }; // Access image data from the form data
      const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });
      if (hostingImg.data.success) {
        const menuItems = {
          name: data.name,
          recipe: data.recipe,
          image: hostingImg.data.data.url,
          category: data.category,
          price: parseInt(data.price),
          Days: data.Days,
          Departure_City: data.Departure_City,
          tour_includes: data.tour_includes,
          Arrival_City: data.Arrival_City,
          start_date: data.start_date,
          end_date: data.end_date,
        };
        //console.log(menuItems);
        const postMenuItem = await axiosSecure.post("/menus", menuItems);
        //console.log(postMenuItem);
        if (postMenuItem) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "New Tour Added to Menu",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      }
    }
  };

  const handleChange = async (selectedOption) => {
    console.log(selectedOption);
    const selectedValues = selectedOption.map((option) => option.value);
    setValue("tour_includes", selectedValues);
    setSelectedOptions(selectedOption);
  };
  const handleChange2 = async (selectedOption) => {
    const selectedValues2 = selectedOption.map((option) => option.value);
    setValue("category", selectedValues2);
    setSelectedOptions2(selectedOption);
  };

  return (
    <div className="w-full md:w-[1090px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4 ">
        Upload A New{" "}
        <span className="font-bold text-purple-600">Tour Package</span>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/*Tour Name */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-600">
            Tour Package Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Type here"
            className="input input-bordered w-full px-4"
          />
          {errors.name && (
            <span className="text-sm text-red-600">This field is required</span>
          )}
        </div>
        {/* category and price*/}
        <div className="flex space-x-4">
          <div className="w-1/2 space-y-2">
            <label className="block text-sm font-semibold text-gray-600">
              Select Categories:
            </label>
            <Select
              options={categories}
              value={selectedOptions2}
              onChange={handleChange2}
              isMulti={true}
              className="w-full"
            />
          </div>
          <div className="w-1/2 space-y-2">
            <label className="block text-sm font-semibold text-gray-600">
              Price
            </label>
            <div className="flex items-center border rounded-md p-2">
              <span className="text-gray-700">&#x20B9;</span>
              <input
                type="number"
                {...register("price", { required: "Add Tour Price" })}
                placeholder="Enter price"
                className="input input-bordered flex-1 px-2"
              />
            </div>
          </div>
        </div>
        {/* description */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-600">
            Description
          </label>
          <textarea
            className="textarea textarea-bordered h-24 resize-none"
            placeholder="Tell about the Tour"
            {...register("recipe", {
              required: "Tell Something About Your Tour",
            })}
          ></textarea>
        </div>
        {/* Tour Includes */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-600">
            Tour Includes
          </label>
          <Select
            options={options}
            value={selectedOptions}
            onChange={handleChange}
            isMulti={true}
            className="w-full"
          />
        </div>

        {/* Days of the tour */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Days of the tour
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <input
                type="hidden"
                value={index + 1}
                {...register(`Days.${index}.day_number`, {
                  required: true,
                })}
              />
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Day {index + 1} Description
                </label>
                <textarea
                  className="textarea textarea-bordered h-24 resize-none"
                  {...register(`Days.${index}.description`, {
                    required: "Tell What happens on day",
                  })}
                  placeholder={`Description of day ${index + 1}`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    Place to Visit
                  </label>
                  <input
                    type="text"
                    {...register(`Days.${index}.places`, {
                      required: "Add Places",
                    })}
                    placeholder={`Place to visit on day ${index + 1}`}
                    className="input input-bordered"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    Meals
                  </label>
                  <input
                    type="text"
                    {...register(`Days.${index}.meals`, {
                      required: "What's for meals",
                    })}
                    placeholder={`Meals on day ${index + 1}`}
                    className="input input-bordered"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-sm btn-outline btn-danger"
              >
                Remove
              </button>
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={() => append()}
              className="btn btn-sm px-6 text-white bg-indigo-500 shadow-xl shadow-indigo-500/50 hover:bg-indigo-300 hover:shadow-indigo-500/50 hover:shadow-3xl"
            >
              Add a Day <FaPlusCircle className="inline-block ml-1" />
            </button>
          </div>
        </div>
        {/* image */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-600">
            Upload Tour Image
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered"
          />
        </div>
        {/* departure and arrival city */}
        <div className="flex space-x-4">
          <div className="w-1/2 space-y-2">
            <label className="block text-sm font-semibold text-gray-600">
              Departure City
            </label>
            <input
              type="text"
              {...register("Departure_City", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          <div className="w-1/2 space-y-2">
            <label className="block text-sm font-semibold text-gray-600">
              Arrival City
            </label>
            <input
              type="text"
              {...register("Arrival_City", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* departure and arrival date */}
        <div className="flex space-x-4">
          <div className="w-1/2 space-y-2">
            <label className="block text-sm font-semibold text-gray-600">
              Departure Date
            </label>
            <input
              type="date"
              {...register("start_date", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div className="w-1/2 space-y-2">
            <label className="block text-sm font-semibold text-gray-600">
              Arrival Date
            </label>
            <input
              type="date"
              {...register("end_date", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* submit */}
        <button className="btn px-6 text-white bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:shadow-lg">
          Add Tour
        </button>
      </form>
    </div>
  );
};

export default AddTour;
