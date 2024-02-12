import { Outlet } from "react-router-dom";
import NavigationForAdmin from "../components/NavigationForAdmin";

const LayoutForAdmin = ({
    handleOpen,
    handleLogout,
    setModalChildren,
    jwtToken,
    setJwtToken
}) => {
    return (
        <>
            <header>
                <NavigationForAdmin
                    handleOpen={handleOpen}
                    handleLogout={handleLogout}
                    setModalChildren={setModalChildren}
                    jwtToken={jwtToken}
                    setJwtToken={setJwtToken}
                />
            </header>
            <main>
                <Outlet context={jwtToken} />
            </main>
            <footer>
                Admin footer
            </footer>
        </>
    );
};

export default LayoutForAdmin;