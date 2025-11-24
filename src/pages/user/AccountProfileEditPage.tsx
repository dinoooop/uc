import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../helpers/stores/useUserStore";
import InputField from "../../blend/formc/InputField";
import { fomy } from "../../helpers/cssm/fomy";
import TextArea from "../../blend/formc/TextArea";
import InputCropFile from "../../blend/formc/InputCropFile";
import Submit from "../../blend/one/Submit";
import { userFieldSet } from "../../bootstrap/stream/userFieldSet";
import AccountProtectedLayout from "../../blend/layouts/AccountProtectedLayout";
import Header from "../../blend/one/Header";
import MiniBanner from "../../blend/one/MiniBanner";
import AccountQuickLinks from "../../blend/one/AccountQuickLinks";
import { useAuthStore } from "../../helpers/stores/useAuthStore";

const ProfileEditPage: React.FC = () => {
    const { update, loading, serverError, show, item } = useUserStore();
      const { user } = useAuthStore();
    

    const navigate = useNavigate();
    const fieldSet = fomy.refineFieldSet(userFieldSet, 'edit')
    const rules = fomy.getFormRules(fieldSet, 'edit')

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formError, setFormError] = useState<string>('');
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'edit'));


    useEffect(() => {
        if (user && user.id) {
            show(user.id)
        }
    }, [user])

    useEffect(() => {
        setFormValues(prev => ({ ...prev, ...item }))
    }, [item])

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
                await update(submitData)
                if (!serverError && !loading) {
                    navigate('/account/profile')
                }
            } catch (error) {
                console.error(error)
            }
        }
    };

    return (
        <AccountProtectedLayout>
            <Header />
            <MiniBanner page="car_create" />

            <div className="part bg-grey">
                <div className="wrapper-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <AccountQuickLinks />
                        </div>
                        <div className="col-md-9">
                            <form className="front-form" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <InputField name="first_name" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                                        <InputField name="email" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                                        <InputField name="phone" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                                        <TextArea name="about" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                                    </div>

                                    <div className="col-md-6">
                                        <InputCropFile name="avatar" imgCropKey="default" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} updateExtraFields={updateExtraFields} />
                                    </div>

                                </div>



                                {serverError && <p className="error-text">{serverError}</p>}
                                {formError && <p className="error-text">{formError}</p>}

                                <Submit cto="/account/profile" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AccountProtectedLayout>
    );
};

export default ProfileEditPage;
