import React, { useEffect, useState } from "react";
import DashboardLayout from "../../blend/layouts/DashboardLayout";
import useBrandStore from "../../helpers/stores/useBrandStore";
import { fomy } from "../../helpers/cssm/fomy";
import AppIcon from "../../blend/one/AppIcon";
import { brandFieldSet } from "../../bootstrap/stream/brandFieldSet";
import InputField from "../../blend/formc/InputField";

const BrandListPage: React.FC = () => {
    const { items, index, remove, destroy, serverError } = useBrandStore();

    const fieldSet = fomy.refineFieldSet(brandFieldSet, 'index');
    const rules = fomy.getFormRules(fieldSet, 'index');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'index'));

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([_, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        index(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues]);

    const handleDelete = (id: number) => {
        remove(id);
        destroy(id);
    };

    const onChangeForm = (name: string, value: any) => {
        const instantNewFormValues = { ...formValues, [name]: value };
        const newErrors = fomy.validateOne(name, instantNewFormValues, rules);
        setFormValues(instantNewFormValues);
        setErrors(prev => ({ ...prev, ...newErrors }));
    };

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Brands</h1>
                <div className="other-actions">
                    <AppIcon to="create" icon="add" />
                    <div className="search">
                        <InputField name="search" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className='cardbody'>
                    <div className="index-table-container">
                        {serverError && <p className='red-alert'>{serverError}</p>}

                        <table className="index-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Brand Title</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td className='front action'>
                                                <AppIcon onClick={(arg) => handleDelete(Number(arg))} itemId={item.id} icon="trash" />
                                                <AppIcon to={`/admin/brands/edit/${item.id}`} icon="edit" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default BrandListPage;
