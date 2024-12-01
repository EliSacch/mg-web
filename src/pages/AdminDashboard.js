// context
import { useAuthContext } from '../hooks/useAuthContext';
// componenets
import ManageTreatments from './ManageTreatments';
import ManageRooms from './ManageRooms';
import ManageSchedules from './ManageSchedules';
// styles
import styles from './styles/AdminDashboard.module.css';
import ManageCalendar from './ManageCalendar';
import { useEffect, useState } from 'react';


export default function AdminDashboard({
    handleOpen,
    handleClose,
    showModal,
    setModalChildren
}) {

    const { authIsReady, user } = useAuthContext();
    const [schedules, setSchedules] = useState();
    const [isCancelled, setIsCancelled] = useState(false);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        setIsPending(true)
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + user.accessToken)

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/admin/schedules`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (!isCancelled) {
                    setSchedules(data);
                }
            }).catch(err => {
                if (!isCancelled) {
                    setFetchError("C'è stato un errore a recuperare gli orari dal database.")
                }
            }).finally(() => {
                setIsPending(false)}
            )
    }, [showModal])

    // cleanup function
    useEffect(() => {
        setIsCancelled(false);
        return () => setIsCancelled(true);
    }, [])

    return (
        authIsReady && user && (
            <main className={styles.Dashboard}>

                <ManageTreatments
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    showModal={showModal}
                    setModalChildren={setModalChildren}
                />

                <ManageRooms
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    showModal={showModal}
                    setModalChildren={setModalChildren}
                />

                { !isPending && <ManageSchedules
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    showModal={showModal}
                    setModalChildren={setModalChildren}
                    user={user}
                    schedules={schedules}
                />}

                {!isPending && <ManageCalendar
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    showModal={showModal}
                    setModalChildren={setModalChildren}
                    schedules={schedules}
                />}
            </main>
        )
    )
}