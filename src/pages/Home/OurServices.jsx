import React from "react";

const OurServices = () => {
  const serviceList = [
    {
      id: 1,
      title: "Holidays",
      des: "Get a Joy like never before",
      image: "/images/home/services/icon1.png",
    },
    {
      id: 2,
      title: "Vacations",
      des: "Live the days to fullest",
      image: "/images/home/services/icon2.png",
    },
    {
      id: 3,
      title: "Destinations",
      des: "Fullfill your dreams of visting places",
      image: "/images/home/services/icon3.png",
    },
    {
      id: 4,
      title: "Stays",
      des: "Stays at reasonable prices",
      image: "/images/home/services/icon4.png",
    },
  ];
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/*  text */}
        <div className="nd:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title">Our Journey And Services</h2>
            <p className="my-5 text-secondary leading-[30px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
              enim saepe repellat culpa, magnam nesciunt ad dolore natus veniam
            </p>
            <button className="btn bg-gradient-to-r from-purple-500 via-purple-400 to-purple-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-700/50 hover:shadow-xl text-white px-8 py-3 rounded-full">
              Explore
            </button>
          </div>
        </div>
        {/* images */}
        <div className="nd:w-1/2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
            {serviceList.map((service) => (
              <div
                key={service.id}
                className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-purple-400 shadow-purple-400/50 cursor-pointer hover:indigo-600 transition-all duration-200 hover:border"
              >
                <img src={service.image} alt="" className="mx-auto" />
                <h5 className="pt-3 font-semibold">{service.title}</h5>
                <p className="text-[#908D95]">{service.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
