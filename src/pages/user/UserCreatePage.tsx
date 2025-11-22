import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fomy } from "../../helpers/cssm/fomy";
import { userFieldSet } from "../../bootstrap/stream/userFieldSet";
import DashboardLayout from "../../blend/layouts/DashboardLayout";
import InputField from "../../blend/formc/InputField";
import TextArea from "../../blend/formc/TextArea";
import InputCropFile from "../../blend/formc/InputCropFile";
import Submit from "../../blend/one/Submit";
import useUserStore from "../../helpers/stores/useUserStore";

const UserCreatePage: React.FC = () => {

    const { store, loading, serverError } = useUserStore();

    const navigate = useNavigate();
    const fieldSet = fomy.refineFieldSet(userFieldSet, 'create')
    const rules = fomy.getFormRules(fieldSet, 'create')

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formError, setFormError] = useState<string>('');
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'create'));

    const onChangeForm = (name: string, value: any) => {
        const instantNewFormValues = { ...formValues, [name]: value }
        const newErrors = fomy.validateOne(name, instantNewFormValues, rules)
        setFormValues(instantNewFormValues)
        setErrors(prev => ({ ...prev, ...newErrors }))
    }

    const updateExtraFields = (newFormValue: Record<string, any>) => {
        setFormValues(prev => ({ ...prev, ...newFormValue }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const validated = fomy.validateMany(formValues, rules)
        if (!validated.allErrorsFalse) {
            setErrors(validated.updatedErrors)
            setFormError(validated.firstError)
        } else {
            const submitData = fomy.prepareSubmit(formValues)
            try {
                await store(submitData)
                if (!serverError && !loading) {
                    navigate('/admin/users')
                }
            } catch (error) {
                console.error(error)
            }
        }
    };

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Create User</h1>
            </div>
            <div className="row">
                <div className='cardbody'>
                    <form className="front-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <InputField name="first_name" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                            </div>
                            <div className="col-md-6">
                                <InputField name="email" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                            </div>
                            <div className="col-md-6">
                                <InputField name="phone" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                            </div>
                            <div className="col-md-6">
                                <InputField name="password" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <InputCropFile name="avatar" imgCropKey="default" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} updateExtraFields={updateExtraFields} />
                            </div>
                            <div className="col-md-6">
                                <TextArea name="about" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                            </div>
                        </div>

                        {serverError && <p className="error-text">{serverError}</p>}
                        {formError && <p className="error-text">{formError}</p>}

                        <Submit cto="/admin/users" loading={loading} />
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserCreatePage;
