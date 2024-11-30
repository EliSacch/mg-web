import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSettings = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [settings, setSettings] = useState({});

    const { user } = useAuthContext();

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

    // cleanup function
    useEffect(() => {
        setIsCancelled(false);
        return () => setIsCancelled(true);
    }, [])

    return { settings, getSettings, setSettings}
}