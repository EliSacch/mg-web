import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const LayoutWithHeader = ({
    handleOpen,
    handleClose,
    setModalChildren
}) => {
    return (
        <>
            <header>
            <Header>
                <Navigation
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    setModalChildren={setModalChildren}
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