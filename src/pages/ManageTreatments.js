// hooks
import { useEffect } from 'react';
// context
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../context/CurrentUserContext';
// styles
import styles from './styles/ManageTreatments.module.css';

export default function ManageTreatments() {

    const currentUser = useCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if(!currentUser) {
            navigate("/login");
            return
        }
    }, [currentUser, navigate])

    useEffect(() => {
        if(currentUser && !currentUser.is_admin) {
            navigate("/");
            return
        }
    }, [currentUser])

    return (
        <main className={styles.Dashboard}>
            <section className={styles.Section}>
                <h2>Gestisci Trattamenti</h2>
            </section>
        </main>
    )
}