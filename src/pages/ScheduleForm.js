// hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// context
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import Input from "../components/form/Input";
import ScheduleWeek from "../components/ScheduleWeek";
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';
import GoBackButton from "../components/GoBackButton";


const ScheduleForm = ({ is_new }) => {

  const [schedule, setSchedule] = useState({
    name: "",
    slots: {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    },
  })

  const [isPending, setIsPending] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const hasError = key => {
    return formErrors.indexOf(key) !== -1;
  }

  const setCurrentMessage = useSetCurrentMessage();
  const setCurrentMessageType = useSetCurrentMessageType();

  const navigate = useNavigate();
  const { user } = useAuthContext();

  // get id from url
  let { id } = useParams();

  const hanleSubmit = e => {
    e.preventDefault();

    let errors = [];
    let required = [
      { field: schedule.name, name: "name" },
    ]

    required.forEach(obj => {
      if (obj.field == "") {
        errors.push(obj.name);
      }
    })

    setFormErrors(errors);

    if (errors.length > 0) {
      return false
    }

    // if there are no errors, then submit
    try {
      const headers = new Headers();
      headers.append("Content-type", "application/json");
      headers.append("Authorization", "Bearer " + user.accessToken)

      let requestBody = schedule;

      let requestOptions = {
        body: JSON.stringify(requestBody),
        method: is_new ? "PUT" : "PATCH",
        headers: headers,
        credentials: "include",
      }

      const path = is_new ? "create" : `${id}/edit`
      fetch(`${process.env.REACT_APP_BACKEND}/admin/schedules/${path}`, requestOptions)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            console.log(data.message);
          } else {
            navigate("/admin");
            setCurrentMessageType("success");
            setCurrentMessage("Orario " + (is_new ? "creato" : "aggiornato") + " con successo!");
          }
        })
        .catch(err => {
          console.log(err)
          setCurrentMessageType("error");
          setCurrentMessage("Non è stato possibile " + (is_new ? "creare" : "aggiornare") + " l'orario! Per favore riprova.");
        })
    } catch (err) {
      console.log("error submitting the form: ", err)
    }
  }

  const handleChange = () => (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setSchedule({
      ...schedule,
      [name]: value,
    })
  }

  useEffect(() => {
    if (is_new) {
      setSchedule({
        name: "",
        slots: {
          mon: [],
          tue: [],
          wed: [],
          thu: [],
          fri: [],
          sat: [],
          sun: []
        }
      });

    } else {
      setIsPending(true);
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + user.accessToken)

        const requestOptions = {
          method: "GET",
          headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/schedules/${id}`, requestOptions)
          .then(res => res.json())
          .then(data => {
            setSchedule(data)
          })
          .catch(err => {
            console.log(err);
            setFetchError("Non è stato possibile recuperare i dati di questo calendario.");
            setIsPending(false);
          })
      } catch (err) {
        console.log(err);
        setIsPending(false);
      }
      setIsPending(false);
    }

  }, [id, is_new])

  return (
    <main>
      {isPending && <p>Loading...</p>}

      {!isPending && (
        <section className={formStyles.FormContainer}>
          <GoBackButton />
          <h2>{is_new ? "Aggiungi Calendario" : "Modifica Calendario"}</h2>

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
                value={schedule.name}
                errorDiv={hasError("name") ? "input-error" : "d-none"}
                errorMsg="Scegli un nome"
              />

              {Object.keys(schedule.slots).map(day => <ScheduleWeek
                day={day}
                key={day}
                schedule={schedule}
                setSchedule={setSchedule}
                setFormErrors={setFormErrors}
                hasError={hasError}
              />
              )}

              <button className={btnStyles.Btn}>Salva</button>
            </form>
          )}

        </section>
      )}
    </main>
  )
}

export default ScheduleForm
