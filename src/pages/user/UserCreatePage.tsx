import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../blend/layouts/DashBoardLayout";
import useUserStore from "./useUserStore";
import InputField from "../../blend/formc/InputField";

const UserCreatePage: React.FC = () => {
    const { store, loading, sem } = useUserStore();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({ name: '', email: '', password: '' });
    const [formError, setFormError] = useState('');

    const onChangeForm = (name: string, value: unknown) => {
        setFormValues(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formValues.name || !formValues.email) {
            setFormError('Name and email are required');
            return;
        }
        try {
            await store(formValues);
            navigate('/users');
        } catch (err) {
            console.error(err);
        }
    }

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
                                <InputField name="name" formValues={formValues} errors={{}} onChangeForm={onChangeForm} />
                            </div>
                            <div className="col-md-6">
                                <InputField name="email" type="email" formValues={formValues} errors={{}} onChangeForm={onChangeForm} />
                            </div>
                            <div className="col-md-6">
                                <InputField name="password" type="password" formValues={formValues} errors={{}} onChangeForm={onChangeForm} />
                            </div>
                        </div>

                        {sem && <p className="error-text">{sem}</p>}
                        {formError && <p className="error-text">{formError}</p>}

                        <button type="submit" className="btn" disabled={loading}>Submit</button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default UserCreatePage;
