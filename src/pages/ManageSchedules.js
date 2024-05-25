// hooks
import { useEffect, useState } from 'react';
// context
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext.js';
// utils
import { formatDatetime } from '../utils/datetimeUtils.js';
// coponenets
import { ActionsDropdown } from '../components/ActionsDropdown';
import DeleteSchedule from './DeleteSchedule.js';
// styles
import styles from './styles/ManageSchedules.module.css';
import btnStyles from './styles/Buttons.module.css';


export default function ManageSchedules(props) {

    const [fetchError, setFetchError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [schedules, setSchedules] = useState([]);

    const navigate = useNavigate();

    const { user } = useAuthContext();

    const handleEdit = (id) => {
        navigate(`schedules/${id}/edit`)
    }

    const handleDelete = (id) => {
        props.setModalChildren(
            <DeleteSchedule id={id} handleClose={() => props.handleClose()} />
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

        fetch(`${process.env.REACT_APP_BACKEND}/admin/schedules`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSchedules(data);
                setIsPending(false);
            }).catch(err => {
                setIsPending(false);
                setFetchError("C'è stato un errore a recuperare i calendari dal database.")
            })

    }, [props.showModal])

    return (

        !isPending && (
            <section className={styles.Section}>

                <h2>Calendari</h2>

                <div className={styles.Button}>
                    <Link to="/admin/schedules/create" className={btnStyles.Btn}>Nuovo Calendario</Link>
                </div>

                {fetchError != null ? (
                    <p>{fetchError}</p>
                ) : (

                    schedules ? (
                        schedules.map(schedule => (
                            <div className={styles.SchedulesTableWrapper} key={schedule.id}>
                                <div className={styles.SchedulesTableCard}>
                                    <div className={styles.SchedulesTableHeader}>
                                    <h4>{schedule.name}</h4>
                                    <span>
                                        <ActionsDropdown
                                            handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                            data={schedule.id}
                                        />
                                    </span>
                                    <p>Ultima modifica:&nbsp;
                                        {schedule.updated_at && formatDatetime(schedule.updated_at)}
                                        {!schedule.updated_at && formatDatetime(schedule.created_at)}
                                    </p>
                                    </div>
                                    <table className={styles.SchedulesTable}>
                                        <thead>
                                            <tr>
                                                <th>Giorno</th>
                                                <th>Orari</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Lunedì</td>
                                                <td>{schedule.mon && schedule.mon != "" ? schedule.mon : "Chiuso"}</td>
                                            </tr>
                                            <tr>
                                                <td>Martedì</td>
                                                <td>{schedule.tue && schedule.tue != "" ? schedule.tue : "Chiuso"}</td>
                                            </tr>
                                            <tr>
                                                <td>Mercoledì</td>
                                                <td>{schedule.wed && schedule?.wed != "" ? schedule.wed : "Chiuso"}</td>
                                            </tr>
                                            <tr>
                                                <td>Giovedì</td>
                                                <td>{schedule.thu && schedule.thu != "" ? schedule.thu : "Chiuso"}</td>
                                            </tr>
                                            <tr>
                                                <td>Venerdì</td>
                                                <td>{schedule.fri && schedule.fri != "" ? schedule.fri : "Chiuso"}</td>
                                            </tr>
                                            <tr>
                                                <td>Sabato</td>
                                                <td>{schedule.sat && schedule.sat != "" ? schedule.sat : "Chiuso"}</td>
                                            </tr>
                                            <tr>
                                                <td>Domenica</td>
                                                <td>{schedule.sun && schedule.sun != "" ? schedule.sun : "Chiuso"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))

                    ) : (
                        <p>Non ci sono calendari al momemento.</p>
                    )
                )}

            </section>
        )
    )
}