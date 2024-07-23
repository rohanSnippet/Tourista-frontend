import React from "react";

const categoryItems = [
  {
    id: 1,
    title: "Hill Station",
    des: "",
    image: "hills.jpg",
  },
  {
    id: 2,
    title: "Beach Destinations",
    des: "",
    image: "beach.jpg",
  },
  {
    id: 3,
    title: "Pilgrimage Destination",
    des: "",
    image: "pilgrim.jpg",
  },
  {
    id: 3,
    title: "Heritage Destination",
    des: "",
    image: "heritage.jpg",
  },
];

const Categories = () => {
  return (
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle">Customer favorites</p>
        <h2 className="title">Popular categories</h2>
      </div>
      {/* category cards */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-1 justify-around items-center mt-12">
        {categoryItems.map((item, i) => (
          <div
            key={i}
            className="shadow-lg rounded-lg bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all"
          >
            <div className="flex w-full mx-auto items-center justify-center">
              <img
                src={item.image}
                alt=""
                className="p-1 rounded-badge w-34 h-34"
              />
            </div>
            <div className="mt-5 space-y-1">
              <h5>
                {item.title}
                <p>{item.des}</p>
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
