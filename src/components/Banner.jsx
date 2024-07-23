import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between item-center gap-8">
        {/* images */}
        <div className="md:w-1/2 ">
          <img src="/tourist.png" alt="" />
          {/* first card */}
          <div className="flex flex-col md:flex-row items-center justify-around -mt-20 gap-3">
            <div className="flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-72">
              <img
                src="/tour1.jpg"
                alt=""
                className="rounded-2xl max-w-40 w-30"
              />
              <div className="space-y-1">
                <h5 className="font-medium mb-1">Kerala River Hills</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                </div>
                <p className="text-red"></p>
              </div>
            </div>
            {/* second card */}
            <div className="md:flex hidden bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-72">
              <img
                src="/tour2.jpg"
                alt=""
                className="rounded-2xl max-w-40 w-30"
              />
              <div className="space-y-1">
                <h5 className="font-medium mb-1">Maharshtra Forts</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                </div>
                <p className="text-red"></p>
              </div>
            </div>
          </div>
        </div>
        {/* text */}
        <div className="md:w-1/2 mt-24">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
            Dive into the beauty of
            <span className="text-violet-800"> India</span>
          </h2>
          <p className="text-xl text-[#4A4A4A] ">
            Discover Your Own Backyard & Embrace the Wonders of Domestic
            Adventure!
          </p>
          <br></br>
          <Link
            to="/special-package"
            className="bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-300 px-8 py-3 font-semibold hover:text-slate-200 hover:shadow-indigo-500/50 hover:shadow-xl text-white rounded-full"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
