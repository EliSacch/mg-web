// hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// context
import { useAuthContext } from "../hooks/useAuthContext";
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext";
// styles
import btnStyles from '../pages/styles/Buttons.module.css';


export default function DeleteSchedule({ id, handleClose }) {

    const [isCancelled, setIsCancelled] = useState(false);

    const setCurrentMessage = useSetCurrentMessage();
    const setCurrentMessageType = useSetCurrentMessageType();

    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleClick = async () => {

        try {
            const headers = new Headers();
            headers.append("Authorization", "Bearer " + user.accessToken)

            const requestOption = {
                method: "DELETE",
                headers: headers,
                credentials: "include",
            }

            const res = await fetch(`${process.env.REACT_APP_BACKEND}/admin/schedules/${id}/delete`, requestOption)
                .then(res => res.json())
            if (!res) {
                if (!isCancelled) {
                    setCurrentMessageType("error");
                    setCurrentMessage("Non è stato possibile eliminare questo calendario.");
                }
            } else {
                if (!isCancelled && !res.error) {
                    setCurrentMessageType("success");
                    setCurrentMessage("Calendario eliminato con successo");
                    navigate("/admin");
                } else {
                    setCurrentMessageType("error");
                    setCurrentMessage(res.message);
                }
            }
        } catch (err) {
            setCurrentMessageType("error");
            setCurrentMessage(err);
        } finally {
            handleClose();
        }

    }

    useEffect(() => {
        // if we close the modal before the request is complete we cancel the request
        return () => setIsCancelled(true);
    }, [])

    return (
        <>
            <h2>Elimina Orario?</h2>
            <p>L'orario non potrà essere recuperato</p>
            <button onClick={() => handleClick()} className={btnStyles.Btn}>Conferma</button>
        </>
    )
}