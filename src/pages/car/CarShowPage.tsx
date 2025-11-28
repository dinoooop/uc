import React, { useEffect } from "react";
import DashboardLayout from "../../blend/layouts/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import useCarStore from "../../helpers/stores/useCarStore";
import { outer } from "../../helpers/cssm/outer";
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
