import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const LayoutWithoutHeader = (props) => {
    return (
        <>
            <header>
                <Navigation
                    handleOpen={props.handleOpen}
                    handleLogout={props.handleLogout}
                    setModalChildren={props.setModalChildren}
                    jwtToken={props.jwtToken}
                />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default LayoutWithoutHeader;