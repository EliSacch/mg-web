// hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// context
import { useAuthContext } from "../hooks/useAuthContext";
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext";
// styles
import btnStyles from '../pages/styles/Buttons.module.css';


export default function DeleteRoom({ id, handleClose }) {

    const [isCancelled, setIsCancelled] = useState(false);

    const setCurrentMessage = useSetCurrentMessage();
    const setCurrentMessageType = useSetCurrentMessageType();

    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleClick = () => {
        if (!isCancelled) {
            try {
                const headers = new Headers();
                headers.append("Authorization", "Bearer " + user.accessToken)

                const requestOption = {
                    method: "DELETE",
                    headers: headers,
                    credentials: "include",
                }

                fetch(`${process.env.REACT_APP_BACKEND}/admin/rooms/${id}/delete`, requestOption)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        handleClose();
                        setCurrentMessageType("success");
                        setCurrentMessage("Stanza eliminata con successo");
                        navigate("/admin");
                    }
                })
                    .catch(error => {
                        handleClose();
                        setCurrentMessageType("error");
                        setCurrentMessage("Non è stato possibile eliminare questa stanza.");
                    })
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        // if we close the modal before the request is complete we cancel the request
        return () => setIsCancelled(true);
    }, [])

    return (
        <>
            <h2>Elimina Stanza</h2>
            <p>Vuoi eliminare questa stanza?</p>
            <button onClick={() => handleClick()} className={btnStyles.Btn}>Conferma</button>
        </>
    )
}