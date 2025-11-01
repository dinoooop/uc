import React from "react";

const LatestUpload: React.FC = () => {
  // Dummy content — replace later with API data
  const cars = [
    {
      name: "Honda Civic 2021",
      brand: "Honda",
      description:
        "Meticulously maintained by the owner. Great mileage and smooth driving experience. Perfect for city and highway use.",
      year: 2021,
      price: "$18,500",
      travelled: "25,000 km",
      image: "/images/default-car.jpg",
    },
    {
      name: "Toyota Corolla 2020",
      brand: "Toyota",
      description:
        "Reliable and fuel-efficient sedan. Regularly serviced with a clean interior. Ideal for daily commuting and long drives.",
      year: 2020,
      price: "$16,000",
      travelled: "30,000 km",
      image: "/images/default-car.jpg",
    },
  ];

  return (
    <section className="part bg-white">
      <div className="wrapper">
        <h2 className="part-title">Latest Upload</h2>
        <h3 className="part-title-sub mb-4">Browse our extensive collection</h3>
        <div className="rolls">
          {
            cars.map(car => (
              <div className="roll">
                <div className="roll-image">
                  <img src={car.image} alt={car.name} />
                </div>
                <div className="roll-details">
                  <h3 className="roll-title">{car.name}</h3>
                  <p className="roll-title-sub">{car.brand}</p>
                  <p className="roll-description">{car.description}</p>
                  <ul className="car-meta">
                    <li><strong>Year:</strong> {car.year}</li>
                    <li><strong>Price:</strong> {car.price}</li>
                    <li><strong>Travelled:</strong> {car.travelled}</li>
                  </ul>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </section>
  );
};

export default LatestUpload;
