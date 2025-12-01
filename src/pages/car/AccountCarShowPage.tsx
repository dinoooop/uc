import React from "react";
import PinCarShow from "../../blend/templates/PinCarShow";
import Header from "../../blend/one/Header";
import AccountProtectedLayout from "../../blend/layouts/AccountProtectedLayout";
import MiniBanner from "../../blend/one/MiniBanner";
import AccountQuickLinks from "../../blend/one/AccountQuickLinks";

const AccountCarShowPage: React.FC = () => {


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
                            <PinCarShow />
                        </div>
                    </div>
                </div>
            </div>
        </AccountProtectedLayout>
    );
};

export default AccountCarShowPage;
