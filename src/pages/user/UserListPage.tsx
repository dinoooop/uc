import React, { useEffect, useState } from "react";
import DashboardLayout from "../../blend/layouts/DashboardLayout";
import useUserStore from "../../helpers/stores/useUserStore";
import { fomy } from "../../helpers/cssm/fomy";
import AppIcon from "../../blend/one/AppIcon";
import { userFieldSet } from "../../bootstrap/stream/userFieldSet";
import InputField from "../../blend/formc/InputField";

const UserListPage: React.FC = () => {
    const { items, perPage, total, index, remove, destroy, update, serverError } = useUserStore();

    const fieldSet = fomy.refineFieldSet(userFieldSet, 'index')
    const rules = fomy.getFormRules(fieldSet, 'index')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'index'));

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        index(data);
        // showUser(urlParamPatientId);
    }, [formValues]);

    const handleDelete = (id: number) => {
        remove(id);
        destroy(id);
    }

    const handlePagination = (pageNo: number) => {
        setFormValues(prev => ({ ...prev, page: pageNo }));
    }

    const onChangeForm = (name: string, value: any) => {
        const instantNewFormValues = { ...formValues, [name]: value }
        const newErrors = fomy.validateOne(name, instantNewFormValues, rules)
        setFormValues(instantNewFormValues)
        setErrors(prev => ({ ...prev, ...newErrors }))
    }



    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Users</h1>
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
                                    <th>User Name</th>
                                    <th>Brand</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.first_name}</td>
                                            <td>{item.email}</td>
                                            <td className='action'>
                                                <AppIcon onClick={(arg) => handleDelete(Number(arg))} itemId={item.id} icon="trash" />
                                                <AppIcon to={`/admin/users/edit/${item.id}`} icon="edit" />
                                                <AppIcon to={`/admin/users/security/${item.id}`} icon="lock" />
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
    )
};

export default UserListPage;
