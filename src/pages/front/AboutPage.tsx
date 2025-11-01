import React from "react";
import Header from "../../blend/one/Header";
import MiniBanner from "../../blend/one/MiniBanner";
import Testimonial from "../../blend/one/Testimonial";
import Footer from "../../blend/one/Footer";
import ChooseUs from "../../blend/one/ChooseUs";
import Story from "../../blend/one/Story";
import Team from "../../blend/one/Team";


const AboutPage: React.FC = () => {

  return (
    <>
      <Header />
      <MiniBanner page="about" />

      <Story />     
      <ChooseUs />

      <Team />

      <Footer />
    </>
  );
};

export default AboutPage;
