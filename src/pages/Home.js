// hooks
import { useEffect, useState } from 'react';
// componenet
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Treatments from '../components/Treatments';
// style
import styles from './styles/Home.module.css';
import btnStyles from '../pages/styles/Buttons.module.css';
// image
import img from '../assets/images/brush.jpg';


export default function Home() {

  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    }

    fetch(`http://localhost:8080/treatments`, requestOptions)
      .then(res => res.json())
      .then(data => setTreatments(data))
      .catch(err => {
        console.log(err)
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
              </Link> o registrati al nostro sito.</p>
          </div>
          <Link to="/signup" className={btnStyles.BtnInverted}>Registrati</Link>
        </div>
      </section>
      <section className={styles.Section}>
        <div>
          <h2>I Nostri Servizi</h2>
          <Treatments treatments={treatments} />
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
              </Link> o registrati al nostro sito.</p>
          </div>
          <Link to="/signup" className={btnStyles.BtnInverted}>Registrati</Link>
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