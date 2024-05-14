// hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// context
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext.js";
import { useAuthContext } from "../context/useAuthContext.js";
// firebase
import { db, auth } from "../firebase/config.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";


export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);

    const setCurrentMessage = useSetCurrentMessage();
    const setCurrentMessageType = useSetCurrentMessageType();

    const { dispatch } = useAuthContext();

    const navigate = useNavigate();

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            // signup
            const res = await createUserWithEmailAndPassword(auth, email, password)
            if (!res) {
                throw new Error("Firebase error")
            }

            await updateProfile(res.user, { displayName })
 
            await addDoc(collection(db, "profiles"), {
                user: res.user.uid,
                is_admin: false
            })

            // dispatch login 
            dispatch({ type: "LOGIN", payload: res.user })

            setCurrentMessageType("success");
            setCurrentMessage("Registrazione avvenuta con successo.");

            if (!isCancelled) {
                navigate("/");
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {

            const mapErrors = [
                ["email-already-in-use", "Questa email è già in uso."],
                ["at least 6 characters", "La password deve essere di almeno 6 caratteri."]
            ]

            for (let i = 0; i < mapErrors.length; i++) {
                if (err?.message.includes(mapErrors[i][0])) {
                    setError(mapErrors[i][1]);
                    setCurrentMessageType("error");
                    setCurrentMessage(mapErrors[i][1]);
                    break;
                } else {
                    setCurrentMessageType("error");
                    setError("Non è stato possibile effettuare la registrazione.");
                    setCurrentMessage("Non è stato possibile effettuare la registrazione.");
                }
            }

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }

        if (!isCancelled) {
            setIsPending(false);
            setError(null)
        }
    }

    // cleanup function
    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])
    return { error, isPending, signup }
}