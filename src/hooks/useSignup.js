// hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// context
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext.js";
import { useAuthContext } from "./useAuthContext.js";
// firebase
import { db, auth, timestamp } from "../firebase/config.js";
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

    const createProfile = async (uid) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const requestOptions = {
                body: JSON.stringify({ user: uid }),
                method: "PUT",
                headers: headers,
            }
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/profiles/create`, requestOptions)
                .then(res => res.json())

            if (!res || res?.error) {
                throw new Error("Errore nella creazione del profilo")
            }

            return res.data

        } catch (error) {
            throw new Error("Errore nella creazione del profilo")
        }
    }

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            // signup
            const res = await createUserWithEmailAndPassword(auth, email, password)
            if (!res || res.error) {
                throw new Error("Firebase error")
            }
            
            await createProfile(res.user.uid)

            await updateProfile(res.user, { displayName })

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