// context
import { useAuthContext } from "../context/useAuthContext";
// coponenets
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";


const LayoutWithHeader = ({
    handleOpen,
    handleClose,
    setModalChildren
}) => {

    const { authIsReady } = useAuthContext();

    return (
        <>
            <header>
                <Header>
                    {authIsReady && (
                        <Navigation
                            handleOpen={handleOpen}
                            handleClose={handleClose}
                            setModalChildren={setModalChildren}
                        />
                    )}
                </Header>
            </header>

            { /* main*/}
            {authIsReady && <Outlet />}

            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default LayoutWithHeader;