import React, { useEffect, useState } from "react";

interface Slide {
    image: string;
    key: string;
    title: string;
    description: string;
}


interface MiniBannerProps {
    page?: string; // optional
}


const slides: Slide[] = [
    {
        image: "/images/banner-1.jpg",
        key: "about",
        title: "Quality Pre-Owned Vehicles, Unbeatable Prices",
        description: "Browse our extensive collection of carefully inspected used cars at prices you'll love.",
    },
    {
        image: "/images/car_list_banner.jpg",
        key: "car_list",
        title: "Quality Pre-Owned Vehicles, Unbeatable Prices",
        description: "Browse our extensive collection of carefully inspected used cars at prices you'll love.",
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
                    </div>
                </div>
            
        </div>
    );
};

export default MiniBanner;
