import SideNavButton from './SideNavButton';

const SideNav: React.FC = () => {

    return (
        <div className="nav" >
            <ul className="sidenav">
                <SideNavButton title="Patients" icon="fa-solid fa-user" href="/admin/patients" />
                <SideNavButton title="Doctors" icon="fa-solid fa-user-doctor" href="/admin/doctors" />
                <SideNavButton title="Appointments" icon="fa-solid fa-stamp" href="/admin/appointments" />
                <SideNavButton title="Holidays" icon="fa-solid fa-calendar" href="/admin/holidays" />
                <SideNavButton title="Slot Types" icon="fa-solid fa-check-to-slot" href="/admin/slot-types" />
                <SideNavButton title="Students" icon="fa-solid fa-check-to-slot" href="/admin/students" />
                <SideNavButton title="Services" icon="fa-solid fa-truck-medical" href="/admin/services" />
                <SideNavButton title="Email Templates" icon="fa-solid fa-paper-plane" href="/admin/email-templates" />
                <SideNavButton title="Testimonials" icon="fa-solid fa-comments" href="/admin/testimonials" />
                <SideNavButton title="Settings" icon="fa-solid fa-gear" href="/admin/clinic-settings" />
                <SideNavButton title="Banners" icon="fa-solid fa-brush" href="/admin/banners" />
                <SideNavButton title="Orders" icon="fa-solid fa-cart-shopping" href="/admin/orders" />


            </ul>
        </div >
    );
}

export default SideNav;