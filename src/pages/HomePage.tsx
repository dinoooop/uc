import React from "react";
import Header from "../templates/Header";
import Banner from "../templates/Banner";
import Feature from "../templates/Feature";
import LatestUpload from "../templates/LatestUpload";
import Testimonial from "../templates/Testimonial";
import Footer from "../templates/Footer";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Banner />
      <Feature />
      <LatestUpload />
      <Testimonial />
      <Footer />
    </>
  );
};

export default HomePage;
