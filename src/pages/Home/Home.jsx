import React from "react";
import Banner from "../../components/Banner";
import Categories from "./Categories";
import SpecialPackages from "../../components/SpecialPackages";
import Testimonials from "./Testimonials";
import OurServices from "./OurServices";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <SpecialPackages />
      <Testimonials />
      <OurServices />
    </div>
  );
};

export default Home;
