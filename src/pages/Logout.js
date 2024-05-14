// hooks
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
// context
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext";
// styles
import btnStyles from '../pages/styles/Buttons.module.css';


export default function Logout({ handleClose }) {

    const setCurrentMessage = useSetCurrentMessage();
    const setCurrentMessageType = useSetCurrentMessageType();

    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleLogout = () => {

        try {
            logout();
            handleClose();
            setCurrentMessageType("success");
            setCurrentMessage("A presto!");
            navigate("/");
        } catch (error) {
            handleClose();
            setCurrentMessageType("error");
            setCurrentMessage("C'è stato un problema con il logout.");
        }
    }

    return (
        <>
            <h2>Logout</h2>
            <p>Vuoi effettuare il logout?</p>
            <button onClick={() => handleLogout()} className={btnStyles.Btn}>Conferma</button>
        </>
    )
}