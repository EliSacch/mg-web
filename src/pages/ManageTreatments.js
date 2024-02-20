// hooks
import { useEffect, useState } from 'react';
// context
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../context/CurrentUserContext';
// coponenets
import { ActionsDropdown } from '../components/ActionsDropdown';
// styles
import styles from './styles/ManageTreatments.module.css';


export default function ManageTreatments() {

    const [treatments, setTreatments] = useState([]);
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`${id}/edit`)
    }

    const handleDelete = async (id) => {
        console.log("delete ", id)
    };

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
            return
        }
    }, [currentUser, navigate])

    useEffect(() => {
        if (!currentUser.is_admin) {
            navigate("/");
            return
        }
    }, [currentUser])


    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`http://localhost:8080/treatments`, requestOptions)
            .then(res => res.json())
            .then(data => setTreatments(data))
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <main className={styles.Dashboard}>
            <section className={styles.Section}>

                <h2>Gestisci Trattamenti</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Desc</th>
                            <th>Durata</th>
                            <th>Prezzo</th>
                            <th>Immagine</th>
                            <th>Attivo</th>
                            <th>Creato</th>
                            <th>Modificato</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            treatments.map(treatment => (
                                <tr key={treatment.id}>
                                    <td>{treatment.name}</td>
                                    <td>{treatment?.description}</td>
                                    <td>{treatment.duration}</td>
                                    <td>€{treatment.price}</td>
                                    <td>{treatment?.image}</td>
                                    <td>{treatment.is_active ? "V" : "X"}</td>
                                    <td>{treatment.created_at}</td>
                                    <td>{treatment.updated_at}</td>
                                    <td>
                                        <ActionsDropdown
                                            handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                            data={treatment.id}
                                        />
                                    </td>
                                </tr>
                            )
                            )
                        }

                    </tbody>

                </table>

            </section>
        </main>
    )
}