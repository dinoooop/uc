import SideNavButton from "./SideNavButton";

const SideNav: React.FC = () => {

    return (
        <div className="nav" >
            <ul className="sidenav">
                <SideNavButton title="Cars" icon="fa-solid fa-car" href="/admin/cars" />
                <SideNavButton title="Users" icon="fa-solid fa-user" href="/admin/users" />
            </ul>
        </div >
    );
}

export default SideNav;