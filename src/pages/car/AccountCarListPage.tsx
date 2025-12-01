import React, { useEffect } from "react";
import MiniBanner from "../../blend/one/MiniBanner";
import Header from "../../blend/one/Header";
import { Link } from "react-router-dom";
import Footer from "../../blend/one/Footer";
import AccountQuickLinks from "../../blend/one/AccountQuickLinks";
import AccountProtectedLayout from "../../blend/layouts/AccountProtectedLayout";
import PinCarList from "../../blend/templates/PinCarList";
import { useSvStore } from "../../helpers/sv/useSvStore";

const AccountCarListPage: React.FC = () => {
    const { regular } = useSvStore()

    useEffect(() => {
        regular()
    }, [])

    return (
        <AccountProtectedLayout>
            <Header />
            <MiniBanner page="my_cars" />
            <div className="part bg-grey">
                <div className="wrapper-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <AccountQuickLinks />
                        </div>
                        <div className="col-md-9">
                            <PinCarList pinFrom="account" indexPayload={{ action: 'account_car_list' }} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Link to="/account/cars/create"
                className="floating-add-btn"
                title="Add new"
            >
                +
            </Link>
        </AccountProtectedLayout>
    );
};

export default AccountCarListPage;
