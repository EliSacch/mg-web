import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext";

export const useSettings = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [settings, setSettings] = useState({});

    const { user } = useAuthContext();
    const setCurrentMessage = useSetCurrentMessage();
    const setCurrentMessageType = useSetCurrentMessageType();

    const fetchSettings = async () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + user.accessToken)
        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        return fetch(`${process.env.REACT_APP_BACKEND}/settings/default`, requestOptions)
            .then(res => res.json())
    }

    const getSettings = async () => {
        try {
            const data = await fetchSettings();
            if (!data) {
                throw new Error('Error fetching settings!');
            }
            if (!isCancelled) {
                setSettings(data);
            }
        } catch (err) {
            if (!isCancelled) {
                throw new Error('Error fetching settings!');
            }
        }
    }

    const handleSelectDefaultCalendar = (e, options) => {
        e.preventDefault();
        const value = options.filter(opt => opt.id === e.target.value)[0]?.value;

        try {
            const headers = new Headers();
            headers.append("Content-type", "application/json");
            headers.append("Authorization", "Bearer " + user.accessToken)

            let requestBody = {
                id: "default",
                default_schedule_id: e.target.value,
                default_schedule_name: value,
            }

            let requestOptions = {
                body: JSON.stringify(requestBody),
                method: "PATCH",
                headers: headers,
                credentials: "include",
            }

            fetch(`${process.env.REACT_APP_BACKEND}/admin/settings/default/edit`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.message);
                    } else {
                        setSettings({
                            ...settings,
                            default_schedule_name: value,
                        })
                        setCurrentMessageType("success");
                        setCurrentMessage("Orario predefinito aggiornato con successo!");
                    }
                })
                .catch(err => {
                    console.log(err)
                    setCurrentMessageType("error");
                    setCurrentMessage("Non è stato possibile aggiornare l'orario predefinito! Per favore riprova.");
                })
        } catch (err) {
            console.log("error submitting the form: ", err)
        }
    }

    // cleanup function
    useEffect(() => {
        setIsCancelled(false);
        return () => setIsCancelled(true);
    }, [])

    return { settings, getSettings, setSettings, handleSelectDefaultCalendar}
}