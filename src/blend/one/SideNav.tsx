import SideNavButton from "./SideNavButton";

const SideNav: React.FC = () => {

    return (
        <div className="nav" >
            <ul className="sidenav">
                <SideNavButton title="Profile" icon="fa-solid fa-address-card" href="/admin/profile" />
                <SideNavButton title="Cars" icon="fa-solid fa-car" href="/admin/cars" />
                <SideNavButton title="Users" icon="fa-solid fa-user" href="/admin/users" />
                <SideNavButton title="Brands" icon="fa-solid fa-star" href="/admin/brands" />
                
            </ul>
        </div >
    );
}

export default SideNav;