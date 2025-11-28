import React from "react";
import DashboardLayout from "../../blend/layouts/DashboardLayout";
import PinCarCreate from "../../blend/templates/PinCarCreate";

const CarCreatePage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="page-header">
        <h1>Create Car</h1>
      </div>
      <div className="row">
        <div className="cardbody">
          <PinCarCreate pinFrom="admin" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CarCreatePage;
