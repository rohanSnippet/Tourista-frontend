import React from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const Stars = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <React.Fragment key={index}>
        {stars >= index + 1 ? (
          <FaStar />
        ) : stars >= number ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </React.Fragment>
    );
  });

  return (
    <div>
      {" "}
      <span className="flex items-center text-yellow-500">
        {ratingStar}
        <p className="ml-1">{reviews}</p>
      </span>
    </div>
  );
};

export default Stars;
