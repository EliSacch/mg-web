// hooks
import { useEffect, useState } from 'react';
// context
import { useNavigate } from 'react-router-dom';
// coponenets
import { ActionsDropdown } from '../components/ActionsDropdown';
// styles
import styles from './styles/ManageTreatments.module.css';
import DeleteTreatment from './DeleteTreatment';


export default function ManageTreatments(props) {

    const [fetchError, setFetchError] = useState(null);
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

        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const requestOptions = {
                method: "GET",
                headers: headers,
            }

            fetch(`/treatments`, requestOptions)
                .then(res => res.json())
                .then(data => setTreatments(data))
                .catch(err => {
                    console.log(err)
                    setFetchError("C'è stato un errore a recuperare i trattamenti dal database.")
                })
        } catch (err) {
            console.log(err)
        }

    }, [props.showModal])

    return (
        <section className={styles.Section}>

            <h2>Gestisci Trattamenti</h2>

            {fetchError != null ? (
                <p>{fetchError}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Desc</th>
                            <th>Durata</th>
                            <th>Prezzo</th>
                            <th>Immagine</th>
                            <th>Attivo</th>
                            <th>Ultima modifica</th>
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
                                    <td>{treatment.updated_at.split(".")[0].replace("T", ", ")}</td>
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
            )}

        </section>
    )
}