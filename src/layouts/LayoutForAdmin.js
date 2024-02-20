// hooks
import { useEffect } from 'react';
// context
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../context/CurrentUserContext';
import { Outlet } from "react-router-dom";
// componenets
import NavigationForAdmin from "../components/NavigationForAdmin";


const LayoutForAdmin = ({
    handleOpen,
    handleClose,
    setModalChildren
}) => {

    const {currentUser} = useCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
            console.log("not logged in", currentUser)
        }
        if (currentUser && !currentUser?.is_admin) {
            // navigate("/");
            console.log("not admin")
        }

    }, [currentUser, navigate])

    return (
        <>
        <header>
            <NavigationForAdmin
                handleOpen={handleOpen}
                handleClose={handleClose}
                setModalChildren={setModalChildren}
            />
        </header>

        { /* main*/ }
        <Outlet />

        <footer>
            
        </footer>
    </>
    );
};

export default LayoutForAdmin;