import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const LayoutWithHeader = (props) => {
    return (
        <>
            <header>
            <Header>
                <Navigation
                    handleOpen={props.handleOpen}
                    handleLogout={props.handleLogout}
                    setModalChildren={props.setModalChildren}
                    jwtToken={props.jwtToken}
                />
            </Header>
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

export default LayoutWithHeader;