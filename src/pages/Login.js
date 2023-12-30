// hooks
import { useState } from 'react';
import { useSetCurrentMessage, useSetCurrentMessageType } from '../context/MessageContext.js';
import { useNavigate } from 'react-router-dom';
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';
import Input from '../components/form/Input.js';


export default function Login({ setJwtToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setCurrentMessage = useSetCurrentMessage();
  const setCurrentMessageType = useSetCurrentMessageType();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email == "test@admin.com") {
      setJwtToken("abc")
      setCurrentMessage("Logged in")
      setCurrentMessageType("success")
      navigate("/")
    } else {
      setCurrentMessage("could not log in")
      setCurrentMessageType("error")
    }
  }

  return (
    <div className={formStyles.FormContainer}>
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
    </div>

  )
}
