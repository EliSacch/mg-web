// context 
import { useAuthContext } from "../context/useAuthContext";
// componenets
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";


const LayoutWithoutHeader = ({
    handleOpen,
    handleClose,
    setModalChildren
}) => {

    const { authIsReady } = useAuthContext();

    return (
        <>
            <header>
                {authIsReady && (
                    <Navigation
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        setModalChildren={setModalChildren}
                    />
                )}
            </header>

            { /* main*/}
            <Outlet />

            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default LayoutWithoutHeader;