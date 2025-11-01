import React, { useEffect, useState } from "react";
import MiniBanner from "../../blend/one/MiniBanner";
import Header from "../../blend/one/Header";
import useCarStore from "./useCarStore";
import { outer } from "../../helpers/cssm/outer";
import { useNavigate } from "react-router-dom";
import RangeFilter from "../../blend/formc/RangeFilter";
import { fomy } from "../../helpers/cssm/fomy";
import { carListData } from "../../bootstrap/stream/carListData";
import { carListRule } from "../../bootstrap/stream/carListRule";
import Footer from "../../blend/one/Footer";
import { useGeneralStore } from "../front/useGeneralStore";

const FrontCarListPage: React.FC = () => {
    const { items, index, reset, destroy, remove } = useCarStore();
    const { regular, svData } = useGeneralStore()
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState<Record<string, any>>(carListData);
    const [errors, setErrors] = useState<Record<string, string>>({})


    useEffect(() => {
        regular()
    }, [])

    useEffect(() => {
        reset();
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        index(data);
    }, [formValues]);

    const handleAddClick = () => {
        navigate("/cars/create");
    };

    const onClickEdit = (id: Number) => {
        navigate(`/cars/edit/${id}`);
    };


    const onClickDelete = (id: number) => {
        remove(id);
        destroy(id);
    }

    const onChangeForm = (name: string, value: any) => {
        const newFormValues = fomy.setval(name, value)
        setFormValues(prev => ({ ...prev, ...newFormValues }))

        if (carListRule[name]) {
            const instantNewFormValues = { ...formValues, ...newFormValues }
            const newErrors = fomy.validateOne(name, value, instantNewFormValues, carListRule[name])
            setErrors(prev => ({ ...prev, ...newErrors }))
        }
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
                                    <label><input type="checkbox" /> Toyota</label>
                                    <label><input type="checkbox" /> Honda</label>
                                    <label><input type="checkbox" /> BMW</label>
                                    <label><input type="checkbox" /> Tesla</label>
                                </div>

                                {/* Range Filters */}
                                <RangeFilter name="year" formValues={formValues} onChangeForm={onChangeForm} errors={errors} label="Year" min={svData.min_year} max={svData.max_year} />
                                <RangeFilter name="price" formValues={formValues} onChangeForm={onChangeForm} errors={errors} label="Price ($)" min={svData.min_price} max={svData.max_price} step={10000} />
                                <RangeFilter name="travelled" formValues={formValues} onChangeForm={onChangeForm} errors={errors} label="Travelled (km)" min={0} max={200000} step={1000} />
                                <RangeFilter name="mileage" formValues={formValues} onChangeForm={onChangeForm} errors={errors} label="Mileage (km/l)" min={5} max={40} step={1} />
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
                                                    <img
                                                        src={`${outer.showImage(car.image, 'thumb')}`}
                                                        alt={car.name}
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <h2 className="card-title">{car.name}</h2>
                                                    <div className="card-actions">
                                                        <button className="btn" onClick={() => onClickEdit(car.id)}>
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button className="btn" onClick={() => onClickDelete(car.id)}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                    <p className="card-subtitle">{car.brand}</p>
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
            <button
                className="floating-add-btn"
                onClick={handleAddClick}
                title="Add new"
            >
                +
            </button>
        </>
    );
};

export default FrontCarListPage;
