import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../helpers/stores/useUserStore";
import AccountProtectedLayout from "../../blend/layouts/AccountProtectedLayout";
import Header from "../../blend/one/Header";
import MiniBanner from "../../blend/one/MiniBanner";
import AccountQuickLinks from "../../blend/one/AccountQuickLinks";
import { useAuthStore } from "../../helpers/stores/useAuthStore";
import { outer } from "../../helpers/cssm/outer";

const AccountProfileEditPage: React.FC = () => {
    const { show, item } = useUserStore();
    const { user } = useAuthStore();
    
    useEffect(() => {
        if (user && user.id) {
            show(user.id)
        }
    }, [user])

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
                                {
                                    item && (
                                        <div className="card-page">
                                        <div className="row profile-page">
                                            <div className="col-md-4">
                                                <img
                                                    src={`${outer.showImage(item.avatar, 'cover')}`}
                                                    alt={item.first_name}
                                                    loading="lazy"
                                                />
                                            </div>

                                            <div className="col-md-8 ">
                                                <h2 className="name">{item.first_name}</h2>
                                                <h3>{item.email}</h3>
                                                <h4>Phone: {item.phone}</h4>
                                                <h2 className="mt-1">About</h2>
                                                <p className="about">{item.about}</p>
                                                <div className="mt-1">
                                                <Link to="/account/profile/edit" className="btn">Edit</Link>

                                                </div>
                                            </div>



                                        </div>
                                        </div>
                                    )
                                }
                        </div>
                    </div>
                </div>
            </div>
        </AccountProtectedLayout>
    );
};

export default AccountProfileEditPage;
