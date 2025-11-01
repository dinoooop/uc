import React from "react";


interface FeatureCard {
  icon: any;
  title: string;
  subtitle: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    icon: 'fa-solid fa-wrench',
    title: "Expert Quality Inspections",
    subtitle: "Hundreds of Models",
    description: "Choose from a wide variety of pre-owned vehicles to suit your style and budget.",
  },
  {
    icon: 'fa-solid fa-clock',
    title: "Unlimited listing duration",
    subtitle: "Hundreds of Models",
    description: "Choose from a wide variety of pre-owned vehicles to suit your style and budget.",
  },
  {
    icon: 'fa-solid fa-dollar',
    title: "Transparent Pricing and Reports",
    subtitle: "Hundreds of Models",
    description: "Choose from a wide variety of pre-owned vehicles to suit your style and budget.",
  },
  {
    icon: 'fa-solid fa-user',
    title: "Genuine Buyers",
    subtitle: "Hundreds of Models",
    description: "Choose from a wide variety of pre-owned vehicles to suit your style and budget.",
  },
  {
    icon: 'fa-solid fa-wallet',
    title: "Flexible Financing Options",
    subtitle: "Trusted & Inspected",
    description: "Every car goes through rigorous inspection to ensure safety and reliability.",
  },
  {
    icon: 'fa-solid fa-id-card',
    title: "Get buyer details",
    subtitle: "Best Deals",
    description: "Competitive pricing and flexible payment options to make your dream car a reality.",
  },
];

const ChooseUs: React.FC = () => {
  return (
    <section className="part bg-white">
        <div className="wrapper">
          <h2 className="part-title">Why Choose Us</h2>
          <h2 className="part-title-sub mb-3">Experience the difference with every drive</h2>
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
  );
};

export default ChooseUs;
