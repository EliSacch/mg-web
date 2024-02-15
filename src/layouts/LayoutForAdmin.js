import { Outlet } from "react-router-dom";
import NavigationForAdmin from "../components/NavigationForAdmin";

const LayoutForAdmin = ({
    handleOpen,
    handleClose,
    setModalChildren
}) => {
    return (
        <>
            <header>
                <NavigationForAdmin
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    setModalChildren={setModalChildren}
                />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                Admin footer
            </footer>
        </>
    );
};

export default LayoutForAdmin;