import React from "react";
import MiniBanner from "../../blend/one/MiniBanner";
import Header from "../../blend/one/Header";
import Footer from "../../blend/one/Footer";
import AccountQuickLinks from "../../blend/one/AccountQuickLinks";
import AccountProtectedLayout from "../../blend/layouts/AccountProtectedLayout";
import PinCarCreate from "../../blend/templates/PinCarCreate";

const AccountCarCreatePage: React.FC = () => {
  return (
    <AccountProtectedLayout>
      <Header />
      <MiniBanner page="car_create" />

      <div className="part bg-grey">
        <div className="wrapper-fluid">
          <div className="row">
            <div className="col-md-3">
              <AccountQuickLinks />
            </div>
            <div className="col-md-9">
              <PinCarCreate pinFrom="account" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </AccountProtectedLayout>
  );
};

export default AccountCarCreatePage;
