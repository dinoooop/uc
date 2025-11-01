import React from "react";

interface Slide {
    image: string;
    key: string;
    title: string;
    subTitle?: string;
}


interface MiniBannerProps {
    page?: string; // optional
}


const slides: Slide[] = [
    {
        image: "/images/about-banner.jpg",
        key: "about",
        title: "About",
    },
    {
        image: "/images/banner-contact.jpg",
        key: "contact",
        title: "Contact",
        subTitle: "Reach out - we’d love to hear from you"

    },
    {
        image: "/images/car_list_banner.jpg",
        key: "car_list",
        title: "Available Cars",
        subTitle: "Handpicked selection waiting for you"
    },
    {
        image: "/images/car_list_banner.jpg",
        key: "car_create",
        title: "Sell my car",
        subTitle: "Your car’s best offer starts here"
    },


];

const MiniBanner: React.FC<MiniBannerProps> = ({ page = 'about' }) => {

    const currentBanner = slides.find(item => item.key == page);

    return (
        <div className="banner-inner">
            <div
                className="slide active"
                style={{ backgroundImage: `url(${currentBanner?.image})` }}
            >
                <div className="slide-content">
                    <h2>{currentBanner?.title}</h2>
                    {
                        currentBanner?.subTitle &&
                        <h3>{currentBanner.subTitle}</h3>
                    }
                </div>
            </div>

        </div>
    );
};

export default MiniBanner;
