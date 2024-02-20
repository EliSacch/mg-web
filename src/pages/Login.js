// hooks
import { useState, useEffect } from 'react';
import { useSetCurrentMessage, useSetCurrentMessageType } from '../context/MessageContext.js';
import { useCurrentUser, useSetCurrentUser } from '../context/CurrentUserContext.js';
import { useNavigate } from 'react-router-dom';
// componenets
import Input from '../components/form/Input.js';
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {currentUser} = useCurrentUser();
  const {setCurrentUser} = useSetCurrentUser();
  const setCurrentMessage = useSetCurrentMessage();
  const setCurrentMessageType = useSetCurrentMessageType();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // build the request payload
    let payload = {
      email: email,
      password: password,
    }
    // set request options
    const requestOption = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    }

    // send the request
    fetch('/authenticate', requestOption)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error);
          setCurrentMessageType("error")
          setCurrentMessage("Non è stato possibile fare il login! Per favore riprova.")
        } else {
          setCurrentUser(data.user)
          setCurrentMessageType("success")
          setCurrentMessage("Login effettuato con successo!")
          navigate("/");
        }
      })
      .catch(error => {
        setCurrentMessageType("error")
        setCurrentMessage("Non è stato possibile fare il login!")
        console.log(error)
      })
  }

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate])

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
            autoComplete="email-new"
          />

          <Input
            id="password"
            title="Password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="La tua password"
            autoComplete="password-new"
          />

          <button id="login" className={btnStyles.Btn}>Login</button>

        </form>
      </section>
    </main>

  )
}
