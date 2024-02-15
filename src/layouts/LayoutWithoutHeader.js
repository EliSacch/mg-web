import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const LayoutWithoutHeader = ({
    handleOpen,
    handleClose,
    setModalChildren
}) => {
    return (
        <>
            <header>
                <Navigation
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    setModalChildren={setModalChildren}
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