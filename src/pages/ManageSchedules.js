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


const days = {
    mon: "Lunedì",
    tue: "Martedì",
    wed: "Mercoledì",
    thu: "Giovedì",
    fri: "Venerdì",
    sat: "Sabato",
    sun: "Domenica"
}

export default function ManageSchedules(props) {

    const [fetchError, setFetchError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`schedules/${id}/edit`)
    }

    const handleDelete = (id) => {
        props.setModalChildren(
            <DeleteSchedule id={id} handleClose={() => props.handleClose()} />
        )
        props.handleOpen()
    };

    return (

        !isPending && (
            <section className={styles.Section}>

                <h2>Orari</h2>

                <div className={styles.Button}>
                    <Link to="/admin/schedules/create" className={btnStyles.Btn}>Nuovo Orario</Link>
                </div>

                {fetchError != null ? (
                    <p>{fetchError}</p>
                ) : (

                    <div className={styles.SchedulesTableWrapper}>

                        {props.schedules ? (
                            props.schedules.map(schedule => (

                                <div className={styles.SchedulesTableCard} key={schedule.id}>
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
                                                <th>Orario</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Object.keys(schedule.slots).map(day => (
                                                    <tr key={days[`${day}`]}>
                                                        <td>{days[`${day}`]}</td>
                                                        <td>{schedule.slots[`${day}`] === null ? "Chiuso" : (
                                                            schedule.slots[`${day}`].map(slot => <span key={`${day}-${slot}`}>{`${slot.open} - ${slot.close}`}</span>)
                                                        )}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            ))

                        ) : (
                            <p>Non ci sono orari al momemento.</p>
                        )
                        }
                    </div>
                )}

            </section>
        )
    )
}