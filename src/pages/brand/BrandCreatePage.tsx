import React, { useState } from "react";
import DashboardLayout from "../../blend/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import useBrandStore from "../../helpers/stores/useBrandStore";
import InputField from "../../blend/formc/InputField";
import TextArea from "../../blend/formc/TextArea";
import Submit from "../../blend/one/Submit";
import { fomy } from "../../helpers/cssm/fomy";
import { brandFieldSet } from "../../bootstrap/stream/brandFieldSet";
import InputCropFile from "../../blend/formc/InputCropFile";

const BrandCreatePage: React.FC = () => {
    const { store, loading, serverError } = useBrandStore();
    const navigate = useNavigate();

    const fieldSet = fomy.refineFieldSet(brandFieldSet, "create");
    const rules = fomy.getFormRules(fieldSet, "create");

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState("");
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, "create"));

    const onChangeForm = (name: string, value: any) => {
        const newValues = { ...formValues, [name]: value };
        const newErrors = fomy.validateOne(name, newValues, rules);

        setFormValues(newValues);
        setErrors(prev => ({ ...prev, ...newErrors }));
    };

    const updateExtraFields = (newFormValue: Record<string, any>) => {
        setFormValues(prev => ({ ...prev, ...newFormValue }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validated = fomy.validateMany(formValues, rules);
        if (!validated.allErrorsFalse) {
            setErrors(validated.updatedErrors);
            setFormError(validated.firstError);
            return;
        }

        try {
            await store(fomy.prepareSubmit(formValues));
            navigate("/admin/brands");
        } catch { }
    };

    return (
        <DashboardLayout>
            <div className="page-header"><h1>Create Brand</h1></div>

            <div className="row">
                <div className="cardbody">
                    <form className="front-form" onSubmit={handleSubmit}>

                        <div className="row">
                            <div className="col-md-6">
                                <InputField name="title" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                                <TextArea name="description" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                            </div>
                            <div className="col-md-6">
                                <InputCropFile name="logo" imgCropKey="default" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} updateExtraFields={updateExtraFields} />
                            </div>
                        </div>


                        {serverError && <p className="error-text">{serverError}</p>}
                        {formError && <p className="error-text">{formError}</p>}

                        <Submit cto="/admin/brands" loading={loading} />
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BrandCreatePage;
