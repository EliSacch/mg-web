// hooks
import { useEffect, useState } from 'react';
// context
import { useAuthContext } from '../context/useAuthContext';
// componenet
import { Image } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import Treatments from '../components/Treatments';
// style
import styles from './styles/Home.module.css';
import btnStyles from '../pages/styles/Buttons.module.css';
// image
import img from '../assets/images/brush.jpg';


export default function Home() {

  const [treatments, setTreatments] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const { user } = useAuthContext();

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
      .then(data => data.filter(d => d.is_active==true))
      .then(data => {
        setTreatments(data);
        setIsPending(false);
      }).catch(err => {
        console.log(err);
        setIsPending(false);
      })

  }, [])  

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
                </Link> o { !user ? " registrati al nostro sito" : " prenota dal sito"}.</p>
          </div>
          { !user && <Link to="/signup" className={btnStyles.BtnInverted}>Registrati</Link>}
          { user && <Link to="/book" className={btnStyles.BtnInverted}>Prenota</Link>}
        </div>
      </section>

      <section className={styles.Section}>
        <div>
          <h2>I Nostri Servizi</h2>
          { isPending && <p>Loading...</p>}
          { !isPending && treatments.length < 1 && <p>Non ci sono trattamenti da visualizzare</p>}
          { !isPending && treatments.length >= 1 && <Treatments treatments={treatments} />}
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
              </Link> o { !user ? " registrati al nostro sito" : " prenota dal sito"}.</p>
          </div>
          { !user && <Link to="/signup" className={btnStyles.BtnInverted}>Registrati</Link>}
          { user && <Link to="/book" className={btnStyles.BtnInverted}>Prenota</Link>}
        </div>
      </section>
      
      <section className={styles.Section}>
        <div>
          <h2>Orari di apertura</h2>

          <table>
            <thead>
              <tr>
              <th></th>
              <th>Orario</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lunedí</td>
                <td>Chiusi</td>
              </tr>
              <tr>
                <td>Martedí</td>
                <td>9:00 - 16:00</td>
              </tr>
              <tr>
                <td>Mercoledí</td>
                <td>9:00 - 16:00</td>
              </tr>
              <tr>
                <td>Giovedí</td>
                <td>9:00 - 16:00</td>
              </tr>
              <tr>
                <td>Venerdí</td>
                <td>9:00 - 16:00</td>
              </tr>
              <tr>
                <td>Sabato</td>
                <td>9:00 - 12:00</td>
              </tr>
              <tr>
                <td>Domeica</td>
                <td>Chiusi</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.SideImage}>
          <Image src={img} fluid />
        </div>

      </section>
    </main>
  )
}