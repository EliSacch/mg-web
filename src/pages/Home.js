// hooks
import { useEffect, useState } from 'react';
import { useSettings } from '../hooks/useDefaultSchedule';
// context
import { useAuthContext } from '../hooks/useAuthContext';
// componenet
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Treatments from '../components/Treatments';
// style
import styles from './styles/Home.module.css';
import btnStyles from '../pages/styles/Buttons.module.css';
// image
import img from '../assets/images/brush.jpg';
import ScheduleTable from '../components/ScheduleTable';


export default function Home() {
  const [treatments, setTreatments] = useState([]);
  const [schedule, setSchedule] = useState();
  const [isPending, setIsPending] = useState(false);

  const { user } = useAuthContext();
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

  // get treatments
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
      .then(data => data.filter(d => d.is_active == true))
      .then(data => {
        setTreatments(data);
        setIsPending(false);
      }).catch(err => {
        setIsPending(false);
      })

  }, [])

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
    <main className={styles.Home}>
      <section className={styles.CallToAction}>
        <div className={styles.CallToActionContainer}>
          <div>
            <h2>Vuoi prendere un appuntamento? </h2>
            <p>
              <Link
                to='#'
                onClick={(e) => {
                  window.location.href = "tel:+3900000000000";
                  e.preventDefault();
                }}
                className={styles.Link}
              >
                Chiamaci
              </Link> o {!user ? " registrati al nostro sito" : " prenota dal sito"}.</p>
          </div>
          {!user && <Link to="/signup" className={btnStyles.BtnInverted}>Registrati</Link>}
          {user && <Link to="/book" className={btnStyles.BtnInverted}>Prenota</Link>}
        </div>
      </section>

      <section className={`${styles.Section} ${styles.Services}`}>
        <div>
          <h2>I Nostri Servizi</h2>
          {isPending && <p>Loading...</p>}
          {!isPending && treatments.length < 1 && <p>Non ci sono trattamenti da visualizzare</p>}
          {!isPending && treatments.length >= 1 && <Treatments treatments={treatments} />}
        </div>
      </section>
      <section className={styles.CallToAction}>
        <div className={styles.CallToActionContainer}>
          <div>
            <h2>Vuoi prendere un appuntamento?</h2>
            <p>
              <Link
                to='#'
                onClick={(e) => {
                  window.location.href = "tel:+3900000000000";
                  e.preventDefault();
                }}
                className={styles.Link}
              >
                Chiamaci
              </Link> o {!user ? " registrati al nostro sito" : " prenota dal sito"}.</p>
          </div>
          {!user && <Link to="/signup" className={btnStyles.BtnInverted}>Registrati</Link>}
          {user && <Link to="/book" className={btnStyles.BtnInverted}>Prenota</Link>}
        </div>
      </section>

      <section className={styles.Section}>
          {schedule && (
            <div>
              <h2>Orari di apertura</h2>
              <ScheduleTable schedule={schedule} />
            </div>
          )}
        <div className={styles.SideImage}>
          <Image src={img} fluid />
        </div>

      </section>
    </main>
  )
}