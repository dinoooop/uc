import React from "react";
import { Link } from "react-router-dom";

const quickLinks = [
    {
        href: '/account/profile',
        iconClass: 'fa-solid fa-user',
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
]


const AccountQuickLinks: React.FC = () => {

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
            </ul>
        </aside>
    );
};

export default AccountQuickLinks;
