import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../blend/layouts/DashBoardLayout";
import useUserStore from "./useUserStore";
import InputField from "../../blend/formc/InputField";

const UserEditPage: React.FC = () => {
    const { update, loading, sem, show, reset, item } = useUserStore();
    const navigate = useNavigate();
    const params = useParams();

    const [formValues, setFormValues] = useState<{ id?: number; name: string; email: string }>({ id: undefined, name: '', email: '' });
    const [formError, setFormError] = useState('');

    useEffect(() => {
        reset();
        if (params.id) {
            const id = parseInt(params.id);
            show(id);
        }
    }, [params]);

    useEffect(() => {
        if (item) {
            setFormValues({ id: item.id, name: item.name ?? '', email: item.email ?? '' });
        }
    }, [item]);

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
            await update(formValues);
            navigate('/users');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Edit User</h1>
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

export default UserEditPage;
