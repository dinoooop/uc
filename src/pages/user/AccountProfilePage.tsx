import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { outer } from "../../helpers/cssm/outer";

const AccountProfileEditPage: React.FC = () => {
    const { update, loading, serverError, show, item } = useUserStore();
    const { user, logout } = useAuthStore();


    const navigate = useNavigate();
    const fieldSet = fomy.refineFieldSet(userFieldSet, 'edit')
    const rules = fomy.getFormRules(fieldSet, 'edit')

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formError, setFormError] = useState<string>('');
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'edit'));

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
                                {
                                    item && (
                                        <div className="card-page">
                                        <div className="row profile-page">
                                            <div className="col-md-4">
                                                <img
                                                    src={`${outer.showImage(item.avatar, 'cover')}`}
                                                    alt={item.first_name}
                                                    loading="lazy"
                                                />
                                            </div>

                                            <div className="col-md-8 ">
                                                <h2 className="name">{item.first_name}</h2>
                                                <h3>{item.email}</h3>
                                                <h4>Phone: {item.phone}</h4>
                                                <h2 className="mt-1">About</h2>
                                                <p className="about">{item.about}</p>
                                                <div className="mt-1">
                                                <Link to="/account/profile/edit" className="btn">Edit</Link>

                                                </div>
                                            </div>



                                        </div>
                                        </div>
                                    )
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AccountProtectedLayout>
    );
};

export default AccountProfileEditPage;
