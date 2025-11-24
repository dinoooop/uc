import React, { useEffect, useState } from "react";
import DashboardLayout from "../../blend/layouts/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../../helpers/stores/useUserStore";
import InputField from "../../blend/formc/InputField";
import { fomy } from "../../helpers/cssm/fomy";
import Submit from "../../blend/one/Submit";
import { userFieldSet } from "../../bootstrap/stream/userFieldSet";

const UserSecurityPage: React.FC = () => {
    const { update, loading, serverError } = useUserStore();

    const navigate = useNavigate();
    const fieldSet = fomy.refineFieldSet(userFieldSet, 'security')
    const rules = fomy.getFormRules(fieldSet, 'security')

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formError, setFormError] = useState<string>('');
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'security'));

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            setFormValues(prev => ({ ...prev, id: params.id }))
        }
    }, [params])


    const onChangeForm = (name: string, value: any) => {
        const instantNewFormValues = { ...formValues, [name]: value }
        const newErrors = fomy.validateOne(name, instantNewFormValues, rules)
        setFormValues(instantNewFormValues)
        setErrors(prev => ({ ...prev, ...newErrors }))
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
                <h1>Security</h1>
            </div>
            <div className='cardbody'>
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
                    <Submit cto="/admin/users" />
                </form>
            </div>
        </DashboardLayout>
    );
};

export default UserSecurityPage;
