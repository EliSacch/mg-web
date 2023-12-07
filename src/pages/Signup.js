// hooks
import { useEffect, useState } from 'react';
import { useMessage } from '../hooks/useMessage';
// componenets
import Message from '../components/Message';
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';


export default function Signup() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { displayMessage, closeMessage, openMessage } = useMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, displayName);
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

      <h2>Signup</h2>

      <div className={formStyles["form-input"]}>
        <label htmlFor="displayName">Display Name:</label>
        <input
          id="displayName"
          type="text"
          name="displayName"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </div>

      <div className={formStyles["form-input"]}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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

      <div className={formStyles["form-input"]}>
        <label htmlFor="password2">Repeat password:</label>
        <input
          id="password2"
          type="password"
          name="password2"
          onChange={(e) => setPassword2(e.target.value)}
          value={password2}
        />
      </div>
      <button id="signup" className={btnStyles.btn}>Signup</button>
      {displayMessage && (
        <Message displayMessage={displayMessage} closeMessage={closeMessage} type={error ? "error" : "success"}>
          <p>{error ? error : success}</p>
        </Message>
      )}

    </form>
  )
}
