import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../helpers/stores/useAuthStore";

const quickLinks = [
    {
        href: '/account/profile',
        iconClass: 'fa-solid fa-address-card',
        title: 'Profile'
    },
    {
        href: '/account/cars',
        iconClass: 'fa-solid fa-car',
        title: 'My Cars'
    },
    {
        href: '/account/cars/create',
        iconClass: 'fa-solid fa-car',
        title: 'Sell my car'
    },
    {
        href: '/account/security',
        iconClass: 'fa-solid fa-lock',
        title: 'Security'
    },
    
]


const AccountQuickLinks: React.FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();


    const handleLogout = () => {
        logout(); // clear tokens / user info
        navigate("/login");
    };

    return (
        <aside className="sidebar">
            <h3>Quick Links</h3>
            <ul className="side-nav-link">
                {
                    quickLinks.map((link, index) => (
                        <li key={index}>
                            <Link className="side-nav-links" to={link.href}>
                                <i className={link.iconClass}></i>
                                <span className="menu-title">{link.title}</span>
                            </Link>
                        </li>
                    ))
                }
                <li>
                    <button className="side-nav-links logout-button" onClick={handleLogout}>
                        <i className="fa-solid fa-sign-out-alt"></i>
                        <span className="menu-title">Logout</span>
                    </button>
                </li>
                
            </ul>
        </aside>
    );
};

export default AccountQuickLinks;
