// hooks
import { useEffect, useState } from 'react';
import { useSettings } from '../hooks/useDefaultSchedule';
// components
import { Link } from 'react-router-dom';
import Logo from './Logo';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// styles
import styles from './styles/Footer.module.css';
import ScheduleTable from './ScheduleTable';


export default function Footer() {
    const [schedule, setSchedule] = useState();
    const { settings, getSettings, setSettings, fetchSettingsError, handleSelectDefaultCalendar } = useSettings();

    const fetchSchedule = async id => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        return fetch(`${process.env.REACT_APP_BACKEND}/schedules/${id}`, requestOptions)
            .then(res => res.json())
    }

    const getSchedule = async id => {
        try {
            const data = await fetchSchedule(id)
            setSchedule(data);
        } catch (err) {
            throw new Error("C'è stato un errore a recuperare gli orari dal database.")
        }
    }

    // get settings
    useEffect(() => {
        getSettings();
    }, [])

    // get schedule
    useEffect(() => {
        const id = settings.default_schedule_id;
        if (id != null && id != undefined) {
            getSchedule(id);
        }
    }, [settings.default_schedule_id])

    return (
        <div className={styles.Footer}>
            <Logo />

            <div className={styles.Social}>
                <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebookF} size='xl' />
                </Link>
                <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size='xl' />
                </Link>
                <Link
                    to='#'
                    onClick={(e) => {
                        window.location.href = "tel:+3900000000000";
                        e.preventDefault();
                    }}
                >
                    <FontAwesomeIcon icon={faPhone} size='xl' />
                </Link>

                <Link
                    to='#'
                    onClick={(e) => {
                        window.location.href = "mailto:elisa.forev@gmail.com";
                        e.preventDefault();
                    }}
                >
                    <FontAwesomeIcon icon={faEnvelope} size='xl' />
                </Link>
            </div>

            {schedule && <ScheduleTable schedule={schedule} />}

        </div>
    )
}
