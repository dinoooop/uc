import React, { useEffect, useState } from "react";
import MiniBanner from "../../blend/one/MiniBanner";
import Header from "../../blend/one/Header";
import useCarStore from "../../helpers/stores/useCarStore";
import { outer } from "../../helpers/cssm/outer";
import { useNavigate } from "react-router-dom";
import RangeFilter from "../../blend/formc/RangeFilter";
import { fomy } from "../../helpers/cssm/fomy";
import { carListData } from "../../../trash/carListData";
import { carListRule } from "../../../trash/carListRule";
import Footer from "../../blend/one/Footer";
import { useGeneralStore } from "../../helpers/stores/useGeneralStore";
import { carFieldSet } from "../../bootstrap/stream/carFieldSet";

const FrontCarListPage: React.FC = () => {
    const { items, index, destroy, remove } = useCarStore();
    const { regular, svData } = useGeneralStore()
    const navigate = useNavigate()

    const fieldSet = fomy.refineFieldSet(carFieldSet, 'index')
    const rules = fomy.getFormRules(fieldSet, 'index')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'index'));


    useEffect(() => {
        regular()
    }, [])

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        index(data);
    }, [formValues]);

    const onChangeForm = (name: string, value: any) => {
        const instantNewFormValues = { ...formValues, [name]: value }
        const newErrors = fomy.validateOne(name, instantNewFormValues, rules)
        setFormValues(instantNewFormValues)
        setErrors(prev => ({ ...prev, ...newErrors }))
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
                                                        alt={car.title}
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <h2 className="card-title">{car.title}</h2>
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
        </>
    );
};

export default FrontCarListPage;
