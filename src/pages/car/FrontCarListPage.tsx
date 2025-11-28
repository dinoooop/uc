import React, { useEffect, useState } from "react";
import MiniBanner from "../../blend/one/MiniBanner";
import Header from "../../blend/one/Header";
import useCarStore from "../../helpers/stores/useCarStore";
import { outer } from "../../helpers/cssm/outer";
import RangeFilter from "../../blend/formc/RangeFilter";
import { fomy } from "../../helpers/cssm/fomy";
import Footer from "../../blend/one/Footer";
import { useGeneralStore } from "../../helpers/stores/useGeneralStore";
import { carFieldSet } from "../../bootstrap/stream/carFieldSet";
import { Link } from "react-router-dom";
import useBrandStore from "../../helpers/stores/useBrandStore";

const FrontCarListPage: React.FC = () => {
    const { items, index } = useCarStore();
    const { regular, svData } = useGeneralStore()
    const { items: brandItems, index: brandIndex } = useBrandStore();

    const fieldSet = fomy.refineFieldSet(carFieldSet, 'index')
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'index'));


    useEffect(() => {
        regular()
    }, [])

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([_, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        index(data);
        brandIndex();
    }, [formValues]);

    const onChangeForm = (name: string, value: any) => {
        const instantNewFormValues = { ...formValues, [name]: value }
        setFormValues(instantNewFormValues)
    }

    return (
        <>
            <Header />
            <MiniBanner page="car_list" />
            <div className="part bg-grey">
                <div className="wrapper-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <aside className="sidebar">
                                <h3>Filters</h3>

                                {/* Brand Filter */}
                                <div className="filter-group">
                                    <h4>Brands</h4>
                                    {brandItems.map((brand) => (
                                        <label key={brand.id}>
                                            <input type="checkbox" /> {brand.title}
                                        </label>
                                    ))}
                                </div>

                                {/* Range Filters */}
                                <RangeFilter name="year" onChangeForm={onChangeForm} label="Year" min={svData.min_year} max={svData.max_year} />
                                <RangeFilter name="price" onChangeForm={onChangeForm} label="Price ($)" min={svData.min_price} max={svData.max_price} step={1000} />
                                <RangeFilter name="travelled" onChangeForm={onChangeForm} label="Travelled (km)" min={svData.min_travelled} max={svData.max_travelled} step={1000} />
                                <RangeFilter name="mileage" onChangeForm={onChangeForm} label="Mileage (km/l)" min={svData.min_mileage} max={100} step={1} />
                            </aside>
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
                                                    <Link to={`/cars/${car.id}`}>
                                                    <img
                                                        src={`${outer.showImage(car.image, 'thumb')}`}
                                                        alt={car.title}
                                                        loading="lazy"
                                                    />
                                                    </Link>
                                                </div>
                                                <div className="card-body">
                                                    <h2 className="card-title">{car.title}</h2>
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
        </>
    );
};

export default FrontCarListPage;
