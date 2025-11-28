import React, { useEffect, useState } from "react";
import DashboardLayout from "../../blend/layouts/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import useBrandStore from "../../helpers/stores/useBrandStore";
import InputField from "../../blend/formc/InputField";
import { fomy } from "../../helpers/cssm/fomy";
import TextArea from "../../blend/formc/TextArea";
import Submit from "../../blend/one/Submit";
import { brandFieldSet } from "../../bootstrap/stream/brandFieldSet";
import InputCropFile from "../../blend/formc/InputCropFile";

const BrandEditPage: React.FC = () => {
    const { update, loading, serverError, show, item } = useBrandStore();

    const navigate = useNavigate();
    const fieldSet = fomy.refineFieldSet(brandFieldSet, 'edit');
    const rules = fomy.getFormRules(fieldSet, 'edit');

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState<string>('');
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'edit'));

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            const id = parseInt(params.id);
            show(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    useEffect(() => {
        if (item) {
            setFormValues(prev => ({ ...prev, ...item }));
        }
    }, [item]);

    const onChangeForm = (name: string, value: any) => {
        const instantNewFormValues = { ...formValues, [name]: value };
        const newErrors = fomy.validateOne(name, instantNewFormValues, rules);
        setFormValues(instantNewFormValues);
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
        } else {
            const submitData = fomy.prepareSubmit(formValues);
            try {
                await update(submitData);
                if (!serverError && !loading) {
                    navigate('/admin/brands');
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Edit Brand</h1>
            </div>
            <div className="row">
                <div className='cardbody'>
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

                        <Submit cto="/admin/brands" />
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BrandEditPage;
