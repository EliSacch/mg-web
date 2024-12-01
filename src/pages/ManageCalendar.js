import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useSettings } from '../hooks/useDefaultSchedule';
// components
import Select from '../components/form/Select';
import { ActionsDropdown } from '../components/ActionsDropdown';
// utils
import { formatDate, formatDatetime } from '../utils/datetimeUtils';
// styles
import styles from './styles/ManageCalendars.module.css';


export default function ManageCalendar(props) {
    const [fetchError, setFetchError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [options, setOptions] = useState([])
    const [calendars, setCalendars] = useState([])

    const { user } = useAuthContext();
    const { settings, getSettings, setSettings, handleSelectDefaultCalendar } = useSettings();

    const getOptions = (schedules) => {
        setIsPending(true);
        let opts = []
        for (let i in schedules) {
            opts.push({ id: schedules[i].id, value: schedules[i].name, disabled: false })
        }
        return opts;
    }

    useEffect(() => {
        setIsPending(true)
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + user.accessToken)

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/admin/calendars`, requestOptions)
            .then(res => res.json())
            .then(data => {
                setCalendars(data);
                setIsPending(false);
            }).catch(err => {
                setIsPending(false);
                setFetchError("C'è stato un errore a recuperare il calendario dal database.")
            })
    }, [])

    useEffect(() => {
        setOptions(getOptions(props.schedules))
        setIsPending(false);
    }, [props.schedules])

    useEffect(() => {
        getSettings();
    }, [])

    return (
        !isPending && (
            <>
                <section className={styles.Section}>
                    <h2>Calendario</h2>
                    {<Select
                        name="default_calendar"
                        title="Orario predefinito:"
                        options={options}
                        value={options.filter(opt => opt.value === settings.default_schedule_name)[0]?.id}
                        onChange={e => handleSelectDefaultCalendar(e, options)}
                        hideEmptyOpyion={true}
                    />}
                </section>
                <section className={styles.Section}>
                    {fetchError != null ? (
                        <p>{fetchError}</p>
                    ) : (
                        calendars ? (
                            <table className={styles.CalendarsTable}>
                                <thead>
                                    <tr>
                                        <th>Orario</th>
                                        <th>Inizio</th>
                                        <th>Fine</th>
                                        <th className="d-none d-md-block">Ultima modifica</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        calendars.map(calendar => (

                                            <tr key={calendar.id}>
                                                <td>{calendar.schedule_name}</td>
                                                <td>{formatDate(calendar.start_date)}</td>
                                                <td>{formatDate(calendar.end_date)}</td>
                                                <td className="d-none d-md-block">
                                                    {calendar.updated_at && formatDatetime(calendar.updated_at)}
                                                    {!calendar.updated_at && formatDatetime(calendar.created_at)}
                                                </td>
                                                <td>
                                                    <ActionsDropdown
                                                        handleEdit={() => { console.log("Edit", calendar.id) }}
                                                        handleDelete={() => { console.log("Delete", calendar.Schedule.ID) }}
                                                        data={calendar.id}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                        )
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <p>Non ci sono calendari al momemento.</p>
                        )
                    )}
                </section>
            </>
        )
    )
}
