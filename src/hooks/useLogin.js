// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// context
import { useAuthContext } from './useAuthContext';
import { useSetCurrentMessage, useSetCurrentMessageType } from '../context/MessageContext';
// firebase
import { auth } from "../firebase/config.js";
import { signInWithEmailAndPassword } from 'firebase/auth';


export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);

    const setCurrentMessage = useSetCurrentMessage();
    const setCurrentMessageType = useSetCurrentMessageType();

    const { dispatch } = useAuthContext();

    const navigate = useNavigate();

    const login = async ( email, password) => {
        setError(null);
        setIsPending(true);

        try {
            // sign user in
            const res = await signInWithEmailAndPassword(auth, email, password);
            if (!res) {
                throw new Error('We could not sign you in!');
            }

            // dispatch login
            dispatch({ type: 'LOGIN', payload: res.user })

            setCurrentMessageType("success");
            setCurrentMessage("Accesso effettuato con successo.");

            if (!isCancelled) {
                navigate("/");
            }

        } catch (err) {

            console.log(err)
            const mapErrors = [
                ["invalid-email", "Email non valida."],
                ["missing-password", "Per favore inserisci la password."],
                ["invalid-credential", "Credenziali non valide."],
            ]

            for (let i = 0; i < mapErrors.length; i++) {
                if (err?.message.includes(mapErrors[i][0])) {
                    setError(mapErrors[i][1]);
                    setCurrentMessageType("error");
                    setCurrentMessage(mapErrors[i][1]);
                    break;
                } else {
                    setCurrentMessageType("error");
                    setError("Non è stato possibile effettuare l'accesso.");
                    setCurrentMessage("Non è stato possibile effettuare l'accesso.");
                }
            }
        }

        if (!isCancelled) {
            setIsPending(false);
            setError(null);
        }
    }

    // cleanup function
    useEffect(() => {
        setIsCancelled(false);
        return () => setIsCancelled(true);
    }, [])

    return { login, isPending, error }
}