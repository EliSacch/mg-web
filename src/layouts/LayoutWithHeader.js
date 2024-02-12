import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const LayoutWithHeader = ({
    handleOpen,
    handleLogout,
    setModalChildren,
    jwtToken,
    setJwtToken
}) => {
    return (
        <>
            <header>
            <Header>
                <Navigation
                    handleOpen={handleOpen}
                    handleLogout={handleLogout}
                    setModalChildren={setModalChildren}
                    jwtToken={jwtToken}
                />
            </Header>
            </header>
            <main>
            <Outlet
            context={{
              jwtToken,
              setJwtToken
            }}
          />
            </main>
            <footer>
            <Footer />
          </footer>
        </>
    );
};

export default LayoutWithHeader;