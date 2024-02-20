// hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useCurrentUser } from "../context/CurrentUserContext";
// components
import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";
import Checkbox from "../components/form/Checkbox";
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';


const EditTreatment = () => {

  const [treatment, setTreatments] = useState({
    id: 0,
    name: "",
    description: "",
    duration: 0,
    price: 0,
    image: "",
    is_active: true
  })

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const hasError = key => {
    return errors.indexOf(key) !== -1;
  }

  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();

  // get id from url
  let { id } = useParams();

  const hanleSubmit = e => {
    e.preventDefault();
    console.log("submit");
  }

  const handleChange = () => (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setTreatments({
      ...treatment,
      [name]: value,
    })
  }

  useEffect(() => {

  }, [])

  return (
    <main>
      <section className={formStyles.FormContainer}>
        <h2>Modifica Trattamento</h2>

        <pre>{JSON.stringify(treatment, null, 3)}</pre>

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
            errorMsg="Valore per 'durata' invalido"
          />

          <Input
            id="price"
            title="Prezzo"
            type="number"
            name="price"
            onChange={handleChange("price")}
            value={treatment.price}
            errorDiv={hasError("price") ? "input-error" : "d-none"}
            errorMsg="Valore per 'prezzo' invalido"
          />

          <Checkbox 
          id="is_active"
          title="Attivo"
          name="is_active"
          onChange={handleChange("is_active")}
          value={treatment.is_active}
          />

          <button className={btnStyles.Btn}>Salva</button>
        </form>

      </section>
    </main>
  )
}

export default EditTreatment
