import React, { useState, useEffect } from "react";

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
      "UC-Collection made buying my pre-owned car so easy. The team was transparent, friendly, and professional throughout the process.",
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
    }, 1000 * 5); // auto slide every 4s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonial section">
      <div className="container text-center">
        <h2 className="side-heading">What Our Customers Say</h2>
        <p className="side-heading-sub">Real stories from our happy car owners</p>

        <div className="testimonial-carousel">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={`testimonial-item ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <img src={item.image} alt={item.name} className="testimonial-img" />
              <p className="testimonial-quote">“{item.quote}” - 
                <strong className="testimonial-name">{item.name}</strong>
              </p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Testimonial;
