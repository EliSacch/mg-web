// hooks
import { useEffect, useState } from 'react';
// context
import { useNavigate } from 'react-router-dom';
// Utils
import { formatDatetime } from '../utils/datetimeUtils.js';
// coponenets
import DeleteTreatment from './DeleteTreatment';
import { ActionsDropdown } from '../components/ActionsDropdown';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// styles
import styles from './styles/ManageTreatments.module.css';


export default function ManageTreatments(props) {

    const [fetchError, setFetchError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [treatments, setTreatments] = useState([]);
    const navigate = useNavigate();


    const handleEdit = (id) => {
        navigate(`treatments/${id}/edit`)
    }

    const handleDelete = (id) => {
        props.setModalChildren(
            <DeleteTreatment id={id} handleClose={() => props.handleClose()} />
        )
        props.handleOpen()
    };


    useEffect(() => {
        setIsPending(true)
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/treatments`, requestOptions)
            .then(res => res.json())
            .then(data => {
                setTreatments(data);
                setIsPending(false);
            }).catch(err => {
                console.log(err);
                setIsPending(false);
                setFetchError("C'è stato un errore a recuperare i trattamenti dal database.")
            })

    }, [props.showModal])

    return (
        <section className={styles.Section}>

            <h2>Gestisci Trattamenti</h2>

            {fetchError != null ? (
                <p>{fetchError}</p>
            ) : (

                treatments ? (
                    <table className={styles.TreatmentsTable}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrizione</th>
                                <th>Durata</th>
                                <th>Prezzo</th>
                                <th>Stanza</th>
                                <th>
                                    <span className="d-none d-lg-block">Attivo</span>
                                </th>
                                <th className="d-none d-md-block">Ultima modifica</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                treatments.map(treatment => (
                                    <tr key={treatment.id} className={!treatment.is_active ? styles.Inactive : ""}>
                                        <td>{treatment.name}</td>
                                        <td>{treatment?.description}</td>
                                        <td>{treatment.duration} min.</td>
                                        <td>€{treatment.price}</td>
                                        <td>{treatment.room}</td>
                                        <td>
                                            <span className="d-none d-lg-block">
                                                {treatment.is_active ? (
                                                    <FontAwesomeIcon icon={faCheck} size='xl' />
                                                ) : (
                                                    <FontAwesomeIcon icon={faClose} size='xl' />
                                                )}
                                            </span>
                                        </td>
                                        <td className="d-none d-md-block">
                                            {treatment.updated_at && formatDatetime(treatment.updated_at)}
                                            {!treatment.updated_at && formatDatetime(treatment.created_at)}
                                        </td>
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
                ) : (
                    <p>Non ci sono trattamenti al momemento.</p>
                )
            )}

        </section>
    )
}