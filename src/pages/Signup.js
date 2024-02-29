// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext";
// context
import { useCurrentUser } from '../context/CurrentUserContext';
// components
import Input from '../components/form/Input';
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';


export default function Signup() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [password2, setPassword2] = useState(null);
  const [password2Error, setPassword2Error] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const hasError = key => {
    return formErrors.indexOf(key) !== -1;
  }

  const { currentUser, jwtToken } = useCurrentUser();
  const setCurrentMessage = useSetCurrentMessage();
  const setCurrentMessageType = useSetCurrentMessageType();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let errors = [];
    let required = [
      { field: user.username, name: "username" },
      { field: user.email, name: "email" },
      { field: user.password, name: "password" }
    ]

    required.forEach(obj => {
      if (obj.field == "") {
        errors.push(obj.name);
      }
    })

    if (user.password != password2) {
      setPassword2Error("Le password non coincidono.")
      errors.push("password2");
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

      let requestBody = user;

      let requestOptions = {
        body: JSON.stringify(requestBody),
        method: "PUT",
        headers: headers,
        credentials: "include",
      }

      fetch(`${process.env.REACT_APP_BACKEND}/register`, requestOptions)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            navigate("/");
            setCurrentMessageType("success");
            setCurrentMessage("Registrazione avvenuta con successo.");
          }
        })
        .catch(err => {
          console.log(err)
          setCurrentMessageType("error");
          setCurrentMessage("Non è stato possibile effettuare la registrazione! Per favore riprova.");
        })
    } catch (err) {
      console.log("error submitting the form: ", err)
    }
  }

  const handleChange = () => (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setUser({
      ...user,
      [name]: value,
    })
  }

  useEffect(() => {
    if (currentUser) {
      navigate("/");
      return
    }
    setUser({
      username: "",
      email: "",
      password: "",
    });

  }, [currentUser, navigate])

  return (
    <main>
      <section className={formStyles.FormContainer}>
        <h2>Registrati</h2>
        <form onSubmit={handleSubmit} className={formStyles.Form}>

          <Input
            id="username"
            title="Username"
            type="text"
            name="username"
            onChange={handleChange("username")}
            value={user.username}
            placeholder="Scegli uno username"
            errorDiv={hasError("username") ? "input-error" : "d-none"}
            errorMsg="Scegli uno username."
          />

          <Input
            id="email"
            title="Email"
            type="email"
            name="email"
            onChange={handleChange("email")}
            value={user.email}
            placeholder="La tua email"
            autoComplete="email-new"
            errorDiv={hasError("email") ? "input-error" : "d-none"}
            errorMsg="Inserisci l'email."
          />

          <Input
            id="password"
            title="Password"
            type="password"
            name="password"
            onChange={handleChange("password")}
            value={user.password}
            placeholder="La tua password"
            autoComplete="password-new"
            errorDiv={hasError("password") ? "input-error" : "d-none"}
            errorMsg="Inserisci una password."
          />

          <Input
            id="password2"
            title="Ripeti la password"
            type="password"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
            placeholder="Ripeti la password"
            errorDiv={hasError("password2") ? "input-error" : "d-none"}
            errorMsg={password2Error}
          />

          <button id="signup" className={btnStyles.Btn}>Sign up</button>

        </form>
      </section>
    </main>
  )
}
