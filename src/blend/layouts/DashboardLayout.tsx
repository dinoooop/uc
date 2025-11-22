import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideNav from "../one/SideNav";
import ProfilePic from "../one/ProfilePic";
import { useAuthStore } from "../../helpers/stores/useAuthStore";
import { useGeneralStore } from "../../helpers/stores/useGeneralStore";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

    
    const [viewSidenav, setViewSideNav] = useState<boolean>(false);
    const themeIcon = "sample";
    const { user, checkAuth } = useAuthStore()
    const { svData, regular } = useGeneralStore();

    const navigate = useNavigate()

    useEffect(() => {
            checkAuth()
    
            if (!svData) { regular() }
    
            if (!user) {
                navigate('/login')
            }
        }, [user])

    return (
        <div className="container container-admin">
            <aside id="sidenav" className={viewSidenav ? "display-aside" : ""}>
                <div className="logo-top">
                    <div className="logo">
                        <Link to="/">
                            <div className="logo-text">UC Garage</div>
                        </Link>
                    </div>
                    <div className="close">
                        <i
                            className="fa-solid fa-close"
                            onClick={() => setViewSideNav(!viewSidenav)}
                        ></i>
                    </div>
                </div>
                <SideNav />
            </aside>

            <main>
                <div className="topnav">
                    <div
                        className="menu"
                        id="menu"
                        onClick={() => setViewSideNav(!viewSidenav)}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <div id="theme-toggler">
                        <i className={`fa-solid fa-${themeIcon}`}></i>
                    </div>
                    <ProfilePic />
                </div>

                <div className="content">{children}</div>
            </main>
        </div>
    );
};

export default DashboardLayout;
