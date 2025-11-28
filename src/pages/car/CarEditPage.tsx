import React from "react";
import DashboardLayout from "../../blend/layouts/DashboardLayout";
import PinCarEdit from "../../blend/templates/PinCarEdit";

const CarEditPage: React.FC = () => {

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Edit Car</h1>
            </div>
            <div className="row">
                <div className='cardbody'>
                    <PinCarEdit pinFrom="admin" />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CarEditPage;
