import React, { useEffect } from "react";
import useCarStore from "../../helpers/stores/useCarStore";
import { outer } from "../../helpers/cssm/outer";
import { Link } from "react-router-dom";
import { sv } from "../../helpers/sv/sv";

const LatestUpload: React.FC = () => {
  const { items, index } = useCarStore();

  // Dummy content — replace later with API data
  useEffect(() => {
    index({ action: 'latest_cars' });
  }, []);

  return (
    <section className="part bg-white">
      <div className="wrapper">
        <h2 className="part-title">Latest Upload</h2>
        <h3 className="part-title-sub mb-4">Browse our extensive collection</h3>
        <div className="rolls">
          {
            items.map(car => (
              <div className="roll" key={car.id}>
                <div className="roll-image">
                  <Link to={`/cars/${car.id}`}>
                    <img src={outer.showImage(car.image, 'cover')} alt={car.title} />
                  </Link>
                </div>
                <div className="roll-details">
                  <h3 className="roll-title">{car.title}</h3>
                  <p className="roll-title-sub">{car.brand.title}</p>
                  <p className="roll-description">{car.description}</p>
                  <ul className="car-meta">
                    <li><strong>Year: </strong>{car.year}</li>
                    <li><strong>Price: </strong>{sv.currency()} {car.price}</li>
                    <li><strong>Travelled: </strong>{car.travelled}</li>
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
