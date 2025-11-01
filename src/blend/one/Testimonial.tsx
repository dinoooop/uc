import React, { useState, useEffect } from "react";
import config from "../../config";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Miller",
    image: "/images/customer1.jpg",
    quote:
      config.appName + " made buying my pre-owned car so easy. The team was transparent, friendly, and professional throughout the process.",
  },
  {
    id: 2,
    name: "Sophia Johnson",
    image: "/images/customer2.jpg",
    quote:
      "Amazing experience! The car was exactly as described, and I got it at a great price. Highly recommended for anyone looking for reliable used cars.",
  },
  {
    id: 3,
    name: "David Brown",
    image: "/images/customer3.jpg",
    quote:
      "Top-notch service and excellent vehicle quality. I’ll definitely come back when it’s time to upgrade again.",
  },
];

const Testimonial: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 1000 * 8); // auto slide every 4s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="part bg-grey">
      <h2 className="part-title">Our Customers Says</h2>
      <h3 className="part-title-sub mb-4">Real stories from our happy owners</h3>
      <div className="carousel">
        {testimonials.map((item, index) => (
          <div key={item.id} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
            <img src={item.image} alt={item.name} className="carousel-img" />
            <p className="carousel-quote">“{item.quote}”</p>
            <p className="carousel-name">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
