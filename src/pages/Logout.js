// context
import { useNavigate } from "react-router-dom";
import { useSetCurrentUser } from "../context/CurrentUserContext";
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext";
// styles
import btnStyles from '../pages/styles/Buttons.module.css';

export default function Logout({ handleClose }) {

    const setCurrentUser = useSetCurrentUser();
    const setCurrentMessage = useSetCurrentMessage();
    const setCurrentMessageType = useSetCurrentMessageType();

    const navigate = useNavigate();

    const handleLogout = () => {

        const requestOption = {
            method: "GET",
            credentials: "include",
        }

        fetch("/logout", requestOption)
            .catch(error => {
                console.log("error logging out.", error)
                handleClose();
                setCurrentMessageType("error");
                setCurrentMessage("C'è stato un problema con il logout.");
            })
            .finally(() => {
                handleClose();
                setCurrentUser(null);
                setCurrentMessageType("success");
                setCurrentMessage("A presto!");
                navigate("/");
            })
    }

    return (
    <>
        <h2>Logout</h2>
        <p>Vuoi effettuare il logout?</p>
        <button onClick={() => handleLogout()} className={btnStyles.Btn}>Conferma</button>
    </>
    )
}