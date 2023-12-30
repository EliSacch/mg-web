// hooks
import { useEffect, useState } from 'react';
// style
import styles from './styles/Home.module.css';
import Treatments from '../components/Treatments';


export default function Home() {

  const [treatments, setTreatments] = useState([])

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    }

    fetch(`http://localhost:8080/treatments`, requestOptions)
    .then(res => res.json())
    .then( data => setTreatments(data))
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className={styles.Home}>
      <h2>Home</h2>
      <section>
        <Treatments treatments={treatments} />
      </section>
      <section>
        Second section
      </section>
    </div>
  )
}