// context 
import { useAuthContext } from "../hooks/useAuthContext";
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
            {authIsReady && <Outlet />}

            <footer>
            {authIsReady && <Footer />}
            </footer>
        </>
    );
};

export default LayoutWithoutHeader;