// hooks
import { useEffect, useState } from 'react';
// context
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext.js';
// utils
import { formatDatetime } from '../utils/datetimeUtils.js';
// coponenets
import { ActionsDropdown } from '../components/ActionsDropdown';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteRoom from './DeleteRoom.js';
// styles
import styles from './styles/ManageRooms.module.css';
import btnStyles from './styles/Buttons.module.css';


export default function ManageRooms(props) {

    const [fetchError, setFetchError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [rooms, setRooms] = useState([]);

    const navigate = useNavigate();

    const { user } = useAuthContext();

    const handleEdit = (id) => {
        navigate(`rooms/${id}/edit`)
    }

    const handleDelete = (id) => {
        props.setModalChildren(
            <DeleteRoom id={id} handleClose={() => props.handleClose()} />
        )
        props.handleOpen()
    };

    useEffect(() => {
        setIsPending(true)
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + user.accessToken)

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/admin/rooms`, requestOptions)
            .then(res => res.json())
            .then(data => {
                setRooms(data);
                setIsPending(false);
            }).catch(err => {
                setIsPending(false);
                setFetchError("C'è stato un errore a recuperare le stanze dal database.")
            })

    }, [props.showModal])

    return (

        !isPending && (
        <section className={styles.Section}>

            <h2>Stanze</h2>

            <div className={styles.Button}>
                <Link to="/admin/rooms/create" className={btnStyles.Btn}>Nuova Stanza</Link>
            </div>

            {fetchError != null ? (
                <p>{fetchError}</p>
            ) : (

                rooms ? (
                    <table className={styles.RoomsTable}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrizione</th>
                                <th>
                                    <span className="d-none d-lg-block">Attivo</span>
                                </th>
                                <th className="d-none d-md-block">Ultima modifica</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rooms.map(room => (
                                    <tr key={room.id} className={!room.is_active ? styles.Inactive : ""}>
                                        <td>{room.name}</td>
                                        <td>{room?.description}</td>
                                        <td>
                                            <span className="d-none d-lg-block">
                                                {room.is_active ? (
                                                    <FontAwesomeIcon icon={faCheck} size='xl' />
                                                ) : (
                                                    <FontAwesomeIcon icon={faClose} size='xl' />
                                                )}
                                            </span>
                                        </td>
                                        <td className="d-none d-md-block">
                                            {room.updated_at && formatDatetime(room.updated_at)}
                                            {!room.updated_at && formatDatetime(room.created_at)}
                                        </td>
                                        <td>
                                            <ActionsDropdown
                                                handleEdit={handleEdit}
                                                handleDelete={handleDelete}
                                                data={room.id}
                                            />
                                        </td>
                                    </tr>
                                )
                                )
                            }

                        </tbody>

                    </table>
                ) : (
                    <p>Non ci sono stanze al momemento.</p>
                )
            )}

        </section>
        )
    )
}