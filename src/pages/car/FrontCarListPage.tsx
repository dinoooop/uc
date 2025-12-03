import React, { useEffect, useState } from "react";
import MiniBanner from "../../blend/one/MiniBanner";
import Header from "../../blend/one/Header";
import RangeFilter from "../../blend/formc/RangeFilter";
import { fomy } from "../../helpers/cssm/fomy";
import Footer from "../../blend/one/Footer";
import { carFieldSet } from "../../bootstrap/stream/carFieldSet";
import PinCarList from "../../blend/templates/PinCarList";
import { useSvStore } from "../../helpers/sv/useSvStore";
import Checkbox from "../../blend/formc/Checkbox";
import { sv } from "../../helpers/sv/sv";

const FrontCarListPage: React.FC = () => {
    const { regular, svData } = useSvStore();
    const fieldSet = fomy.refineFieldSet(carFieldSet, 'index')
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'index'));
    const [indexPayload, setIndexPayload] = useState<Record<string, any>>({});

    useEffect(() => {
        regular()
    }, [])

    useEffect(() => {
        // set formValues from svData
        setFormValues(prev => ({
            ...prev,
            year_min: svData.year_min,
            year_max: svData.year_max,
            price_min: svData.price_min,
            price_max: svData.price_max,
            travelled_min: svData.travelled_min,
            travelled_max: svData.travelled_max,
            mileage_min: svData.mileage_min,
            mileage_max: svData.mileage_max,
        }));
    }, [svData])

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([_, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        data.action = 'front_car_list';
        setIndexPayload(data);
    }, [formValues]);

    const onChangeForm = (name: string, value: any) => {
        const instantNewFormValues = { ...formValues, [name]: value };
        setFormValues(instantNewFormValues);
    };

    const onChangeRange = (name: string, value: any) => {
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
                                    <Checkbox name="brand" fieldSet={fieldSet} formValues={formValues} onChangeForm={onChangeForm} options={sv.brands()} />
                                </div>
                                {/* Range Filters */}
                                <RangeFilter name="year" onChangeForm={onChangeRange} label="Year" min={svData.year_min} max={svData.year_max} />
                                <RangeFilter name="price" onChangeForm={onChangeRange} label="Price" min={svData.price_min} max={svData.price_max} step={1000} />
                                <RangeFilter name="travelled" onChangeForm={onChangeRange} label="Travelled (km)" min={svData.travelled_min} max={svData.travelled_max} step={1000} />
                                <RangeFilter name="mileage" onChangeForm={onChangeRange} label="Mileage (km/l)" min={svData.mileage_min} max={svData.mileage_max} step={1} />
                            </aside>
                        </div>
                        <div className="col-md-9">
                            <PinCarList pinFrom="front" indexPayload={indexPayload} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FrontCarListPage;
