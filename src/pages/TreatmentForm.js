// hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useCurrentUser } from "../context/CurrentUserContext";
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext";
// components
import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";
import Checkbox from "../components/form/Checkbox";
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';



const TreatmentForm = ({ is_new }) => {

  const [treatment, setTreatment] = useState({
    id: 0,
    name: "",
    description: "",
    duration: 0,
    price: 0,
    image: "",
    is_active: true
  })

  const [error, setError] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const hasError = key => {
    return formErrors.indexOf(key) !== -1;
  }

  const navigate = useNavigate();
  const { currentUser, jwtToken } = useCurrentUser();
  const setCurrentMessage = useSetCurrentMessage();
  const setCurrentMessageType = useSetCurrentMessageType();

  // get id from url
  let { id } = useParams();

  const hanleSubmit = e => {
    e.preventDefault();

    let errors = [];
    let required = [
      { field: treatment.name, name: "name" },
      { field: treatment.duration, name: "duration" },
      { field: treatment.price, name: "price" }
    ]

    required.forEach(obj => {
      if (obj.field == "") {
        errors.push(obj.name);
      }
    })

    if (treatment.duration < 5) {
      errors.push("duration");
    }

    if (treatment.price < 0) {
      errors.push("price");
    }

    setFormErrors(errors);

    if (errors.length > 0) {
      return false
    }

    // if there are no errors, then submit
    try {
      const headers = new Headers();
      headers.append("Content-type", "application/json");
      headers.append("Authorization", "Bearer " + jwtToken)

      let requestBody = treatment;
      treatment.duration = parseInt(treatment.duration, 10);
      treatment.price = parseFloat(treatment.price);

      let requestOptions = {
        body: JSON.stringify(requestBody),
        method: is_new ? "PUT" : "PATCH",
        headers: headers,
        credentials: "include",
      }

      const path = is_new ? "create" : `${id}/edit`
      fetch(`${process.env.REACT_APP_BACKEND}/admin/treatments/${path}`, requestOptions)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            navigate("/admin");
            setCurrentMessageType("success");
            setCurrentMessage("Trattamento " + (is_new ? "creato" : "aggiornato") + " con successo!");
          }
        })
        .catch(err => {
          console.log(err)
          setCurrentMessageType("error");
          setCurrentMessage("Non è stato possibile " + (is_new ? "creare" : "aggiornare") + " il trattamento! Per favore riprova.");
        })
    } catch (err) {
      console.log("error submitting the form: ", err)
    }

  }

  const handleChange = () => (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setTreatment({
      ...treatment,
      [name]: value,
    })
  }

  const handleCheck = e => {
    setTreatment({
      ...treatment,
      "is_active": e.target.checked,
    })
  }

  useEffect(() => {
    if (is_new) {
      setTreatment({
        name: "",
        description: "",
        duration: 0,
        price: 0,
        image: "",
        is_active: true
      });
    } else {
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
          method: "GET",
          headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/treatments/${id}`, requestOptions)
          .then(res => res.json())
          .then(data => setTreatment(data))
          .catch(err => {
            console.log(err);
            setFetchError("Non è stato possibile recuperare i dati di questo trattamento.")
          })
      } catch (err) {
        console.log(err)
      }
    }

  }, [id, is_new])

  return (
    <main>
      <section className={formStyles.FormContainer}>
        <h2>{is_new ? "Aggiungi Trattamento" : "Modifica Trattamento"}</h2>

        {fetchError != null ? (
          <p>{fetchError}</p>
        ) : (
          <form onSubmit={hanleSubmit} className={formStyles.Form}>

            <Input
              id="name"
              title="Nome"
              type="text"
              name="name"
              onChange={handleChange("name")}
              value={treatment.name}
              errorDiv={hasError("name") ? "input-error" : "d-none"}
              errorMsg="Scegli un nome"
            />

            <TextArea
              id="description"
              title="Descrizione"
              name="description"
              onChange={handleChange("description")}
              value={treatment.description}
              rows="5"
            />

            <Input
              id="duration"
              title="Durata in minuti"
              type="number"
              name="duration"
              onChange={handleChange("duration")}
              value={treatment.duration}
              errorDiv={hasError("duration") ? "input-error" : "d-none"}
              errorMsg="Valore per 'durata' invalido. Inserisci un numero maggiore o uguale a 5."
            />

            <Input
              id="price"
              title="Prezzo"
              type="number"
              name="price"
              onChange={handleChange("price")}
              value={treatment.price}
              errorDiv={hasError("price") ? "input-error" : "d-none"}
              errorMsg="Valore per 'prezzo' invalido. Inserisci un valore positivo."
            />

            <Checkbox
              id="is_active"
              title="Attivo"
              name="is_active"
              onChange={e => handleCheck(e)}
              value={treatment.is_active}
              checked={treatment.is_active}
            />

            <button className={btnStyles.Btn}>Salva</button>
          </form>
        )}

      </section>
    </main>
  )
}

export default TreatmentForm
