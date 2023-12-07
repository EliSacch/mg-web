// hooks
import { useEffect, useState } from 'react';
import { useMessage } from '../hooks/useMessage';
// components
import Message from '../components/Message';
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { displayMessage, closeMessage, openMessage } = useMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  }

  useEffect(() => {
    if (success) {
      setSuccess("Welcome!");
      openMessage();
    }
  }, [success])

  useEffect(() => {
    if (error) {
      openMessage();
    }
  }, [error])

  useEffect(() => {
    closeMessage()
  }, [])

  return (
    <form onSubmit={handleSubmit} className={formStyles.form}>

      <h2>Login</h2>

      <div className={formStyles["form-input"]}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoComplete='true'
        />
      </div>

      <div className={formStyles["form-input"]}>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <button id="login" className={btnStyles.btn}>Login</button>
      {displayMessage && (
        <Message displayMessage={displayMessage} closeMessage={closeMessage} type={error ? "error" : "success"}>
          <p>{error ? error : success}</p>
        </Message>
      )}

    </form>
  )
}
