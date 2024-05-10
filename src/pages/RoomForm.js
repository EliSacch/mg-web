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



const RoomForm = ({ is_new }) => {

  const [room, setRoom] = useState({
    id: "",
    name: "",
    description: "",
    is_active: true
  })

  const [isPending, setIsPending] = useState(false);
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
      { field: room.name, name: "name" },
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
      headers.append("Authorization", "Bearer " + jwtToken)

      let requestBody = room;

      let requestOptions = {
        body: JSON.stringify(requestBody),
        method: is_new ? "PUT" : "PATCH",
        headers: headers,
        credentials: "include",
      }

      const path = is_new ? "create" : `${id}/edit`
      fetch(`${process.env.REACT_APP_BACKEND}/admin/rooms/${path}`, requestOptions)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            navigate("/admin");
            setCurrentMessageType("success");
            setCurrentMessage("Stanza " + (is_new ? "creata" : "aggiornata") + " con successo!");
          }
        })
        .catch(err => {
          console.log(err)
          setCurrentMessageType("error");
          setCurrentMessage("Non è stato possibile " + (is_new ? "creare" : "aggiornare") + " la stanza! Per favore riprova.");
        })
    } catch (err) {
      console.log("error submitting the form: ", err)
    }
  }

  const handleChange = () => (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setRoom({
      ...room,
      [name]: value,
    })
  }

  const handleCheck = e => {
    setRoom({
      ...room,
      "is_active": e.target.checked,
    })
  }

  useEffect(() => {
    if (is_new) {
      setRoom({
        name: "",
        description: "",
        is_active: true
      });

    } else {
      setIsPending(true);
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + jwtToken)

        const requestOptions = {
          method: "GET",
          headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/admin/rooms/${id}`, requestOptions)
          .then(res => res.json())
          .then(data => setRoom(data))
          .catch(err => {
            console.log(err);
            setFetchError("Non è stato possibile recuperare i dati di questa stanza.");
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
          <h2>{is_new ? "Aggiungi Stanza" : "Modifica Stanza"}</h2>

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
                value={room.name}
                errorDiv={hasError("name") ? "input-error" : "d-none"}
                errorMsg="Scegli un nome"
              />

              <TextArea
                id="description"
                title="Descrizione"
                name="description"
                onChange={handleChange("description")}
                value={room.description}
                rows="5"
              />

              <Checkbox
                id="is_active"
                title="Attivo"
                name="is_active"
                onChange={e => handleCheck(e)}
                value={room.is_active}
                checked={room.is_active}
              />

              <button className={btnStyles.Btn}>Salva</button>
            </form>
          )}

        </section>
      )}
    </main>
  )
}

export default RoomForm
