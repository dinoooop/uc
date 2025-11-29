import React from "react";
import MiniBanner from "../../blend/one/MiniBanner";
import Header from "../../blend/one/Header";
import Footer from "../../blend/one/Footer";
import PinCarShow from "../../blend/templates/PinCarShow";

const FrontCarListPage: React.FC = () => {


    return (
        <>
            <Header />
            <MiniBanner page="car_list" />
            <div className="part bg-grey">
                <div className="wrapper-fluid">
                            <PinCarShow pinFrom="public" />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FrontCarListPage;
