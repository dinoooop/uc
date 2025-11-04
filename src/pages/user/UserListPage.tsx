import React, { useEffect } from "react";
import DashboardLayout from "../../blend/layouts/DashBoardLayout";
import useUserStore from "./useUserStore";
import AppIcon from "../../blend/one/AppIcon";

const UserListPage: React.FC = () => {
    const { items, index, remove, destroy, sem, reset } = useUserStore();

    useEffect(() => {
        reset();
        index();
    }, [index, reset]);

    const handleDelete = (id: number) => {
        remove(id);
        destroy(id);
    }

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Users</h1>
                <div className="other-actions">
                    <AppIcon to="create" icon="add" />
                </div>
            </div>
            <div className="row">
                <div className='cardbody'>
                    {sem && <p className='red-alert'>{sem}</p>}
                    <table className="index-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td className='action'>
                                        <AppIcon onClick={(arg) => handleDelete(Number(arg))} itemId={item.id} icon="trash" />
                                        <AppIcon to={`/admin/users/${item.id}/edit`} icon="edit" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default UserListPage;
