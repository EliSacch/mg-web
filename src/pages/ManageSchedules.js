// hooks
import { useEffect, useState } from 'react';
// context
import { Link, useNavigate } from 'react-router-dom';
// utils
import { formatDatetime } from '../utils/datetimeUtils.js';
// coponenets
import { ActionsDropdown } from '../components/ActionsDropdown';
import DeleteSchedule from './DeleteSchedule.js';
import ScheduleTable from '../components/ScheduleTable.js';
// styles
import styles from './styles/ManageSchedules.module.css';
import btnStyles from './styles/Buttons.module.css';



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
                                    <ScheduleTable schedule={schedule} />
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