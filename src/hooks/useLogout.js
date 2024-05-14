// hooks
import { useEffect, useState } from 'react';
// context
import { useAuthContext } from '../context/useAuthContext';
// firebase
import { auth } from '../firebase/config';



export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try {
            // try signin the user out
            await auth.signOut();
            // dispatch logout
            dispatch({ type: 'LOGOUT' });

            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }

        } catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    }
    // cleanup function
    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])
    return { logout, isPending, error }
}