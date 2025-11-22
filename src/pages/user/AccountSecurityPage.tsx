import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../../helpers/stores/useUserStore";
import InputField from "../../blend/formc/InputField";
import { fomy } from "../../helpers/cssm/fomy";
import Submit from "../../blend/one/Submit";
import { userFieldSet } from "../../bootstrap/stream/userFieldSet";
import AccountProtectedLayout from "../../blend/layouts/AccountProtectedLayout";
import Header from "../../blend/one/Header";
import MiniBanner from "../../blend/one/MiniBanner";
import AccountQuickLinks from "../../blend/one/AccountQuickLinks";
import { useAuthStore } from "../../helpers/stores/useAuthStore";

const AccountSecurityPage: React.FC = () => {
    const { update, loading, serverError, show, item } = useUserStore();
    const { user, logout } = useAuthStore();


    const navigate = useNavigate();
    const fieldSet = fomy.refineFieldSet(userFieldSet, 'security')
    const rules = fomy.getFormRules(fieldSet, 'security')

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formError, setFormError] = useState<string>('');
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'security'));

    const params = useParams();

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
                    // navigate('/account/profile')
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
                                        <InputField name="old_password" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                                        <InputField name="new_password" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                                        <InputField name="confirm_password" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
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

export default AccountSecurityPage;
