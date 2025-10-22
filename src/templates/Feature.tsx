import React from "react";

interface FeatureCard {
    icon: any;
    title: string;
    subtitle: string;
    description: string;
}

const features: FeatureCard[] = [
    {
        icon: 'fa-solid fa-car',
        title: "Wide Selection",
        subtitle: "Hundreds of Models",
        description: "Choose from a wide variety of pre-owned vehicles to suit your style and budget.",
    },
    {
        icon: 'fa-solid fa-shield-alt',
        title: "Certified Quality",
        subtitle: "Trusted & Inspected",
        description: "Every car goes through rigorous inspection to ensure safety and reliability.",
    },
    {
        icon: 'fa-solid fa-dollar-sign',
        title: "Affordable Pricing",
        subtitle: "Best Deals",
        description: "Competitive pricing and flexible payment options to make your dream car a reality.",
    },
];

const Feature: React.FC = () => {
    return (
        <div className="section">
            <h2 className="main">Ready to Drive</h2>
            <div className="feature-container">
                {features.map((feature, index) => (
                    <div className="feature-card" key={index}>
                        <div className="feature-icon">
                            <i className={feature.icon}></i>
                        </div>
                        <h3>{feature.title}</h3>
                        <h4>{feature.subtitle}</h4>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feature;
