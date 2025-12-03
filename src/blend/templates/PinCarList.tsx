// PinCarList.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useCarStore from "../../helpers/stores/useCarStore";
import { outer } from "../../helpers/cssm/outer";
import AppIcon from "../one/AppIcon";
import { sv } from "../../helpers/sv/sv";

interface PinCarListProps {
  /**
   * pinFrom controls a few small UI differences:
   * - "front" -> plain public list (no edit/delete, no floating add)
   * - "account" -> shows edit/delete actions and floating add button
   * - "admin" -> shows edit action (route uses /admin) and floating add button links to admin create
   */
  pinFrom?: "front" | "account" | "admin";
  /**
   * optional index payload to pass when loading the list (eg. { action: 'account_car_list' })
   */
  indexPayload?: Record<string, any>;
}

const PinCarList: React.FC<PinCarListProps> = ({ pinFrom = "front", indexPayload = {} }) => {
  const { items, index, remove, destroy } = useCarStore();

  useEffect(() => {
    // load list; caller can control specific action via indexPayload
    index(indexPayload);
  }, [JSON.stringify(indexPayload)]); // shallow watch payload

  const handleDelete = (id: number) => {
    // optimistic local remove then server destroy (same pattern used in AccountCarList)
    remove(id);
    destroy(id);
  };

  const linkFor = (carId: number) => {
    if (pinFrom === "account") return `/account/cars/${carId}`;
    if (pinFrom === "admin") return `/admin/cars/${carId}`;
    return `/cars/${carId}`;
  };

  const editLinkFor = (carId: number) => {
    if (pinFrom === "account") return `/account/cars/edit/${carId}`;
    if (pinFrom === "admin") return `/admin/cars/edit/${carId}`;
    return `/cars/edit/${carId}`;
  };

  const createLinkFor = () => {
    if (pinFrom === "account") return "/account/cars/create";
    if (pinFrom === "admin") return "/admin/cars/create";
    return "/cars/create";
  };

  return (
    <>
      <main className="main-section">
        {items.length === 0 ? (
          <p className="text-center muted">No cars available.</p>
        ) : (
          <div className="card-grid">
            {items.map((car: any) => (
              <div className="card shadow rounded" key={car.id}>
                <div className="card-image">
                  <Link to={linkFor(car.id)}>
                    <img src={`${outer.showImage(car.image, "thumb")}`} alt={car.title} loading="lazy" />
                  </Link>
                </div>
                <div className="card-body">
                  <h2 className="card-title">{car.title}</h2>

                  {/* actions available for account/admin */}
                  {(pinFrom === "account" || pinFrom === "admin") && (
                    <div className="card-actions">
                      {/* delete only for account (owner) or admin - keep both for safety */}
                      <AppIcon onClick={(arg) => handleDelete(Number(arg))} itemId={car.id} icon="trash" />
                      <AppIcon to={editLinkFor(car.id)} icon="edit" />
                    </div>
                  )}

                  <p className="card-subtitle">{car.brand?.title}</p>
                  <div className="card-details">
                    <span className="card-price">{sv.currency()} {car.price}</span>
                    <span className="card-text">{car.travelled} km</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* floating add button for account/admin */}
      {(pinFrom === "account" || pinFrom === "admin") && (
        <Link to={createLinkFor()} className="floating-add-btn" title="Add new">
          +
        </Link>
      )}
    </>
  );
};

export default PinCarList;
