import React from "react";
import Header from "../../blend/one/Header";
import Banner from "../../blend/one/Banner";
import Feature from "../../blend/one/Feature";
import LatestUpload from "../../blend/one/LatestUpload";
import Testimonial from "../../blend/one/Testimonial";
import Footer from "../../blend/one/Footer";

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
