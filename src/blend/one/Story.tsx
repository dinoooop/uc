import React from "react";
import config from "../../config";

interface FeatureCard {
    icon: any;
    title: string;
    subtitle: string;
    description: string;
}

const features: FeatureCard[] = [
    {
        icon: 'fa-solid fa-user',
        title: "Story",
        subtitle: "Hundreds of Models",
        description: "Choose from a wide variety of pre-owned vehicles to suit your style and budget.",
    },
    {
        icon: 'fa-solid fa-bell',
        title: "Mision",
        subtitle: "Trusted & Inspected",
        description: "Every car goes through rigorous inspection to ensure safety and reliability.",
    },
    {
        icon: 'fa-solid fa-id-card',
        title: "Vision",
        subtitle: "Best Deals",
        description: "Competitive pricing and flexible payment options to make your dream car a reality.",
    },
];

const Story: React.FC = () => {
    return (

        <section className="part bg-grey">
            <div className="wrapper">
                <h2 className="part-title">Our Story</h2>
                <h2 className="part-title-sub mb-2">Driven by a dream, powered by trust</h2>
                <p className="part-description mb-2">
                    Founded with a passion for quality vehicles and customer trust,
                    <strong>{config.appName}</strong> has grown into one of the most reliable
                    pre-owned car marketplaces. From our humble beginnings to serving
                    thousands of satisfied drivers, we’ve stayed true to our mission —
                    offering honest, transparent, and hassle-free car buying experiences.
                </p>

                <div className="d-flex-center">
                    {features.map((feature, index) => (
                        <div className="we-card" key={index}>
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
        </section>

    )
}
export default Story