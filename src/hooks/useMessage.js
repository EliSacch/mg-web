// hooks
import { useState } from 'react';

export const useMessage = () => {

    const [displayMessage, setDisplayMessage] = useState(false);

    const openMessage = () => {
        setDisplayMessage(true);
    }

    const closeMessage = () => {
        setDisplayMessage(false);
    }

    return { displayMessage, closeMessage, openMessage }
}