// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
// context
import { useAuthContext } from '../hooks/useAuthContext';
// components
import Input from '../components/form/Input';
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';


export default function Signup() {

  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    password: "",
  })

  const { error, isPending, signup } = useSignup()

  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const hasError = key => {
    return formErrors.indexOf(key) !== -1;
  }

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];
    let required = [
      { field: userData.displayName, name: "displayName" },
      { field: userData.email, name: "email" },
      { field: userData.password, name: "password" }
    ]

    required.forEach(obj => {
      if (obj.field == "") {
        errors.push(obj.name);
      }
    })

    if (userData.password != password2) {
      setPassword2Error("Le password non coincidono.")
      errors.push("password2");
    }

    setFormErrors(errors);
    if (errors.length > 0) {
      return false
    }

    signup(userData.email, userData.password, userData.displayName)
 
  }

  const handleChange = () => (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setUserData({
      ...userData,
      [name]: value,
    })
  }

  useEffect(() => {
    if (user) {
      navigate("/");
      return
    }
    setUserData({
      displayName: "",
      email: "",
      password: "",
    });

  }, [user, navigate])

  return (
    <main>
      <section className={formStyles.FormContainer}>
        <h2>Registrati</h2>
        <form onSubmit={handleSubmit} className={formStyles.Form}>

          <Input
            id="displayName"
            title="Nome"
            type="text"
            name="displayName"
            onChange={handleChange("displayName")}
            value={userData.display_name}
            placeholder="Scegli un nome"
            errorDiv={hasError("displayName") ? "input-error" : "d-none"}
            errorMsg="Scegli un nome."
          />

          <Input
            id="email"
            title="Email"
            type="email"
            name="email"
            onChange={handleChange("email")}
            value={userData.email}
            placeholder="La tua email"
            autoComplete="email"
            errorDiv={hasError("email") ? "input-error" : "d-none"}
            errorMsg="Inserisci l'email."
          />

          <Input
            id="password"
            title="Password"
            type="password"
            name="password"
            onChange={handleChange("password")}
            value={userData.password}
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
            autoComplete="password-new"
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
            placeholder="Ripeti la password"
            errorDiv={hasError("password2") ? "input-error" : "d-none"}
            errorMsg={password2Error}
          />

          {isPending && <p>Loading...</p>}
          {!isPending && <button id="signup" className={btnStyles.Btn}>Sign up</button>}

        </form>
      </section>
    </main>
  )
}
