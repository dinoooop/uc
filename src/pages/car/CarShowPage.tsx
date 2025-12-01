import React from "react";
import DashboardLayout from "../../blend/layouts/DashboardLayout";
import PinCarShow from "../../blend/templates/PinCarShow";

const CarShowPage: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Car</h1>
            </div>
            <PinCarShow pinFrom="admin" />
        </DashboardLayout>
    );
};

export default CarShowPage;
