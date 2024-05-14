// hooks
import { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin.js';
// context
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext.js';
// componenets
import Input from '../components/form/Input.js';
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState([]);
  const hasError = key => {
    return formErrors.indexOf(key) !== -1;
  }
  const { login, error, isPending } = useLogin();
  const { user } = useAuthContext();
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];
    let required = [
      { field: email, name: "email" },
      { field: password, name: "password" }
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

    login(email, password);
    
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate])

  return (
    <main>
      <section className={formStyles.FormContainer}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className={formStyles.Form}>

          <Input
            id="email"
            title="Email"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="La tua password"
            autoComplete="password"
            errorDiv={hasError("password") ? "input-error" : "d-none"}
            errorMsg="Inserisci una password."
          />

          <button id="login" className={btnStyles.Btn}>Login</button>
          {error && <p>{error}</p>}

        </form>
      </section>
    </main>

  )
}
