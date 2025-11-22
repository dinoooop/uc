import React, { useEffect, useState } from "react";
import MiniBanner from "../../blend/one/MiniBanner";
import Header from "../../blend/one/Header";
import useCarStore from "../../helpers/stores/useCarStore";
import { outer } from "../../helpers/cssm/outer";
import { Link, useNavigate } from "react-router-dom";
import RangeFilter from "../../blend/formc/RangeFilter";
import { fomy } from "../../helpers/cssm/fomy";
import Footer from "../../blend/one/Footer";
import { carFieldSet } from "../../bootstrap/stream/carFieldSet";
import AccountQuickLinks from "../../blend/one/AccountQuickLinks";
import { useGeneralStore } from "../../helpers/stores/useGeneralStore";

const AccountCarListPage: React.FC = () => {
    const { items, perPage, total, index, remove, destroy, update, serverError } = useCarStore();
    const { regular, svData } = useGeneralStore()
    const navigate = useNavigate();

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

    const handleAddClick = () => {
        navigate("/cars/create");
    };

    const onClickEdit = (id: Number) => {
        navigate(`/account/cars/edit/${id}`);
    };


    const onClickDelete = (id: number) => {
        remove(id);
        destroy(id);
    }

    const onChangeForm = (name: string, value: any) => {
        const instantNewFormValues = { ...formValues, [name]: value }
        const newErrors = fomy.validateOne(name, instantNewFormValues, rules)
        setFormValues(instantNewFormValues)
        setErrors(prev => ({ ...prev, ...newErrors }))
    }

    return (
        <>
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
                                                    <img
                                                        src={`${outer.showImage(car.image, 'thumb')}`}
                                                        alt={car.title}
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <h2 className="card-title">{car.title}</h2>
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

export default AccountCarListPage;
