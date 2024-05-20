import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {
    const navlinks = [
        {
            id: "1",
            to: "/",
            title: "Dashboard"
        },
        {
            id: "2",
            to: "/add",
            title: "Add User"
        }
    ];

    return (
        <>
            <header>
                Welcome !
            </header>
            <section>
                <div style={{ marginBottom: "40px", fontSize: "20px" }}>
                    {
                        navlinks.map((link) => (
                            <NavLink
                                key={link.id}
                                to={link.to}
                                style={link.id === 1 ? " " : { marginRight: "20px", color: "#0366FF" }}
                                className={({ isActive }) => (isActive ? "isActiveClass" : "")}
                            >
                                {link.title}
                            </NavLink>
                        ))
                    }
                </div>
                <main>
                    <Outlet />
                </main>
                <ToastContainer />
            </section >
        </>
    )
}

export default Layout;