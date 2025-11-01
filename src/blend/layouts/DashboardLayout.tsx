import SideNav from '../one/SideNav';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProfilePic from '../components/ProfilePic';
import useAuthStore from '../auth/useAuthStore';

const DashboardLayout: React.FC = () => {

    const { theme } = useAuthStore();
    const [viewSidenav, setViewSideNav] = useState(false);
    const themeIcon = 'sample';
    
    return (
        <div className={theme}>

            <div className="container">

                <aside id="sidenav" className={viewSidenav ? 'display-aside' : ''}>

                    <div className="logo-top">
                        <div className="logo">
                            <Link to="/">
                                <img src="/images/logo.png" alt="" />
                                <div className='logo-text'>cSmile</div>
                            </Link>
                        </div>
                        <div className="close"><i className="fa-solid fa-close" onClick={() => setViewSideNav(!viewSidenav)}></i></div>
                    </div>

                    <SideNav />

                </aside>

                <main>
                    <div className="topnav">
                        <div className="menu" id="menu" onClick={() => setViewSideNav(!viewSidenav)}><i className="fa-solid fa-bars"></i></div>
                        <div id="theme-toggler"><i className={"fa-solid fa-" + themeIcon}></i></div>
                        <ProfilePic />
                    </div>
                    <div className="content">
                        {props.children}
                    </div>
                </main>

            </div>
        </div>
    );
}

export default DashboardLayout;