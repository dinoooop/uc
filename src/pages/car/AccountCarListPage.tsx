import React, { useEffect } from "react";
import MiniBanner from "../../blend/one/MiniBanner";
import Header from "../../blend/one/Header";
import useCarStore from "../../helpers/stores/useCarStore";
import { outer } from "../../helpers/cssm/outer";
import { Link } from "react-router-dom";
import Footer from "../../blend/one/Footer";
import AccountQuickLinks from "../../blend/one/AccountQuickLinks";
import { useGeneralStore } from "../../helpers/stores/useGeneralStore";
import AppIcon from "../../blend/one/AppIcon";
import AccountProtectedLayout from "../../blend/layouts/AccountProtectedLayout";

const AccountCarListPage: React.FC = () => {
    const { items, index, remove, destroy } = useCarStore();
    const { regular } = useGeneralStore()

    useEffect(() => {
        regular()
        index({action: 'account_car_list'});
    }, [])

    const handleDelete = (id: number) => {
        remove(id);
        destroy(id);
    }

    return (
        <AccountProtectedLayout>
            <Header />
            <MiniBanner page="my_cars" />
            <div className="part bg-grey">
                <div className="wrapper-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <AccountQuickLinks />

                        </div>
                        <div className="col-md-9">
                            <main className="main-section">

                                {items.length === 0 ? (
                                    <p className="text-center muted">No cars available.</p>
                                ) : (
                                    <div className="card-grid">
                                        {items.map((car) => (
                                            <div className="card shadow rounded" key={car.id}>
                                                <div className="card-image">
                                                    <Link to={`/account/cars/${car.id}`}>
                                                    <img
                                                        src={`${outer.showImage(car.image, 'thumb')}`}
                                                        alt={car.title}
                                                        loading="lazy"
                                                    />
                                                    </Link>
                                                </div>
                                                <div className="card-body">
                                                    <h2 className="card-title">{car.title}</h2>
                                                    <div className="card-actions">
                                                        <AppIcon onClick={(arg) => handleDelete(Number(arg))} itemId={car.id} icon="trash" />
                                                        <AppIcon to={`/account/cars/edit/${car.id}`} icon="edit" />
                                                    </div>
                                                    <p className="card-subtitle">{car.brand.title}</p>
                                                    <div className="card-details">
                                                        <span className="card-price">${car.price}</span>
                                                        <span className="card-text">{car.travelled} km</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </main>
                        </div>
                    </div>
                </div>



            </div>
            <Footer />
            <Link to="/account/cars/create"
                className="floating-add-btn"
                title="Add new"
            >
                +
            </Link>
        </AccountProtectedLayout>
    );
};

export default AccountCarListPage;
