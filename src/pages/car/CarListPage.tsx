import React, { useEffect, useState } from "react";
import MiniBanner from "../../blend/one/MiniBanner";
import Header from "../../blend/one/Header";
import useCarStore from "./useCarStore";

const CarListPage: React.FC = () => {
    const { items, index, reset } = useCarStore();

    useEffect(() => {
        reset()
        index();
    }, []);

    return (
        <>
            <Header />
            <MiniBanner page="car_list" />
            <div className="car-list section">
                <h1 className="title text-center">Available Cars</h1>

                {items.length === 0 ? (
                    <p className="text-center muted">No cars available.</p>
                ) : (
                    <div className="car-grid">
                        {items.map((car) => (
                            <div className="card car-card shadow rounded" key={car.id}>
                                <div className="card-image">
                                    <img
                                        src={"/images/default-car.jpg"}
                                        alt={car.name}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="card-body">
                                    <h2 className="car-title">{car.name}</h2>
                                    <p className="car-brand">{car.brand}</p>
                                    <div className="car-details">
                                        <span className="car-price">${car.price}</span>
                                        <span className="car-km">{car.travelled} km</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </>
    )

}

export default CarListPage;